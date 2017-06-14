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

    return router;
};
