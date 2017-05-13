var express = require('express');
var async = require("async");

module.exports = function (app) {

    var router = express.Router();

    var User = app.models.User;

    /**
     * @swagger
     * /admin/users/:
     *   get:
     *     tags:
     *       - Admin
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
     *       404:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.get("/users", function (req, res) {

        if (!req.user.admin) {
            res.status(401).send({
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
                    "active": user.isActive
                };

                users.push(userInfo);
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

    return router;
};
