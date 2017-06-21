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
     *       incluidos usuarios con cuentas desactivadas.
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
    router.get("/totalUsers", function (req, res) {

        if (!req.user.admin) {
            return res.status(403).send({
                "success": false,
                "message": "No estás autorizado a acceder a esta operación."
            });
        }

        User.count({admin: false}, function (err, users) {
            if (err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
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
    router.get("/totalDepots", function (req, res) {

        if (!req.user.admin) {
            return res.status(403).send({
                "success": false,
                "message": "No estás autorizado a acceder a esta operación."
            });
        }

        Depot.count(function (err, depots) {
            if (err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
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
    router.get("/totalDepotObjects", function (req, res) {

        if (!req.user.admin) {
            return res.status(403).send({
                "success": false,
                "message": "No estás autorizado a acceder a esta operación."
            });
        }

        DepotObject.count(function (err, depotObjects) {
            if (err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }

            return res.status(200).send({
                "totalDepotObjects": depotObjects
            });
        });
    });

    /**
     * @swagger
     * /adminStats/usersStatus:
     *   get:
     *     tags:
     *       - AdminStats
     *     summary: Número de usuarios activos,e inactivos
     *     description: Devuelve el número de usuarios cuyas cuentas se cuentran actualmente
     *       activas,e inactivas.
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
     *         description: Número de usuarios en cada estado distinto.
     *         schema:
     *           type: object
     *           properties:
     *              usersStatus:
     *               type: array
     *               items:
     *                type: object
     *                properties:
     *                  activeUsers:
     *                   type: integer
     *                   description: Número de usuarios activos.
     *                  inactiveUsers:
     *                   type: integer
     *                   description: Número de usuarios inactivos.
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
    router.get("/usersStatus", function (req, res) {

        if (!req.user.admin) {
            return res.status(403).send({
                "success": false,
                "message": "No estás autorizado a acceder a esta operación."
            });
        }
        var activeUsers = 0;
        var inactiveUsers = 0;

        // Searches for all active users
        User.count({isActive: true}, function (err, actives) {

            if (err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }
            activeUsers = actives;

            // Searches for all inactive users
            User.count({isActive: false}, function (err, inactives) {

                if (err) {
                    return res.status(500).send({
                        "success": false,
                        "message": "Error interno del servidor."
                    });
                }
                inactiveUsers = inactives;

                return res.status(200).send({
                    "activeUsers": activeUsers,
                    "inactiveUsers": inactiveUsers
                });
            });
        });
    });

    /**
     * @swagger
     * /adminStats/depotsPerUser:
     *   get:
     *     tags:
     *       - AdminStats
     *     summary: Número medio de almacenes por usuario
     *     description: Devuelve el número medio de almacenes totales creados en
     *      el sistema en función del número de usuarios totales registrados en el sistema.
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
     *         description: Número medio de almacenes por usuario
     *         schema:
     *           type: object
     *           properties:
     *              depotsPerUser:
     *               type: integer
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
    router.get("/depotsPerUser", function (req, res) {

        if (!req.user.admin) {
            return res.status(403).send({
                "success": false,
                "message": "No estás autorizado a acceder a esta operación."
            });
        }

        User.count({admin: false}, function (err, users) {

            if (err) {
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }

            Depot.count({}, function (err, depots) {

                if (err) {
                    return res.status(500).send({
                        "success": false,
                        "message": "Error interno del servidor."
                    });
                }

                return res.status(200).send({
                    "depotsPerUser": depots / users
                });
            });
        });
    });



    return router;
};
