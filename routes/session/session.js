var http = require("http");
var express = require('express');
var base64 = require('base-64');
var utf8 = require('utf8');
var randomstring = require('randomstring');
var ip = require('ip');
var request = require('request');
var jwt = require ('jsonwebtoken');


module.exports = function (app) {

    var router = express.Router();
    var User = app.models.User;

    /**
     * @swagger
     * /login/:
     *   get:
     *     tags:
     *       - Session
     *     summary: Iniciar sesión
     *     description: End-point para iniciar sesión en el sistema. El usuario pasa los
     *       credenciales de la cuenta siguiendo el estándar de base64.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: |
     *           Base64 estándar: `Authorization: Basic + base64.encode(user:password)`.
     *         in: header
     *         required: true
     *         type: string
     *         format: byte
     *     responses:
     *       200:
     *         description: Información de perfil del usuario metido dentro de un JSON Web Token.
     *         schema:
     *           type: object
     *           properties:
     *             token:
     *               $ref: '#/definitions/User'
     *       404:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.get("/", function(req, res) {

        // Gets the Authorization header and retrieves and decodes the credentials.
        var auth = req.headers["authorization"];
        var bytes = base64.decode(auth.substring(6));
        var credentials = utf8.decode(bytes);
        var index = credentials.indexOf(":");
        var email = credentials.substring(0, index);
        var pass = credentials.substring(index+1);

        // Looks for the user
        User.findOneAndUpdate({email: email}, {lastLoginDate: Date.now()}, function(err, result) {

            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error recuperando datos."
                });
                return;
            }

            // Hashes the password in order to compare it with the stored one
            var hashPass = require('crypto')
                .createHash('sha1')
                .update(pass)
                .digest('base64');

            // If there's a user with that email
            if (result) {

                // Checks if the user's account is active
                if (!result.isActive) {
                    res.status(404).send({
                        "success": false,
                        "message": "La cuenta no está activa. Contacte con el administrador."
                    });
                    return;
                }

                // If the account is active and have no ban on it, checks if the password is correct
                if (hashPass !== result.password) {
                    res.status(404).send({
                        "success": false,
                        "message": "Email o contraseña incorrectos."
                    });
                    return;
                }

                // User to be sent in the response
                var userResponse = {
                    "email": result.email,
                    "name": result.name,
                    "members": result.members,
                    "admin": result.admin
                };

                // If user is found and password is right, create and sign a jwt for it
                var token = jwt.sign(userResponse, app.get('secret'), {
                    expiresIn: 300 // expires in 5 minutes
                });

                res.status(200).send({
                    "token": token
                });
            }
            // If there's no user with that email or the password is incorrect
            else {
                res.status(404).send({
                    "success": false,
                    "message": "Email o contraseña incorrectos."
                });
            }
        });
    });

    return router;
};
