var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var usersSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    email: {type: String, unique: true},
    alias: String,
    password: Buffer,
    team: Schema.Types.ObjectId
}, {
    collection: "users"
});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
