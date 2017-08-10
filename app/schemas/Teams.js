var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var teamsSchema = new Schema({
    name: {type: String, unique: true},
    invitedMembers: [String]
}, {
    collection: "teams"
});

// create the model
var Teams = mongoose.model('teams', teamsSchema);

module.exports = Teams;
