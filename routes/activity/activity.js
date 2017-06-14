var models = require('../../models');

var Activity = models.Activity;
/*
 * Create an activity with [type], [action], [attribute], [oldValue], [newValue], and [author] params
 * belonging to the account [owner].
 * Execute a callback if exists when the activity is created.
 */
function addActivity(owner, type, action, attribute, oldValue, newValue, author, callback) {

    Activity.create({

        owner: owner,
        type : type,
        action: action,
        attribute: attribute,
        oldValue: oldValue,
        newValue: newValue,
        author: author

    }, function (err) {

        if (!err) {
            if (callback) {
                callback();
            }
        }
    });
}

exports.addActivity = addActivity;
