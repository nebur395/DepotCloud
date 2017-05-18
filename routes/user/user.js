var express = require('express');
var crypto = require("crypto");
var base64 = require('base-64');
var async = require("async");

module.exports = function (app) {

    var router = express.Router();

    /**
     * @swagger
     * definition:
     *   FeedbackMessage:
     *     description: Mensaje de feedback que se devuelve al usuario en caso de error o acierto en una determinada
     *       operación.
     *     type: object
     *     properties:
     *       success:
     *         type: boolean
     *         required: true
     *         description: True si la operación ha ido con éxito. False si ha habido algún error.
     *       message:
     *         type: string
     *         required: true
     *         description: Mensaje que describe el resultado de una operación.
     */
    var User = app.models.User;

    /**
     * @swagger
     * /users/:
     *   get:
     *     tags:
     *       - Users
     *     summary: Listar todos los usuarios del sistema
     *     description: Lista todos los usuarios del sistema con información a la que sólo
     *      el admin puede acceder, a excepción de los usuarios administradores, que no los devuelve.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: |
     *           JWT estándar: `Authorization: Bearer + JWT`.
     *         in: header
     *         required: true
     *         type: string
     *         format: byte
     *     responses:
     *       200:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           type: object
     *           properties:
     *              users:
     *                type: array
     *                items:
     *                   $ref: '#/definitions/User'
     *       401:
     *         description: Mensaje de feedback para el usuario. Normalmente causado por no
     *           tener un token correcto o tenerlo caducado.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       403:
     *         description: Mensaje de feedback para el usuario. Normalmente causado por acceder
     *           a operaciones de administrador sin los privilegios necesarios.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       404:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.get("/", function (req, res) {

        if (!req.user.admin) {
            res.status(403).send({
                "success": false,
                "message": "No estás autorizado a acceder a esta operación."
            });
            return;
        }

        User.find({admin: false}, function (err, result) {

            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
                return;
            }

            var users = [];
            async.each(result, function (user, callback) {

                // User to be sent in the response
                var userResponse = {
                    "email": user.email,
                    "name": user.name,
                    "members": user.members,
                    "admin": user.admin,
                    "isActive": user.isActive
                };

                users.push(userResponse);
                callback();

            }, function (err) {

                if (err) {
                    res.status(500).send({
                        "success": false,
                        "message": "Error interno del servidor."
                    });
                    return;
                }

                res.status(200).send({
                    "users": users
                });
            });
        });

    });

    /**
     * @swagger
     * /users/:
     *   post:
     *     tags:
     *       - Users
     *     summary: Crear usuario (Sign Up)
     *     description: Crea una nueva cuenta familiar en el sistema comprobando la seguridad de
     *       las contraseñas.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: name
     *         description: Nombre de la cuenta familiar.
     *         in: body
     *         required: true
     *         type: string
     *       - name: password
     *         description: Contraseña de la cuenta familiar.
     *         in: body
     *         required: true
     *         type: string
     *       - name: rePassword
     *         description: Contraseña repetida de la cuenta familiar.
     *         in: body
     *         required: true
     *         type: string
     *       - name: email
     *         description: Email del usuario que sirve como identificador.
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       401:
     *         description: Mensaje de feedback para el usuario. Normalmente causado por no
     *           tener un token correcto o tenerlo caducado.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       404:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.post("/", function (req, res) {

        // Checks all body fields
        if (!req.body.name || !req.body.password || !req.body.rePassword || !req.body.email) {
            res.status(404).send({
                "success": false,
                "message": "Nombre, contraseña o email incorrectos."
            });
            return;
        }

        // Checks if both passwords are equals
        if (req.body.password !== req.body.rePassword) {
            res.status(404).send({
                "success": false,
                "message": "Las contraseñas no coinciden."
            });
            return;
        }

        // Checks if passwords are of adequate length
        if ((req.body.password.length < 5) || (req.body.password.length > 20)) {
            res.status(404).send({
                "success": false,
                "message": "La contraseña no tiene el tamaño adecuado."
            });
            return;
        }

        User.findOne({email: req.body.email}, function (err, result) {

            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }

            // Checks if a user already exist
            if (result) {
                res.status(404).send({
                    "success": false,
                    "message": "Ya existe una cuenta con ese correo."
                });
            } else {

                var hashPass = require('crypto')
                    .createHash('sha1')
                    .update(req.body.password)
                    .digest('base64');

                User.create({

                    email: req.body.email,
                    name: req.body.name,
                    password: hashPass,
                    admin: false

                }, function (err, result) {

                    if (err) {
                        res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else {
                        res.status(200).send({
                            "success": true,
                            "message": "Usuario creado correctamente."
                        });
                    }
                });
            }
        });
    });

    /**
     * @swagger
     * /users/{email}:
     *   put:
     *     tags:
     *       - Users
     *     summary: Editar perfil de usuario administrador o unidad familiar.
     *     description: Posibilidad de cambiar contraseña y/o nombre de un usuario administrador
     *       o una unidad familiar.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: |
     *           JWT estándar: `Authorization: Bearer + JWT`.
     *         in: header
     *         required: true
     *         type: string
     *         format: byte
     *       - name: email
     *         description: Email del usuario administrador o de la unidad familiar que sirve como
     *           identificador.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del usuario administrador o de la unidad familiar.
     *         in: body
     *         required: true
     *         type: string
     *       - name: current
     *         description: Contraseña actual del usuario administrador o de la unidad familiar.
     *         in: body
     *         required: true
     *         type: string
     *       - name: new
     *         description: Contraseña nueva del usuario administrador o de la unidad familiar.
     *         in: body
     *         required: false
     *         type: string
     *     responses:
     *       200:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       401:
     *         description: Mensaje de feedback para el usuario. Normalmente causado por no
     *           tener un token correcto o tenerlo caducado.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       404:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.put("/:email", function (req, res) {

        if (!req.body.current || !req.body.name) {
            res.status(404).send({
                "success": false,
                "message": "Datos de perfil incorrectos."
            });
            return;
        }

        // Checks if new password are of adequate length
        if (req.body.new && (req.body.new.length < 5) || (req.body.new.length > 20)) {
            res.status(404).send({
                "success": false,
                "message": "La contraseña nueva no tiene el tamaño adecuado."
            });
            return;
        }

        User.findOne({email: req.params.email}, function (err, result) {

            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
                return;
            }

            var hashPass = require('crypto')
                .createHash('sha1')
                .update(req.body.current)
                .digest('base64');

            if (result && hashPass === result.password) {

                // If user is changing his name and password
                if (req.body.new) {
                    hashPass = require('crypto')
                        .createHash('sha1')
                        .update(req.body.new)
                        .digest('base64');

                    User.update({email: req.params.email}, {
                        password: hashPass,
                        name: req.body.name
                    }, function (err, data) {

                        if (err) {
                            res.status(500).send({
                                "succes": false,
                                "message": "Error interno del servidor."
                            });
                            return;
                        }

                        res.status(200).send({
                            "success": true,
                            "message": "Usuario actualizado correctamente."
                        });

                    });
                } else {    // If user is only changing his name
                    User.update({email: req.params.email}, {
                        name: req.body.name
                    }, function (err, data) {

                        if (err) {
                            res.status(500).send({
                                "succes": false,
                                "message": "Error interno del servidor."
                            });
                            return;
                        }

                        res.status(200).send({
                            "success": true,
                            "message": "Usuario actualizado correctamente."
                        });

                    });
                }

            } else {
                res.status(404).send({
                    "success": false,
                    "message": "Email o contraseña actual incorrectos."
                });
            }
        });
    });

    /**
     * @swagger
     * /users/{email}:
     *   delete:
     *     tags:
     *       - Users
     *     summary: Borrar usuario
     *     description: Borra la cuenta de usuario y la marca como inactiva.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: |
     *           JWT estándar: `Authorization: Bearer + JWT`.
     *         in: header
     *         required: true
     *         type: string
     *         format: byte
     *       - name: email
     *         description: Email del usuario que sirve como identificador.
     *         in: path
     *         required: true
     *         type: string
     *       - name: current
     *         description: Contraseña actual del usuario administrador o de la unidad familiar.
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       401:
     *         description: Mensaje de feedback para el usuario. Normalmente causado por no
     *           tener un token correcto o tenerlo caducado.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       404:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.delete("/:email", function (req, res) {

        if (!req.body.current) {
            res.status(404).send({
                "success": false,
                "message": "Contraseña incorrecta."
            });
            return;
        }

        User.findOne({email: req.params.email}, function (err, result) {

            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
                return;
            }

            // Hashes the password in order to compare it with the stored one
            var hashPass = require('crypto')
                .createHash('sha1')
                .update(req.body.current)
                .digest('base64');

            // If the user exists and the password is correct
            if (result && hashPass === result.password) {
                User.update({email: req.params.email}, {
                    isActive: false,
                    deactivationDate: new Date()
                }, function (err, result) {
                    if (err) {
                        res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                        return;
                    }

                    res.status(200).send({
                        "success": true,
                        "message": "Cuenta de usuario eliminada correctamente."
                    });
                });
            } else { //No result
                res.status(404).send({
                    "success": false,
                    "message": "Email o contraseña incorrectos."
                });
            }
        });

    });

    return router;
};
