var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Create the Schema
var activitySchema = mongoose.Schema({
    /*
     * Type values: MEMBER;DEPOT;OBJECT
     * ACTION: ADD;MODIFY;DELETE;
     */
    owner : {type: String, required: true},
    type : {type: String, required: true},
    action: {type: String, required: true},
    name: {type: String, required: true},
    author: {type: String},
    activityDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('Activity', activitySchema);
