var models = require('../../models');

var Activity = models.Activity;

/*
 * Create an activity with [type], [action], [name], and [author] params belonging to the
 * account [owner].
 * Execute a callback if exists when the activity is created.
 */
function addActivity(owner, type, action, name, author, callback) {

    Activity.create({

        owner: owner,
        type: type,
        action: action,
        name: name,
        author: author

    }, function (err) {

        if (!err && callback) {
            callback();
        }
    });
}

exports.addActivity = addActivity;
