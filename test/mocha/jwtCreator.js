var config = require("../../config");
var jwt = require('jsonwebtoken');

/*
 * Create a jwt with [username], and [admin] params.
 */
function createUserToken(username, admin){
    var user = {
        "email": username + "@email.com",
        "name": username,
        "admin": admin
    };


    return jwt.sign(user, config.secret, {
            expiresIn: "1h"     // expires in 1 hour
        }
    );
}

exports.createUserToken = createUserToken;
