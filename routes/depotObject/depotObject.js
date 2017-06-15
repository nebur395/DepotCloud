var express = require('express');
var async = require("async");
var addActivity = require('../activity/activity').addActivity;
var grid = require("gridfs-stream");
var semaphore = require("semaphore")(1);
var mongoose = require("mongoose");
var fs = require("fs");
var Readable = require('stream').Readable;
var bs58 = require("bs58");
grid.mongo = mongoose.mongo;

module.exports = function (app) {

    var router = express.Router();
    var User = app.models.User;
    var Depot = app.models.Depot;
    var DepotObject = app.models.DepotObject;

    /**
     * @swagger
     * /depotObjects/{depot}:
     *   get:
     *     tags:
     *       - DepotObject
     *     summary: Listar objetos de un almacén.
     *     description: Lista todos los objetos que pertenecen a un almacén de una unidad familiar.
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
     *       - name: depot
     *         description: ID del almacén donde se encuentras los objetos a listar.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Lista con todos los almacenes de la unidad familiar.
     *         schema:
     *           type: object
     *           properties:
     *              depots:
     *               type: array
     *               items:
     *                $ref: '#/definitions/DepotObject'
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
    router.get("/:depot", function (req, res) {

        // Sets the mongo database connection to gridfs in order to store and retrieve files in the DB.
        gfs = grid(mongoose.connection.db);

        Depot.findOne({_id: req.params.depot}, function (err, depotResult) {
            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            } else if (!depotResult) {
                res.status(404).send({
                    "success": false,
                    "message": "El almacén al que se intenta acceder no existe."
                });
            } else {
                DepotObject.find({depot: req.params.depot}, function (err, depotObjectResult) {

                    if (err) {
                        res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                        return;
                    }

                    var depotObjects = [];
                    // Iterates all the DepotObjects stored in the system
                    async.each(depotObjectResult, function (depotObject, callback) {

                        // User to be sent in the response
                        var depotObjectResponse = {
                            "_id": depotObject._id,
                            "name": depotObject.name,
                            "owner": depotObject.owner,
                            "depot": depotObject.depot,
                            "guarantee": depotObject.guarantee,
                            "dateOfExpiry": depotObject.dateOfExpiry,
                            "description": depotObject.description
                        };
                        // Checks if there's an image attached to the DepotObject and retrieves
                        // it if it's the case.
                        if (depotObject.image) {
                            retrieveImage(depotObject.image, function (data) {
                                depotObjectResponse.image = data;
                                depotObjects.push(depotObjectResponse);
                                callback();
                            });
                        } else {
                            depotObjectResponse.image = "";
                            depotObjects.push(depotObjectResponse);
                            callback();
                        }

                    }, function (err) {

                        if (err) {
                            res.status(500).send({
                                "success": false,
                                "message": "Error interno del servidor."
                            });
                            return;
                        }

                        res.status(200).send({
                            "depotObjects": depotObjects
                        });
                    });
                });
            }
        });
    });

    /**
     * @swagger
     * /depotObjects/{depot}:
     *   post:
     *     tags:
     *       - DepotObject
     *     summary: Añadir un objeto al almacén.
     *     description: Añade un objeto al almacén de la unidad familiar.
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
     *       - name: depot
     *         description: ID del almacén en el que se va a guardar el objeto.
     *         in: path
     *         required: true
     *         type: string
     *       - name: owner
     *         description: Email de la unidad familiar a la que pertenece el objeto.
     *         in: body
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del objeto.
     *         in: body
     *         required: true
     *         type: string
     *       - name: image
     *         description: String en base64 que representa la imagen adjunta al objecto.
     *         in: body
     *         type: string
     *       - name: guarantee
     *         description: Fecha en el que cumple garantía el objeto.
     *         in: body
     *         type: string
     *         format: date
     *       - name: dateOfExpiry
     *         description: Fecha en la que caduca el objeto.
     *         in: body
     *         type: string
     *         format: date
     *       - name: description
     *         description: Descripción del objeto.
     *         in: body
     *         type: string
     *       - name: member
     *         description: Miembro de la unidad familiar que está creando el almacén.
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: El objeto que se acaba de crear.
     *         schema:
     *           type: object
     *           properties:
     *              depotObject:
     *                $ref: '#/definitions/DepotObject'
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
    router.post("/:depot", function (req, res) {

    });

    /*
     * Return true if [member] exist in [accountMembers].
     */
    function isMember(accountMembers, member) {
        var index = accountMembers.indexOf(member);
        return index !== -1;
    }

    /**
     * Gets the image data from the system, returning
     * a string encoded in base-64.
     */
    function retrieveImage(imageId, callback) {
        var buffer = new Buffer('');
        var readstream = gfs.createReadStream({
            _id: imageId
        });

        readstream.on("data", function (chunk) {
            if (!buffer) {
                buffer = chunk;
            }
            else {
                buffer = Buffer.concat([buffer, chunk]);
            }
        });

        readstream.on("end", function () {
            return callback(buffer.toString());
        });
    }

    return router;
};