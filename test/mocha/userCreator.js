var server = require('../../server');
var crypto = require("crypto");
var base64 = require('base-64');
var User = server.models.User;

/*
 * Create a user
 */
function createUser(name, admin, email, password, members, callback){

    var hashPass = require('crypto')
        .createHash('sha1')
        .update(password)
        .digest('base64');

    User.create({

        email: email,
        name: name,
        password: hashPass,
        admin: admin,
        members: members

    }, function () {
        if (callback) {
            callback();
        }
    });
}

/*
 * Delete a user
 */
function deleteUser(email, callback){

    User.collection.remove({"email": email}, function () {
        callback();
    });
}

exports.createUser = createUser;
exports.deleteUser = deleteUser;
