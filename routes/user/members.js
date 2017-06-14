var express = require('express');
var addActivity = require('../activity/activity').addActivity;

module.exports = function (app) {

    var router = express.Router();
    var User = app.models.User;

    /**
     * @swagger
     * /members/{email}/{name}:
     *   post:
     *     tags:
     *       - Members
     *     summary: Añadir un miembro a la unidad familiar.
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
     *         description: Email de la unidad familiar de la que se quiere añadir un miembro.
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

        User.findOne({email: req.params.email}, function (err, userResult) {

            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }

            // Checks if a user already exist
            if (!userResult) {
                res.status(404).send({
                    "success": false,
                    "message": "La unidad familiar a la que se intenta acceder no existe."
                });
            } else {

                var members = userResult.members;
                members.push(req.params.name);
                members.sort();
                userResult.members = members;
                // Saves the user with the new member
                userResult.save(function (err) {
                    if (err) {
                        res.status(500).send({
                            "success": false,
                            "message": "Error interno del servidor."
                        });
                    } else {
                        addActivity(req.params.email, 'MEMBER', 'ADD', 'NAME', "", req.params.name,
                            "", function () {
                                res.status(200).send({
                                    "success": true,
                                    "message": "Miembro añadido correctamente a la unidad familiar."
                                });
                            });
                    }
                });
            }
        });
    });

    /**
     * @swagger
     * /members/{email}/{name}:
     *   put:
     *     tags:
     *       - Members
     *     summary: Modificar miembro de la unidad familiar.
     *     description: Modifica el nombre de un miembro de la unidad familiar.
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
     *         description: Email de la unidad familiar de la que se quiere modificar un miembro.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre actual del miembro que se desea modificar en la unidad familiar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: newName
     *         description: Nombre nuevo del miembro que se desea modificar en la unidad familiar.
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
    router.put("/:email/:name", function (req, res) {

        User.findOne({email: req.params.email}, function (err, userResult) {

            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }

            // Checks if a user already exist
            if (!userResult) {
                res.status(404).send({
                    "success": false,
                    "message": "La unidad familiar a la que se intenta acceder no existe."
                });
            } else {

                var members = userResult.members;
                var index = members.indexOf(req.params.name);
                if (index === -1) {
                    res.status(404).send({
                        "success": false,
                        "message": "El miembro de la unidad familiar que se desea modificar " +
                        "no existe."
                    });
                } else {
                    members.splice(index, 1);
                    members.push(req.body.newName);
                    members.sort();
                    userResult.members = members;
                    // Saves the user with the modified member
                    userResult.save(function (err) {
                        if (err) {
                            res.status(500).send({
                                "success": false,
                                "message": "Error interno del servidor."
                            });
                        } else {
                            addActivity(req.params.email, 'MEMBER', 'MODIFY', 'NAME',
                                req.params.name, req.body.newName, "", function () {

                                    res.status(200).send({
                                        "success": true,
                                        "message": "Miembro de la unidad familiar modificado correctamente."
                                    });
                                });
                        }
                    });
                }
            }
        });
    });

    /**
     * @swagger
     * /members/{email}/{name}:
     *   delete:
     *     tags:
     *       - Members
     *     summary: Eliminar miembro de la unidad familiar.
     *     description: Elimina el miembro de la unidad familiar.
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
     *         description: Email de la unidad familiar de la que se quiere eliminar un miembro.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del miembro que se desea eliminar en la unidad familiar.
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
    router.delete("/:email/:name", function (req, res) {

        User.findOne({email: req.params.email}, function (err, userResult) {

            if (err) {
                res.status(500).send({
                    "success": false,
                    "message": "Error interno del servidor."
                });
            }

            // Checks if a user already exist
            if (!userResult) {
                res.status(404).send({
                    "success": false,
                    "message": "La unidad familiar a la que se intenta acceder no existe."
                });
            } else {

                var members = userResult.members;
                var index = members.indexOf(req.params.name);
                if (index === -1) {
                    res.status(404).send({
                        "success": false,
                        "message": "El miembro de la unidad familiar que se desea eliminar " +
                        "no existe."
                    });
                } else {
                    members.splice(index, 1);
                    userResult.members = members;
                    // Saves the user with the deleted member
                    userResult.save(function (err) {
                        if (err) {
                            res.status(500).send({
                                "success": false,
                                "message": "Error interno del servidor."
                            });
                        } else {
                            addActivity(req.params.email, 'MEMBER', 'DELETE', 'NAME',
                                req.params.name, "", "", function () {
                                    res.status(200).send({
                                        "success": true,
                                        "message": "Miembro de la unidad familiar eliminado correctamente."
                                    });
                                });
                        }
                    });
                }
            }
        });
    });

    return router;
};
