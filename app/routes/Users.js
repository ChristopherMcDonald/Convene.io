module.exports = function(app,jwt,scrypt) {
    var path = require('path');
    var Users = require('../schemas/Users.js');
    var Teams = require(path.resolve( __dirname, '../schemas/Teams.js'));
    var scryptParameters = scrypt.paramsSync(0.1);

    app.get('/user', (req, res) => {
        Users.findOne({_id: req.jwt_auth.claims.user}, 'email alias team').then((user) => {
            if(user) {
                // look up team name
                res.status(200).send({res: "valid", user: user});
            }
            else res.status(404).send({res: "invalid", user: undefined});
        }).catch((err) => {
            console.log(err);
            res.status(500).send("internal error!");
        });
    });

    app.post("/user", (req, res) => {
        
        if(! /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(req.body.email)) {
            res.status(422).send("That email doesn't look right, ensure it is spelt correctly.");
            return;
        }

        if(req.body.password !== req.body.confPassword) {
            res.status(422).send("Those passwords do not match, ensure they are spelt the same!");
            return;
        }

        var context = "";
        if(req.body.name.first === '') context += "First Name is missing, ";
        if(req.body.name.last === '') context += "Last Name is missing, ";
        if(req.body.alias.length < 3) context += "Alias is too short, ";
        if(req.body.email === '') context += "Email is empty, ";
        if(req.body.team === '') context += "Team is missing, ";
        if(! /^(?=.*\d).{6,}$/.test(req.body.password))
            context += "Password must be longer than 6 characters and have one number, ";

        if(context.length > 0) {
            var message = "Please ensure all fields are filled out correctly. [" + context;
            res.status(422).send(message.substr(0, message.length - 2) + "]");
            return;
        }

        Teams.findOne({_id: req.body.team}).then(team => {
            if(!team) {
                res.status(404).send({description: "Not Found"});
                return;
            }

            if(!team.invitedMembers.includes(req.body.email)) {
                res.status(422).send("You are not in your teams invited list of members.");
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

                team.invitedMembers = team.invitedMembers.filter((email) => { email !== req.body.email});
                team.save().then((team) => {
                    console.log("Removed user from invite list.")
                }).catch((err) => {
                    console.log("Failed to remove newly made user from invite list.")
                });

            }).catch((err) => {
                console.log(err);
                res.status(500).send("internal error");
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send("internal error");
            return;
        });
    });

    app.post("/user/login", (req, res) => {
        Users.findOne({email: req.body.email}).then(user => {
            if(user && scrypt.verifyKdfSync(user.password, req.body.password)) {
                jwt.sign({user: user.id, team: user.team},(err, data) => {
                    // the token must be added in the header as 'Authorization'
                    res.status(200).json({res: "valid", token: 'JWT ' + data});
                });
            } else {
                res.status(401).json({description: "bad credentials"});
            }
        }).catch((err) => { // no user of that email
            console.log(err);
            res.status(500).json("internal error");
        });
    });
}
