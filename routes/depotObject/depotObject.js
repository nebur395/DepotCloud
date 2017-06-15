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
     *       - Depot
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


    });



    return router;
};
