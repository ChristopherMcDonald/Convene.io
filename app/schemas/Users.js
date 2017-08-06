var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var usersSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    email: String,
    alias: String,
    team: String,
    password: Buffer
}, {
    collection: "users"
});

// we need to create a model using it
var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
