var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    swaggerJSDoc = require("swagger-jsdoc"),
    morgan = require("morgan"),
    fs = require("fs"),
    config = require("./config"),
    jwt = require("express-jwt"),
    http = require("http"),
    WebSocket = require("ws");


var app = express();
var server = http.createServer(app);

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
    apis: ['./routes/admin/*.js', './routes/user/*.js', './routes/session/*.js', './routes/depot/*.js',
        './routes/depotObject/*.js', './routes/activity/*.js', './models/user.js', './models/depot.js',
        './models/depotObject.js', './models/activity.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// Secret key used to sign JWT
app.set('secret', config.secret);

app.use(express.static('./public'));

// Midelware to access handler and JWT
require('./security/jwt-handler')(app);

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended : true}));

// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.models = require('./models');

require('./routes')(app);

var wss = new WebSocket.Server({
    host: "localhost",
    server: server,
    path: "/websocketStats"
});
wss.on('connection', function (ws, req) {
    console.log(ws);
    var id = setInterval(function () {
        ws.send(JSON.stringify(process.memoryUsage()), function () { /* ignore errors */ });
    }, 100);
    console.log('started client interval');
    ws.on('close', function () {
        console.log('stopping client interval');
        clearInterval(id);
    });
});

// Database connection and server launching

var dbUri = 'mongodb://localhost:27017/depotCloudDb';
mongoose.connect(dbUri);
mongoose.connection.once('open', function () {

    console.log("MongoDB connection created in " + dbUri);

    server.listen(8080, function () {
        console.log("Server listening to PORT 8080");
    });

});

module.exports = app;
