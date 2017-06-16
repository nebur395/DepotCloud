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
                return res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            } else if (!depotResult) {
                return res.status(404).send({
                    "success": false,
                    "message": "El almacén al que se intenta acceder no existe."
                });
            } else {
                DepotObject.find({depot: req.params.depot}, function (err, depotObjectResult) {

                    if (err) {
                        return res.status(500).send({
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
                            return res.status(500).send({
                                "success": false,
                                "message": "Error interno del servidor."
                            });
                            return;
                        }

                        return res.status(200).send({
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
     *         description: Fecha en el que cumple garantía el objeto (YYYY-MM-DD).
     *         in: body
     *         type: string
     *         format: date
     *       - name: dateOfExpiry
     *         description: Fecha en la que caduca el objeto (YYYY-MM-DD).
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

        // Sets the mongo database connection to gridfs in order to store and retrieve files in the DB.
        gfs = grid(mongoose.connection.db);

        if (!req.body.owner || !req.body.name || !req.body.member) {
            return res.status(404).send({
                "success": false,
                "message": "Los datos que se han introducido en el almacén son incorrectos."
            });
        } else if((req.body.guarantee && !isValidDate(req.body.guarantee))
            || (req.body.dateOfExpiry && !isValidDate(req.body.dateOfExpiry))) {
            return res.status(404).send({
                "success": false,
                "message": "El formato de las fechas es incorrecto."
            });
        }

        User.findOne({email: req.body.owner}, function (err, userResult) {

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
            } else if (!isMember(userResult.members, req.body.member)) {
                return res.status(404).send({
                    "success": false,
                    "message": "El miembro de la unidad familiar con el que se desea realizar la" +
                    " acción no existe o no pertenece a la misma."
                });
            } else {

                Depot.findOne({_id: req.params.depot}, function (err, depotResult) {
                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else if (!depotResult) {
                        return res.status(404).send({
                            "success": false,
                            "message": "El almacén al que se intenta acceder no existe."
                        });
                    } else {
                        var depotObject = new DepotObject({
                            name: req.body.name,
                            owner: req.body.owner,
                            depot: req.params.depot,
                            guarantee: req.body.guarantee,
                            dateOfExpiry: req.body.dateOfExpiry,
                            description: req.body.description
                        });
                        if (!req.body.image) {
                            depotObject.save(function (err, depotObjectResult) {
                                if (err) {
                                    return res.status(500).send({
                                        "success": false,
                                        "message": "Error interno del servidor."
                                    });
                                } else {
                                    addActivity(req.body.owner, 'OBJECT', 'ADD', req.body.name,
                                        req.body.member, function () {
                                            // User to be sent in the response
                                            var depotObjectResponse = {
                                                "_id": depotObjectResult._id,
                                                "name": depotObjectResult.name,
                                                "owner": depotObjectResult.owner,
                                                "depot": depotObjectResult.depot,
                                                "guarantee": depotObjectResult.guarantee,
                                                "dateOfExpiry": depotObjectResult.dateOfExpiry,
                                                "description": depotObjectResult.description
                                            };
                                            return res.status(200).send({
                                                "depotObject": depotObjectResponse
                                            });
                                        });
                                }
                            });
                        } else {
                            var imageName = req.body.name + "_image";
                            // Creates a readable stream with the image string that is in base64
                            var imageStream = new Readable();
                            imageStream.push(req.body.image);
                            imageStream.push(null);
                            storeImage(imageName, imageStream, function (imageId) {
                                depotObject.image = imageId;
                                depotObject.save(function (err, depotObjectResult) {
                                    if (err) {
                                        return res.status(500).send({
                                            "success": false,
                                            "message": "Error interno del servidor."
                                        });
                                    } else {
                                        addActivity(req.body.owner, 'OBJECT', 'ADD', req.body.name,
                                            req.body.member, function () {
                                                retrieveImage(depotObjectResult.image, function (data) {
                                                    var depotObjectResponse = {
                                                        "_id": depotObjectResult._id,
                                                        "name": depotObjectResult.name,
                                                        "owner": depotObjectResult.owner,
                                                        "depot": depotObjectResult.depot,
                                                        "guarantee": depotObjectResult.guarantee,
                                                        "dateOfExpiry": depotObjectResult.dateOfExpiry,
                                                        "description": depotObjectResult.description,
                                                        "image": data
                                                    };
                                                    return res.status(200).send({
                                                        "depotObject": depotObjectResponse
                                                    });
                                                });
                                            });
                                    }
                                });
                            });
                        }
                    }
                });
            }
        });
    });

    /**
     * @swagger
     * /depotObjects/{depot}/{name}:
     *   put:
     *     tags:
     *       - DepotObject
     *     summary: Modificar un objeto al almacén.
     *     description: Modifica un objeto de un almacén de la unidad familiar.
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
     *         description: ID del almacén en el que se va a modificar el objeto.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: ID del objeto que se va a modificar.
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
     *         description: Fecha en el que cumple garantía el objeto (YYYY-MM-DD).
     *         in: body
     *         type: string
     *         format: date
     *       - name: dateOfExpiry
     *         description: Fecha en la que caduca el objeto (YYYY-MM-DD).
     *         in: body
     *         type: string
     *         format: date
     *       - name: description
     *         description: Descripción del objeto.
     *         in: body
     *         type: string
     *       - name: member
     *         description: Miembro de la unidad familiar que está modificando el almacén.
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
    router.put("/:depot/:name", function (req, res) {

        // Sets the mongo database connection to gridfs in order to store and retrieve files in the DB.
        gfs = grid(mongoose.connection.db);

        if (!req.body.owner || !req.body.name || !req.body.member) {
            return res.status(404).send({
                "success": false,
                "message": "Los datos que se han introducido en el objeto son incorrectos."
            });
        } else if((req.body.guarantee && !isValidDate(req.body.guarantee))
            || (req.body.dateOfExpiry && !isValidDate(req.body.dateOfExpiry))) {
            return res.status(404).send({
                "success": false,
                "message": "El formato de las fechas es incorrecto."
            });
        }

        User.findOne({email: req.body.owner}, function (err, userResult) {

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
            } else if (!isMember(userResult.members, req.body.member)) {
                return res.status(404).send({
                    "success": false,
                    "message": "El miembro de la unidad familiar con el que se desea realizar la" +
                    " acción no existe o no pertenece a la misma."
                });
            } else {

                Depot.findOne({_id: req.params.depot}, function (err, depotResult) {
                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else if (!depotResult) {
                        return res.status(404).send({
                            "success": false,
                            "message": "El almacén al que se intenta acceder no existe."
                        });
                    } else {
                        DepotObject.findOne({_id: req.params.name}, function (err, depotObjectResult) {
                            if (err) {
                                return res.status(500).send({
                                    "success": false,
                                    "message": "Error interno del servidor."
                                });
                            } else if (!depotObjectResult) {
                                return res.status(404).send({
                                    "success": false,
                                    "message": "El ojeto al que se intenta acceder no existe."
                                });
                            } else {
                                var oldName = depotObjectResult.name;
                                depotObjectResult.name = req.body.name;
                                depotObjectResult.owner = req.body.owner;
                                depotObjectResult.depot = req.params.depot;
                                depotObjectResult.guarantee = req.body.guarantee;
                                depotObjectResult.dateOfExpiry = req.body.dateOfExpiry;
                                depotObjectResult.description = req.body.description;
                                if (!req.body.image && !depotObjectResult.image) {
                                    depotObjectResult.save(function (err) {
                                        if (err) {
                                            return res.status(500).send({
                                                "success": false,
                                                "message": "Error interno del servidor."
                                            });
                                        } else {
                                            addActivity(req.body.owner, 'OBJECT', 'MODIFY', oldName,
                                                req.body.member, function () {
                                                    return res.status(200).send({
                                                        "success": true,
                                                        "message": "Objeto modificado correctamente."
                                                    });
                                                });
                                        }
                                    });
                                } else if (!req.body.image && depotObjectResult.image) {
                                    removeImage(depotObjectResult.image, function () {
                                        depotObjectResult.image = null;
                                        depotObjectResult.save(function (err) {
                                            if (err) {
                                                return res.status(500).send({
                                                    "success": false,
                                                    "message": "Error interno del servidor."
                                                });
                                            } else {
                                                addActivity(req.body.owner, 'OBJECT', 'MODIFY', oldName,
                                                    req.body.member, function () {
                                                        return res.status(200).send({
                                                            "success": true,
                                                            "message": "Objeto modificado correctamente."
                                                        });
                                                    });
                                            }
                                        });
                                    });
                                } else if(req.body.image && !depotObjectResult.image) {
                                    var imageName = req.body.name + "_image";
                                    // Creates a readable stream with the image string that is in base64
                                    var imageStream = new Readable();
                                    imageStream.push(req.body.image);
                                    imageStream.push(null);
                                    storeImage(imageName, imageStream, function (imageId) {
                                        depotObjectResult.image = imageId;
                                        depotObjectResult.save(function (err) {
                                            if (err) {
                                                return res.status(500).send({
                                                    "success": false,
                                                    "message": "Error interno del servidor."
                                                });
                                            } else {
                                                addActivity(req.body.owner, 'OBJECT', 'MODIFY', oldName,
                                                    req.body.member, function () {
                                                        return res.status(200).send({
                                                            "success": true,
                                                            "message": "Objeto modificado correctamente."
                                                        });
                                                    });
                                            }
                                        });
                                    });
                                } else if (req.body.image && depotObjectResult.image) {
                                    removeImage(depotObjectResult.image, function () {
                                        var imageName = req.body.name + "_image";
                                        // Creates a readable stream with the image string that is in base64
                                        var imageStream = new Readable();
                                        imageStream.push(req.body.image);
                                        imageStream.push(null);
                                        storeImage(imageName, imageStream, function (imageId) {
                                            depotObjectResult.image = imageId;
                                            depotObjectResult.save(function (err) {
                                                if (err) {
                                                    return res.status(500).send({
                                                        "success": false,
                                                        "message": "Error interno del servidor."
                                                    });
                                                } else {
                                                    addActivity(req.body.owner, 'OBJECT', 'MODIFY', oldName,
                                                        req.body.member, function () {
                                                            return res.status(200).send({
                                                                "success": true,
                                                                "message": "Objeto modificado correctamente."
                                                            });
                                                        });
                                                }
                                            });
                                        });
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    });

    /**
     * @swagger
     * /depotObjects/{depot}/{name}:
     *   delete:
     *     tags:
     *       - DepotObject
     *     summary: Eliminar un objeto al almacén.
     *     description: Elimina un objeto de un almacén de la unidad familiar.
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
     *         description: ID del almacén en el que se va a eliminar el objeto.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: ID del objeto que se va a eliminar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: owner
     *         description: Email de la unidad familiar a la que pertenece el objeto.
     *         in: body
     *         required: true
     *         type: string
     *       - name: member
     *         description: Miembro de la unidad familiar que está eliminando el almacén.
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
    router.delete("/:depot/:name", function (req, res) {

        // Sets the mongo database connection to gridfs in order to store and retrieve files in the DB.
        gfs = grid(mongoose.connection.db);

        if (!req.body.owner || !req.body.member) {
            return res.status(404).send({
                "success": false,
                "message": "Los datos que se han introducido en el objeto son incorrectos."
            });
        }

        User.findOne({email: req.body.owner}, function (err, userResult) {

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
            } else if (!isMember(userResult.members, req.body.member)) {
                return res.status(404).send({
                    "success": false,
                    "message": "El miembro de la unidad familiar con el que se desea realizar la" +
                    " acción no existe o no pertenece a la misma."
                });
            } else {
                DepotObject.findOneAndRemove({"_id": req.params.name, "owner": req.body.owner}, function (err, depotObjectResult) {
                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else if (!depotObjectResult) {
                        return res.status(404).send({
                            "success": false,
                            "message": "El objeto no existe o no eres su propietario."
                        });
                    } else {
                        if(depotObjectResult.image) {
                            removeImage(depotObjectResult.image, function () {
                                addActivity(req.body.owner, 'OBJECT', 'DELETE', depotObjectResult.name,
                                    req.body.member, function () {
                                        return res.status(200).send({
                                            "success": true,
                                            "message": "Objeto eliminado correctamente."
                                        });
                                    });
                            });
                        } else {
                            addActivity(req.body.owner, 'OBJECT', 'DELETE', depotObjectResult.name,
                                req.body.member, function () {
                                    return res.status(200).send({
                                        "success": true,
                                        "message": "Objeto eliminado correctamente."
                                    });
                                });
                        }
                    }
                })
            }
        });
    });

    /*
     * Return true if [date] is a valid date.
     */
    function isValidDate(date) {
        var regExp = new RegExp("^[0-9]{4}\-[0-1][1-9]\-[0-3][0-9]$");
        return regExp.test(date);
    }

    /*
     * Return true if [member] exist in [accountMembers].
     */
    function isMember(accountMembers, member) {
        var index = accountMembers.indexOf(member);
        return index !== -1;
    }

    /**
     *  Stores a new image in the system.
     */
    function storeImage(name, readStream, callback){
        var writestream = gfs.createWriteStream({
            filename: name
        });
        readStream.pipe(writestream);
        writestream.on('close', function(file){
            return callback(file._id)
        });
    }

    function removeImage(imageId, callback) {
        gfs.remove({
            _id: imageId
        }, function(){
            return callback();
        })
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
