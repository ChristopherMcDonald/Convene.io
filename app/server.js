var path = require('path');
var config = require(path.resolve( __dirname, 'config.json'));
var express = require('express');
var mongoose = require('mongoose');
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

var app = express();
app.use(bodyParser.json());
app.use(function(req,res,next) {
    req.jwt_auth = false;
    if(req.headers['authorization'] &&
    req.headers['authorization'].startsWith('JWT')){
        var jwt_token = req.headers['authorization'].substr(4);
        jwt.verify(jwt_token, function(err, jwt_data) {
            if(err) throw err;
            req.jwt_auth = jwt_data;
            next();
        });
    } else {
        next();
    }
});

//
var Users = require(path.resolve( __dirname, 'schemas/Users'));
app.get('/users/me', function(req, res) {
    if(!req.jwt_auth) {
        res.send("error! no jwt_auth");
    }
    Users.findOne({_id: req.jwt_auth.claims.claim}, 'email alias team', (err, user) => {
        if(err) res.status(404).send("internal error!");
        
        if(user) res.status(200).send({user: user});
        else res.status(404).send("couldn't find user")
    });
});

app.post("/users/create", (req, res) => {
    var user = new Users({
        name: {
            first: req.body.name.last,
            last: req.body.name.last
        },
        alias: req.body.alias,
        email: req.body.email,
        team: req.body.team,
        password: scrypt.kdfSync(req.body.password, scryptParameters)
    });

    user.save((err, user) => {
        if(err) {
            console.log(err);
        } else {
            console.log("User made with id: " + user.id);
            res.send(user.id);
        }
    });
});

app.post("/users/login/", (req, res) => {
    Users.findOne( {email: req.body.email}, (err, user) => {
        if(err) {
            Console.log(err);
            res.send({id: -1});
        } else {
            if(scrypt.verifyKdfSync(user.password, req.body.password)) {
                jwt.sign({claim: user.id},(err, data) => {
                    // the token must be added in the header as 'Authorization'
                    res.json({res: "valid", token: 'JWT ' + data});
                });
            } else {
                res.json({res: "invalid"});
            }
        }
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
