var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    swaggerJSDoc = require("swagger-jsdoc"),
    crypto = require("crypto"),
    fs = require("fs"),
    morgan = require("morgan"),
    config = require("./config"),
    jwt = require("express-jwt"),
    https = require("https");


var app = express();

// Morgan used to log requests to the console in developer's mode
app.use(morgan('dev'));

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Depot Cloud API ',
        version: '1.0.0',
        description: 'Descripción de la API de Depot Cloud.'
    },
    host: 'localhost:8080',
    basePath: '/'
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/user/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// Secret key used to sign JWT
app.set('secret', config.secret);

app.use(express.static('./public'));

// Midelware to access handler and JWT
require('./security/jwt-handler')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// serve swagger
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

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
