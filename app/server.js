var path = require('path');
var config = require(path.resolve( __dirname, 'config.json'));
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
var scrypt = require("scrypt");
var scryptParameters = scrypt.paramsSync(0.1);
var jwt = require('jsonwebtoken');

var whitelist = ['http://localhost:3000']; // undefined added for newman runner
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
  }
},
exposedHeaders: ['authorization']
};
var app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

// middleware to get JWT from auth header
app.use((req,res,next) => {
    req.jwt_auth = false;
    if(req.headers['authorization'] &&
    req.headers['authorization'].startsWith('JWT')){
        var jwt_token = req.headers['authorization'].substr(4);
        jwt.verify(jwt_token, config.secret, (err, jwt_data) => {
            if(err && req.path !== '/user/login') {
                if(err.name === "TokenExpiredError") {
                    if(req.path !== '/user/login') {
                        res.status(401).send({description: "expired token"});
                        return;
                    } else {
                        next();
                    }
                } else {
                    throw err;
                }
            }

            var now = new Date() / 1000;
            if( (now - 15*60) < jwt_data) {
                jwt_data.exp = jwt_data.exp + (60 * 60);
            }
            jwt.sign(jwt_data, config.secret, (err, refreshed) => {
                var auth = JSON.stringify(refreshed);
                console.log(auth);
                res.set("authorization", "JWT " + auth.substr(1, auth.length - 2));
            });

            req.jwt_auth = jwt_data;
            next();
        });
    } else
        next();
});

// middleware to bounce request if anything but login/create or already auth'd
app.use((req,res,next) => {
    if( req.path === '/user/login' ||
        req.jwt_auth ||
        (req.path === '/team' && req.method === 'POST') ||
        (req.path === '/user' && req.method === 'POST'))
        next();
    else {
        res.status(401).send({res: "invalid", reason: "bad authorization"});
    }
});

// get paths
require(path.resolve( __dirname, 'routes/Users.js'))(app,jwt,scrypt,config);
require(path.resolve( __dirname, 'routes/Meetings.js'))(app,jwt);
require(path.resolve( __dirname, 'routes/Teams.js'))(app,jwt);

// set mongoose connection
var db = 'mongodb://localhost:27017/' + config.db[process.argv[2]];
mongoose.connect(db, {
    useMongoClient: true,
    /* other options */
}).then(() => {
    console.log("Connected to MongoDB using Mongoose on " + db);
}).catch((err) => {
    console.log("Mongoose Connection Error...");
    console.log(err);
});

// start the server
app.listen(config.port, () => {console.log("Express Server Up...")});
