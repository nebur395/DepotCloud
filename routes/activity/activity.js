var express = require('express');
var async = require("async");
var utf8 = require('utf8');


module.exports = function (app) {

    var router = express.Router();
    var User = app.models.User;
    var Activity = app.models.Activity;

    /**
     * @swagger
     * /activities/{user}:
     *   get:
     *     tags:
     *       - Activity
     *     summary: Listar actividades
     *     description: Lista todas las actividades que pertenecen a un usuario.
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
     *       - name: user
     *         description: Email de la unidad familiar a la que pertenecen las actividades.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Lista de actividades del usuario.
     *         schema:
     *           type: object
     *           properties:
     *              activities:
     *                type: array
     *                items:
     *                   $ref: '#/definitions/Activity'
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
    router.get("/:user", function (req, res) {

        // Looks for the user
        User.findOne({email: req.params.user}, function (err, userResult) {

            if (err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            } else if (!userResult) {
                return res.status(404).send({
                    "success": false,
                    "message": "La unidad familiar a la que se intenta acceder no existe."
                });
            } else {

                Activity.find({owner: req.params.user}, function (err, activityResult) {

                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    }

                    var activities = [];
                    async.each(activityResult, function (activity, callback) {

                        // User to be sent in the response
                        var activityResponse = {
                            "owner": activity.owner,
                            "type": activity.type,
                            "action": activity.action,
                            "name": activity.name,
                            "author": activity.author,
                            "activityDate": activity.activityDate
                        };

                        activities.push(activityResponse);
                        callback();

                    }, function (err) {

                        if (err) {
                            return res.status(500).send({
                                "success": false,
                                "message": "Error interno del servidor."
                            });
                        }

                        return res.status(200).send({
                            "activities": activities
                        });
                    });
                });
            }
        });
    });

    return router;
};
