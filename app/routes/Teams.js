module.exports = function(app) {
    var path = require('path');
    console.log(path.resolve(__dirname, ""));
    var Teams = require(path.resolve( __dirname, '../schemas/Teams'));
    var Users = require(path.resolve( __dirname, '../schemas/Users'));

    // get my team, make a team, change team name, add invited and delete invited

    app.get('/team', (req, res) => {
        Teams.findOne({_id: req.jwt_auth.team}).then(team => {
            if(team) res.status(200).send({team: team});
            else res.status(404).send({description: "Not Found"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.post('/team', (req, res) => {
        if(req.body.name.length <= 4) {
            res.status(422).send({description: 'Team name should be longer than 4 characters'});
            return;
        }

        if(req.body.email.length !== 1) {
            res.status(422).send({description: 'There should only be one email provided'});
            return;
        }

        if(! /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(req.body.email[0])) {
            res.status(422).send({description: 'The email provided is not formatted correctly.'});
            return;
        }

        var team = new Teams({
            name: req.body.name, // validate dem fields
            invitedMembers: [req.body.email]
        });

        team.save().then(team => {
            res.status(201).send({team: team});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.put('/team', (req, res) => {
        Teams.findByIdAndUpdate(req.jwt_auth.team, {name: req.body.name}).then(team => {
            if(team) res.status(200).send({team: team});
            else res.status(404).send({description: "Not Found"});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.put('/team/invite', (req, res) => {
        Teams.findOne({_id: req.jwt_auth.team}).then(team => {
            if(team) {
                team.invitedMembers = [...team.invitedMembers, ...req.body.email]; // works for [String]
                team.save().then(team => {
                    res.status(201).send({team: team});
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({description: "internal error"});
                });
            }
            else res.status(404).send({description: "Not Found"});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.delete('/team/invite', (req, res) => {
        Teams.findOne({_id: req.jwt_auth.team}).then(team => {
            if(team) {
                team.invitedMembers = team.invitedMembers.filter((email) => email !== req.body.email);
                team.save().then(team => {
                    res.status(200).send({team: team});
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({description: "internal error"});
                });
            }
            else res.status(404).send({description: "Not Found"});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });
};
