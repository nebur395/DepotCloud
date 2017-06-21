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

    /**
     * @swagger
     * /adminStats/totalDepots:
     *   get:
     *     tags:
     *       - AdminStats
     *     summary: Número de almacenes totales del sistema
     *     description: Devuelve el número de almacenes totales registrados en el sistema.
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
     *         description: Número de almacenes totales del sistema.
     *         schema:
     *           type: object
     *           properties:
     *              totalDepots:
     *               type: integer
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.get("/totalDepots", function(req, res){

        if (!req.user.admin) {
            return res.status(401).send({
                "success": false,
                "message": "No estás autorizado a acceder."
            });
        }

        Depot.count(function(err, depots){
            if(err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error recuperando datos"
                });
            }

            return res.status(200).send({
                "totalDepots": depots
            });
        });
    });

    /**
     * @swagger
     * /adminStats/totalDepotObjects:
     *   get:
     *     tags:
     *       - AdminStats
     *     summary: Número de objetos totales del sistema
     *     description: Devuelve el número de objetos totales registrados en el sistema.
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
     *         description: Número de objetos totales del sistema.
     *         schema:
     *           type: object
     *           properties:
     *              totalDepotObjects:
     *               type: integer
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.get("/totalDepotObjects", function(req, res){

        if (!req.user.admin) {
            return res.status(401).send({
                "success": false,
                "message": "No estás autorizado a acceder."
            });
        }

        Depot.count(function(err, depotObjects){
            if(err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error recuperando datos"
                });
            }

            return res.status(200).send({
                "totalDepotObjects": depotObjects
            });
        });
    });

    return router;
};
