var express = require('express');
var addActivity = require('../activity/activity').addActivity;

module.exports = function (app) {

    var router = express.Router();

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
     *       - name: email
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
     *       - name: email
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
     *         required: true
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
    router.post("/:owner", function (req, res) {

    });

    /**
     * @swagger
     * /depots/{owner}/{name}:
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
     *       - name: email
     *         description: Email de la unidad familiar a la que pertenecen los almacenes.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del almacén.
     *         in: path
     *         required: true
     *         type: string
     *       - name: location
     *         description: Localización física real del almacén.
     *         in: body
     *         required: true
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
    router.put("/:owner/:name", function (req, res) {

    });

    /**
     * @swagger
     * /depots/{owner}/{name}:
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
     *       - name: email
     *         description: Email de la unidad familiar a la que pertenecen los almacenes.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del almacén.
     *         in: path
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
    router.delete("/:owner/:name", function (req, res) {

    });

    return router;
};
