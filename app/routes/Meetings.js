module.exports = function(app, jwt) {
    var path = require('path');
    var Meetings = require(path.resolve(__dirname, '../schemas/Meetings'));
    var Teams = require(path.resolve(__dirname, '../schemas/Teams'));

    // get meeting by and meetingid, make meeting, edit meeting, close meeting, delete meeting

    app.get('/meeting/:meetingId', (req, res) => {
        Meetings.findOne({team: req.jwt_auth.claims.team, _id: req.params.meetingId}).then(meeting => {
            if(meeting) res.status(200).send({meeting: meeting});
            else res.status(404).send({description: "Not Found"});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.get('/meeting', (req, res) => {
        Meetings.find({team: req.jwt_auth.claims.team}).then(meetings => {
            if(meetings) res.status(200).send({meetings: meetings});
            else res.status(404).send({description: "Not Found"});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.post('/meeting', (req, res) => {
        Teams.findOne({_id: req.jwt_auth.claims.team}).then(team => {
            if(!team) {
                res.status(404).send({description: "Not Found"});
            } else {
                var now = new Date();
                var eventDate = new Date(req.body.eventDate);
                if(now > eventDate) {
                    res.status(422).send({description: "This event cannot be made in the past"});
                    return;
                }

                if(req.body.name === "") {
                    res.status(422).send({description: "Please include a name for this event."});
                    return;
                }

                if(req.body.emails.length === 0) {
                    res.status(422).send({description: "Please invite at least one person."});
                    return;
                }

                var meeting = new Meetings({
                    name: req.body.name,
                    invitedMembers: req.body.emails,
                    eventDate: req.body.eventDate,
                    createDate: now,
                    description: req.body.description,
                    team: team._id,
                    closed: false
                });

                meeting.save().then(meeting => {
                    res.status(201).send({meeting: meeting});
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({description: "internal error"});
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.put('/meeting/:meetingId', (req, res) => {
        Meetings.findOneAndUpdate({team: req.jwt_auth.claims.team, _id: req.params.meetingId}, {
            name: req.body.name,
            eventDate: req.body.eventDate,
            description: req.body.description,
            closed: req.body.closed
        }).then(meeting => {
            res.status(200).send({meeting: meeting});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.put('/meeting/invite', (req, res) => {
        // TODO write
    });

    app.delete('/meeting/invite', (req, res) => {
        // TODO write
    });

    app.put('/meeting/:meetingId/close', (req, res) => {
        Meetings.findOneAndUpdate({team: req.jwt_auth.claims.team, _id: req.params.meetingId}, {
            closed: true
        }).then(meeting => {
            res.status(200).send({meeting: meeting});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });

    app.delete('/meeting/:meetingId', (req, res) => {
        Meetings.remove({_id: req.params.meetingId}).then(opResult => {
            res.status(403).send({description: opResult.result});
        }).catch(err => {
            console.log(err);
            res.status(500).send({description: "internal error"});
        });
    });
}
