var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    swaggerJSDoc = require("swagger-jsdoc"),
    morgan = require("morgan"),
    fs = require("fs"),
    config = require("./config"),
    jwt = require("express-jwt"),
    cors = require('cors'),
    http = require("http"),
    https = require("https");


var app = express();
var server = http.createServer(app);

/*
 * Morgan used to log requests to the console in developer's mode
 * Comment this line in production mode
 */
app.use(morgan('dev'));

/*
 * Enable All CORS requests
 * Comment this line in production mode
 */
app.use(cors());

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
        './routes/depotObject/*.js', './routes/activity/*.js', './routes/reportGenerator/*.js',
        './models/user.js', './models/depot.js', './models/depotObject.js', './models/activity.js',
        './models/report.js']
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

// Creation of https connection
var privateKey = fs.readFileSync('localhost.key','utf8');
var certificate = fs.readFileSync('localhost.crt','utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials,app);

// Database connection and server launching
var dbUri = 'mongodb://localhost:27017/depotCloudDb';
mongoose.connect(dbUri);
mongoose.connection.once('open', function () {

    console.log("MongoDB connection created in " + dbUri);

    server.listen(8080, function () {
        console.log("Server listening to PORT 8080");
    });

    //HTTPS server launch (compatible with http at the same time)
    httpsServer.listen(8443,function () {
        console.log("Secure server listening to PORT 8443");
    });

});

var guaranteeChecker = require('./routes/reportGenerator/reportGenerator').guaranteeChecker;
/*
 * Check once per day (86400000)
 * Debug Mode: Check once per 5 minutes (300000) or 2 minutes (120000)
 */
setInterval(guaranteeChecker, 100);

var dateOfExpiryChecker = require('./routes/reportGenerator/reportGenerator').dateOfExpiryChecker;
/*
 * Check once per day (86400000)
 * Debug Mode: Check once per 5 minutes (300000) or 2 minutes (120000)
 */
setInterval(dateOfExpiryChecker, 100);

var depotObjectsUsageControl = require('./routes/reportGenerator/reportGenerator').depotObjectsUsageControl;
/*
 * Check once per day (86400000)
 * Debug Mode: Check once per 5 minutes (300000) or 2 minutes (120000)
 */
setInterval(depotObjectsUsageControl, 100);

module.exports = app;
