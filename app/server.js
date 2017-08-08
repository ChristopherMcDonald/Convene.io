var path = require('path');
var config = require(path.resolve( __dirname, 'config.json'));
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
var scrypt = require("scrypt");
var scryptParameters = scrypt.paramsSync(0.1);
var JWT = require('jwt-async'),
jwt = new JWT({
    claims: {
        exp: Math.floor(Date.now() / 1000) + 60
    }
});
// TODO test expiration stuff
jwt.setSecret(config.secret);

var whitelist = ['http://localhost:3000', undefined]; // undefined added for newman runner
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};
var app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use((req,res,next) => {
    req.jwt_auth = false;
    if(req.headers['authorization'] &&
    req.headers['authorization'].startsWith('JWT')){
        var jwt_token = req.headers['authorization'].substr(4);
        jwt.verify(jwt_token, (err, jwt_data) => {
            if(err) throw err;
            req.jwt_auth = jwt_data;
            next();
        });
    } else {
        res.status(401).send({res: "invalid", reason: "bad credentials"})
    }
});


var Users = require(path.resolve( __dirname, 'schemas/Users'));
app.get('/users/me', (req, res) => {
    if(!req.jwt_auth) {
        res.status(401).send({res: "invalid", reason: "bad authorization"});
    }
    Users.findOne({_id: req.jwt_auth.claims.claim}, 'email alias team').then((user) => {
        if(user) res.status(200).send({res: "valid", user: user});
        else res.status(404).send({res: "invalid", user: undefined});
    }).catch((err) => {
        res.status(500).send("internal error!");
    });
});


// TODO add some regex and validate dem fields
app.post("/users/create", (req, res) => {
    if(! /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(req.body.email)) {
        res.status(422).send("That email doesn't look right, ensure it is spelt correctly.");
        return;
    }

    if(req.body.password !== req.body.confPassword) {
        res.status(422).send("Those passwords do not match, ensure they are spelt the same!");
        return;
    }

    var message = "Please ensure all fields are filled out correctly. [";
    var show = false;
    if(req.body.name.first === '') {
        message += "First Name is missing, ";
        show = true;
    }
    if(req.body.name.last === '') {
        message += "Last Name is missing, ";
        show = true;
    }
    if(req.body.alias.length < 3) {
        message += "Alias is too short, ";
        show = true;
    }
    if(req.body.email === '') {
        message += "Email is empty, ";
        show = true;
    }
    if(req.body.team === '') {
        message += "Team is missing, ";
        show = true;
    }
    if(! /^(?=.*\d).{6,}$/.test(req.body.password)) {
        message += "Password must be longer than 6 characters and have one number, ";
        show = true;
    }

    if(show) {
        res.status(422).send(message.substr(0, message.length - 2) + "]");
        return;
    }

    var user = new Users({
        name: {
            first: req.body.name.first,
            last: req.body.name.last
        },
        alias: req.body.alias,
        email: req.body.email,
        team: req.body.team,
        password: scrypt.kdfSync(req.body.password, scryptParameters)
    });

    user.save().then((user) => {
        console.log("User made with id: " + user.id);
        res.status(200).send({id: user.id});
    }).catch((err) => {
        console.log(err);
        res.status(500).send("internal error");
    });
});

app.post("/users/login", (req, res) => {
    Users.findOne( {email: req.body.email}).then((user) => {
        if(user && scrypt.verifyKdfSync(user.password, req.body.password)) {
            jwt.sign({claim: user.id},(err, data) => {
                // the token must be added in the header as 'Authorization'
                res.status(200).json({res: "valid", token: 'JWT ' + data});
            });
        } else {
            res.status(401).json({res: "invalid", reason: "bad credentials"});
        }
    }).catch((err) => { // no user of that email
        res.status(500).json({res: "invalid"});
    });
});

// set mongoose connection
mongoose.connect('mongodb://localhost:27017/convene', {
    useMongoClient: true,
    /* other options */
}).then(() => {
    console.log("Connected to MongoDB using Mongoose...");
}).catch((err) => {
    console.log("Mongoose Connection Error...");
    console.log(err);
});

// start the server
app.listen(config.port, () => {console.log("Express Server Up...")});
