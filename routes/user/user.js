var http = require("http");
var express = require('express');
var base64 = require('base-64');
var utf8 = require('utf8');
var randomstring = require('randomstring');
var ip = require('ip');
var request = require('request');


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
     *       404:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.post("/", function(req,res){

        // Checks all body fields
        if (!req.body.name || !req.body.password|| !req.body.rePassword || !req.body.email) {
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

        //
        if ((req.body.password.length < 5) || (req.body.password.length > 20)) {
            res.status(404).send({
                "success": false,
                "message": "La contraseña no tiene el tamaño adecuado."
            });
            return;
        }

        User.findOne({email: req.body.email}, function(err, result){

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

                }, function (err, result){

                    if(err){
                        res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor"
                        });
                    } else {
                        res.status(200).send({
                            "success": true,
                            "message": "Usuario creado correctamente. Comprueba tu correo para" +
                            " confirmar tu cuenta."
                        });
                    }
                });
            }
        });
    });

    return router;
};
