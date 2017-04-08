var http = require("http");
var express = require('express');
var base64 = require('base-64');
var utf8 = require('utf8');
var randomstring = require('randomstring');
var ip = require('ip');
var request = require('request');


module.exports = function (app) {

    var router = express.Router();

    var User = app.models.User;

    router.post("/", function(req,res){

    });

    router.get("/login", function(req, res){

    });

    router.get("/:email", function(req,res){

    });

    router.put("/:email", function(req,res){

    });

    router.delete("/:email", function(req,res){
        console.log("Email: "+req.params.email);

    });

    return router;
};
