var express = require('express');
var async = require("async");

module.exports = function (app) {

    var router = express.Router();

    var User = app.models.User;


    /**
     * @swagger
     * /admin/users/{email}:
     *   put:
     *     tags:
     *       - Admin
     *     summary: Modificar la información de un usuario
     *     description: Permite a un administrador modificar una información
     *      determinada de un usuario en concreto.
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
     *       - name: name
     *         description: Nombre del usuario.
     *         in: body
     *         required: true
     *         type: string
     *       - name: newEmail
     *         description: Nuevo email del usuario.
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
    router.put("/users/:email", function (req, res) {

        if (!req.user.admin) {
            return res.status(403).send({
                "success": false,
                "message": "No estás autorizado a acceder a esta operación."
            });
        }

        // Checks all body fields
        if (!req.body.name || !req.body.newEmail) {
            return res.status(404).send({
                "success": false,
                "message": "Datos a actualizar incorrectos incorrectos."
            });
        }

        User.findOneAndUpdate({email: req.params.email}, {
            name: req.body.name,
            email: req.body.newEmail
        }, function (err, result) {

            if (err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }

            if (result) {
                return res.status(200).send({
                    "success": true,
                    "message": "Usuario actualizado correctamente."
                });
            } else {
                return res.status(404).send({
                    "success": false,
                    "message": "El usuario no existe."
                });
            }

        });
    });

    /**
     * @swagger
     * /admin/users/{email}/active:
     *   put:
     *     tags:
     *       - Admin
     *     summary: Reactivar una cuenta de usuario.
     *     description: Permite a un administrador emplear sus todopoderosas
     *      bolas de dragón para reactivar una cuenta de usuario que éste
     *      había borrado.
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
    router.put("/users/:email/active", function (req, res) {

        if (!req.user.admin) {
            return res.status(403).send({
                "success": false,
                "message": "No estás autorizado a acceder a esta operación."
            });
        }

        User.findOneAndUpdate({email: req.params.email}, {
            isActive: true,
            deactivationDate: null
        }, function (err, result) {

            if (err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }

            if (result) {
                return res.status(200).send({
                    "success": true,
                    "message": "Cuenta de usuario reactivada correctamente."
                });
            } else {
                return res.status(404).send({
                    "success": false,
                    "message": "El usuario no existe."
                });
            }
        });

    });

    return router;
};
