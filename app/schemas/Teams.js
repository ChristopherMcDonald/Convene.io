var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var teamsSchema = new Schema({
    name: {type: String, unique: true, required: true},
    invitedMembers: { type: [String], required: true}
}, {
    collection: "teams"
});

// create the model
var Teams = mongoose.model('teams', teamsSchema);

module.exports = Teams;
