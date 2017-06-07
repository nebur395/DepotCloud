var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Create the Schema
var activitySchema = mongoose.Schema({
    /*
     * Type values: MEMBER;DEPOT;OBJECT
     * ACTION: ADD;MODIFY;DELETE;
     * ATTRIBUTE: NAME;LOCATION;TYPE;DISTANCE;DESCRIPTION;DEPOT;IMAGE;GUARANTEE;DATEOFEXPIRY;
     */
    type : {type: String, required: true},
    action: {type: String, required: true},
    attribute: {type: String, required: true},
    oldValue: {type: String, required: true},
    newValue: {type: String, required: true},
    author: {type: String, required: true},
    activityDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('Activity', activitySchema);
