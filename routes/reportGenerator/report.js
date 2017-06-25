var express = require('express');
var async = require("async");


module.exports = function (app) {

    var router = express.Router();
    var User = app.models.User;
    var Report = app.models.Report;
    var DepotObject = app.models.DepotObject;

    /**
     * @swagger
     * /reports/{user}:
     *   get:
     *     tags:
     *       - Activity
     *     summary: Listar informes
     *     description: Lista todos los informes relacionados con una cuenta de unidad familiar.
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
     *         description: Email de la unidad familiar a la que pertenecen los informes.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Lista de informes del usuario.
     *         schema:
     *           type: object
     *           properties:
     *              reports:
     *                type: array
     *                items:
     *                   $ref: '#/definitions/Report'
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
    router.get("/:user", function(req, res) {

        // Looks for the user
        User.findOne({email: req.params.user}, function(err, userResult) {

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

                Report.find({owner: req.params.user}, function(err, reportResult) {

                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    }

                    var reports = [];
                    async.each(reportResult, function (report, callback) {

                        DepotObject.findOne({_id: report.depotObject}, function (err, depotObjectResult) {
                            if (err) {
                                return res.status(500).send({
                                    "success": false,
                                    "message": "Error interno del servidor."
                                });
                            } else if (depotObjectResult) {
                                // User to be sent in the response
                                var reportResponse = {
                                    "owner": report.owner,
                                    "depotObject": depotObjectResult.name,
                                    "type": report.type,
                                    "reportDate": report.reportDate
                                };

                                reports.push(reportResponse);
                                callback();
                            } else {
                                callback();
                            }
                        });

                    }, function (err) {

                        if (err) {
                            return res.status(500).send({
                                "success": false,
                                "message": "Error interno del servidor."
                            });
                        }

                        return res.status(200).send({
                            "reports": reports
                        });
                    });
                });
            }
        });
    });

    return router;
};
