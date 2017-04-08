var mongoose = require("mongoose");

// Create the Schema
var userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    admin: {type: Boolean, required: true},
    registerDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('User', userSchema);
