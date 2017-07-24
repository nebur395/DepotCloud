var express = require('express');
var async = require("async");
var addActivity = require('../activity/activityCreator').addActivity;

module.exports = function (app) {

    var router = express.Router();
    var User = app.models.User;
    var Depot = app.models.Depot;
    var DepotObject = app.models.DepotObject;

    /**
     * @swagger
     * /depots/{owner}:
     *   get:
     *     tags:
     *       - Depot
     *     summary: Listar almacenes.
     *     description: Lista todos los almacenes pertenecientes a una unidad familiar.
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
     *       - name: owner
     *         description: Email de la unidad familiar a la que pertenecen los almacenes.
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
     *                $ref: '#/definitions/Depot'
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
    router.get("/:owner", function (req, res) {

        User.findOne({email: req.params.owner}, function (err, userResult) {
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
                Depot.find({owner: req.params.owner}, function (err, depotResult) {

                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    }

                    var depots = [];
                    async.each(depotResult, function (depot, callback) {

                        // User to be sent in the response
                        var depotResponse = {
                            "_id": depot._id,
                            "name": depot.name,
                            "owner": depot.owner,
                            "location": depot.location,
                            "type": depot.type,
                            "distance": depot.distance,
                            "description": depot.description
                        };

                        depots.push(depotResponse);
                        callback();

                    }, function (err) {

                        if (err) {
                            return res.status(500).send({
                                "success": false,
                                "message": "Error interno del servidor."
                            });
                        }

                        return res.status(200).send({
                            "depots": depots
                        });
                    });
                });
            }
        });
    });

    /**
     * @swagger
     * /depots/{owner}/{id}:
     *   get:
     *     tags:
     *       - Depot
     *     summary: Obtener almacén.
     *     description: Obtiene toda la información correspondiente a un almacén determinado.
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
     *       - name: owner
     *         description: Email de la unidad familiar a la que pertenecen los almacenes.
     *         in: path
     *         required: true
     *         type: string
     *       - name: id
     *         description: ID del almacén del que se desea obtener la información.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Objeto con toda la información del almacén.
     *         schema:
     *           type: object
     *           properties:
     *              depot:
     *               type: array
     *               items:
     *                $ref: '#/definitions/Depot'
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
    router.get("/:owner/:id", function (req, res) {

        User.findOne({email: req.params.owner}, function (err, userResult) {
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
                Depot.findOne({_id: req.params.id}, function (err, depotResult) {

                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else {
                        // User to be sent in the response
                        var depotResponse = {
                            "_id": depotResult._id,
                            "name": depotResult.name,
                            "owner": depotResult.owner,
                            "location": depotResult.location,
                            "type": depotResult.type,
                            "distance": depotResult.distance,
                            "description": depotResult.description
                        };
                        return res.status(200).send({
                            "depot": depotResponse
                        });
                    }
                });
            }
        });
    });

    /**
     * @swagger
     * /depots/{owner}:
     *   post:
     *     tags:
     *       - Depot
     *     summary: Añadir almacén.
     *     description: Añade un almacén a la unidad familiar.
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
     *       - name: owner
     *         description: Email de la unidad familiar a la que pertenecen los almacenes.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del almacén.
     *         in: body
     *         required: true
     *         type: string
     *       - name: location
     *         description: Localización física real del almacén.
     *         in: body
     *         type: string
     *       - name: type
     *         description: |
     *           Tipo del almacén que puede ser: Storage Room, House, Wardrobe.
     *         in: body
     *         required: true
     *         type: string
     *       - name: distance
     *         description: |
     *           Distancia que hay del deposito actual a tu domicilio habitual. Puede ser: "[0-1km],
     *           [1km-2km], [2km-10km], [10km-100km], [100km-300km], [300km, +]".
     *         in: body
     *         required: true
     *         type: string
     *       - name: description
     *         description: Descripción del almacén.
     *         in: body
     *         type: string
     *       - name: member
     *         description: Miembro de la unidad familiar que está creando el almacén.
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: El Depot que se acaba de crear.
     *         schema:
     *           type: object
     *           properties:
     *              depot:
     *                $ref: '#/definitions/Depot'
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
    router.post("/:owner", function (req, res) {

        User.findOne({email: req.params.owner}, function (err, userResult) {

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
            } else if (!req.body.name || !req.body.type || !req.body.distance || !req.body.member ||
                !isValidType(req.body.type) || !isValidDistance(req.body.distance)) {
                return res.status(404).send({
                    "success": false,
                    "message": "Los datos que se han introducido en el almacén son incorrectos."
                });
            } else if (!isMember(userResult.members, req.body.member)) {
                return res.status(404).send({
                    "success": false,
                    "message": "El miembro de la unidad familiar con el que se desea realizar la" +
                    " acción no existe o no pertenece a la misma."
                });
            } else {

                Depot.create({

                    name: req.body.name,
                    owner: req.params.owner,
                    location: req.body.location,
                    type: req.body.type,
                    distance: req.body.distance,
                    description: req.body.description

                }, function (err, depotResult) {

                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else {
                        addActivity(req.params.owner, 'DEPOT', 'ADD', req.body.name,
                            req.body.member, function () {
                                var depotResponse = {
                                    "_id": depotResult._id,
                                    "name": depotResult.name,
                                    "owner": depotResult.owner,
                                    "location": depotResult.location,
                                    "type": depotResult.type,
                                    "distance": depotResult.distance,
                                    "description": depotResult.description
                                };
                                return res.status(200).send({
                                    "depot": depotResponse
                                });
                            });
                    }
                });
            }

        });
    });

    /**
     * @swagger
     * /depots/{owner}/{id}:
     *   put:
     *     tags:
     *       - Depot
     *     summary: Modificar un almacén.
     *     description: Modifica un almacén de una unidad familiar.
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
     *       - name: owner
     *         description: Email de la unidad familiar a la que pertenecen los almacenes.
     *         in: path
     *         required: true
     *         type: string
     *       - name: id
     *         description: ID del almacén.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del almacén.
     *         in: body
     *         required: true
     *         type: string
     *       - name: location
     *         description: Localización física real del almacén.
     *         in: body
     *         type: string
     *       - name: type
     *         description: |
     *           Tipo del almacén que puede ser: Storage Room, House, Wardrobe.
     *         in: body
     *         required: true
     *         type: string
     *       - name: distance
     *         description: |
     *           Distancia que hay del deposito actual a tu domicilio habitual. Puede ser: "[0-1km],
     *           [1km-2km], [2km-10km], [10km-100km], [100km-300km], [300km, +]".
     *         in: body
     *         required: true
     *         type: string
     *       - name: description
     *         description: Descripción del almacén.
     *         in: body
     *         type: string
     *       - name: member
     *         description: Miembro de la unidad familiar que está creando el almacén.
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
    router.put("/:owner/:id", function (req, res) {
        User.findOne({email: req.params.owner}, function (err, userResult) {

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
                Depot.findOne({_id: req.params.id}, function (err, depotResult) {
                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else if (!depotResult) {
                        return res.status(404).send({
                            "success": false,
                            "message": "El almacén que se desea modificar no existe."
                        });
                    } else if (!req.body.name || !req.body.type || !req.body.distance || !req.body.member ||
                        !isValidType(req.body.type) || !isValidDistance(req.body.distance)) {
                        return res.status(404).send({
                            "success": false,
                            "message": "Los datos que se han introducido en el almacén son incorrectos."
                        });
                    } else if (!isMember(userResult.members, req.body.member)) {
                        return res.status(404).send({
                            "success": false,
                            "message": "El miembro de la unidad familiar con el que se desea realizar la" +
                            " acción no existe o no pertenece a la misma."
                        });
                    } else if (depotResult.owner !== req.params.owner) {
                        return res.status(404).send({
                            "success": false,
                            "message": "Fallo al modificar el almacén. Se ha de ser el" +
                            " propietario del mismo."
                        });
                    } else {

                        var depotNameTemp = depotResult.name;
                        depotResult.name = req.body.name;
                        depotResult.location = req.body.location;
                        depotResult.type = req.body.type;
                        depotResult.distance = req.body.distance;
                        depotResult.description = req.body.description;

                        depotResult.save(function (err) {

                            if (err) {
                                return res.status(500).send({
                                    "success": false,
                                    "message": "Error interno del servidor."
                                });
                            } else {
                                addActivity(req.params.owner, 'DEPOT', 'MODIFY', depotNameTemp,
                                    req.body.member, function () {
                                        return res.status(200).send({
                                            "success": true,
                                            "message": "Almacén modificado correctamente."
                                        });
                                    });
                            }
                        });
                    }
                })
            }
        });
    });

    /**
     * @swagger
     * /depots/{owner}/{id}:
     *   delete:
     *     tags:
     *       - Depot
     *     summary: Eliminar un almacén.
     *     description: Elimina un almacén de una unidad familiar.
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
     *       - name: owner
     *         description: Email de la unidad familiar a la que pertenecen los almacenes.
     *         in: path
     *         required: true
     *         type: string
     *       - name: id
     *         description: ID del almacén.
     *         in: path
     *         required: true
     *         type: string
     *       - name: member
     *         description: Miembro de la unidad familiar que está creando el almacén.
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
    router.delete("/:owner/:id", function (req, res) {
        User.findOne({email: req.params.owner}, function (err, userResult) {

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
                Depot.findOneAndRemove({
                    "_id": req.params.id,
                    "owner": req.params.owner
                }, function (err, depotResult) {
                    if (err) {
                        return res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else if (!depotResult) {
                        return res.status(404).send({
                            "success": false,
                            "message": "El almacén no existe o no eres su propietario."
                        });
                    } else if (!isMember(userResult.members, req.body.member)) {
                        return res.status(404).send({
                            "success": false,
                            "message": "El miembro de la unidad familiar con el que se desea realizar la" +
                            " acción no existe o no pertenece a la misma."
                        });
                    } else {

                        DepotObject.find({"depot": depotResult._id}).remove(function () {
                            addActivity(req.params.owner, 'DEPOT', 'DELETE', depotResult.name,
                                req.body.member, function () {
                                    return res.status(200).send({
                                        "success": true,
                                        "message": "Almacén eliminado correctamente."
                                    });
                                });
                        });
                    }
                })
            }
        });
    });

    /*
     * Return true if [type] is a valid value of type.
     */
    function isValidType(type) {
        return (type === "Storage Room") || (type === "House") || (type === "Wardrobe");
    }

    /*
     * Return true if [distance] is a valid value of distance.
     */
    function isValidDistance(distance) {
        return (distance === "[0-1km]") || (distance === "[1km-2km]") || (distance === "[2km-10km]"
            || (distance === "[10km-100km]") || (distance === "[100km-300km]") || (distance === "[300km, +]") );
    }

    /*
     * Return true if [member] exist in [accountMembers].
     */
    function isMember(accountMembers, member) {
        var index = accountMembers.indexOf(member);
        return index !== -1;
    }

    return router;
};
