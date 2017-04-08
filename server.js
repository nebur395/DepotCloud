var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    swaggerJSDoc = require("swagger-jsdoc"),
    crypto = require("crypto"),
    fs = require("fs"),
    https = require("https");


var app = express();

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.models = require('./models');

require('./routes')(app);

app.use('/', function(req, res) {
    console.log("Welcome");
});

// Database connection and server launching

var dbUri = 'mongodb://localhost:27017/depotCloudDb';
mongoose.connect(dbUri);
mongoose.connection.once('open', function(){

    console.log("MongoDB connection created in "+dbUri);

    app.listen(8080, function(){
        console.log("Server listening to PORT 8080");
    });

});

module.exports = app;
