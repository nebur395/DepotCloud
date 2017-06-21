var express = require('express');
var async = require("async");

module.exports = function (app) {

    var router = express.Router();

    var User = app.models.User;
    var Depot = app.models.Depot;
    var DepotObject = app.models.DepotObject;


    /**
     * @swagger
     * /adminStats/totalUsers:
     *   get:
     *     tags:
     *       - AdminStats
     *     summary: Número de usuarios totales del sistema
     *     description: Devuelve el número de usuarios totales registrados en el sistema,
     *      incluidos usuarios con cuentas desactivadas.
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
     *         description: Número de usuarios totales del sistema.
     *         schema:
     *           type: object
     *           properties:
     *              totalUsers:
     *               type: integer
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.get("/totalUsers", function(req, res){

        if (!req.user.admin) {
            return res.status(401).send({
                "success": false,
                "message": "No estás autorizado a acceder."
            });
        }

        User.count({admin: false}, function(err, users){
            if(err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error recuperando datos"
                });
            }

            return res.status(200).send({
                "totalUsers": users
            });
        });
    });

    return router;
};
