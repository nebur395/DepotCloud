var http = require("http");
var express = require('express');
var base64 = require('base-64');
var utf8 = require('utf8');
var randomstring = require('randomstring');
var ip = require('ip');
var request = require('request');


module.exports = function (app) {

    var router = express.Router();

    /**
     * @swagger
     * definition:
     *   User:
     *     properties:
     *       userEmail:
     *         type: string
     *       userPassword:
     *         type: string
     */
    var User = app.models.User;

    /**
     * @swagger
     * /users/:
     *   post:
     *     tags:
     *       - Users
     *     description: Returns all users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of users
     *         schema:
     *           $ref: '#/definitions/User'
     */
    router.post("/", function(req,res){

    });

    /**
     * @swagger
     * /users/{email}:
     *   get:
     *     tags:
     *       - Users
     *     description: Returns a single user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: email
     *         description: User's email
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single user
     *         schema:
     *           $ref: '#/definitions/User'
     */
    router.get("/:email", function(req,res){

    });

    return router;
};
