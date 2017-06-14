var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Create the Schema
var activitySchema = mongoose.Schema({
    /*
     * Type values: MEMBER;DEPOT;OBJECT
     * ACTION: ADD;MODIFY;DELETE;
     * ATTRIBUTE: NAME;LOCATION;TYPE;DISTANCE;DESCRIPTION;DEPOT;IMAGE;GUARANTEE;DATEOFEXPIRY;
     */
    owner : {type: String, required: true},
    type : {type: String, required: true},
    action: {type: String, required: true},
    attribute: {type: String, required: true},
    oldValue: {type: String},
    newValue: {type: String},
    author: {type: String},
    activityDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('Activity', activitySchema);
