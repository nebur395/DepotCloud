var express = require('express');

module.exports = function (app) {

    var router = express.Router();

    var User = app.models.User;


    /**
     * @swagger
     * /members/{email}/{name}:
     *   post:
     *     tags:
     *       - Members
     *     summary: Añade un miembro a la unidad familiar.
     *     description: Añade un miembro a la unidad familiar.
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
     *         description: Email de la unidad familiar de la que se quieren listar los miembros.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del miembro que se desea añadir a la unidad familiar.
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
    router.post("/:email/:name", function (req, res) {

    });

    return router;
};
