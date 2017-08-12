var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var meetingSchema = new Schema({
    name: String,
    invitedMembers: [String], // emails
    eventDate: Date,
    createDate: Date,
    description: String,
    team: Schema.Types.ObjectId,
    closed: Boolean
}, {
    collection: "meetings"
});

var Meetings = mongoose.model('meetings', meetingSchema);

module.exports = Meetings;
