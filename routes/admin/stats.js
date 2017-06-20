var WebSocket = require("ws");
var models = require('../../models');

var User = models.User;
var Depot = models.Depot;
var DepotObject = models.DepotObject;

function statsWebSocket (server) {
    getUsers(server)
}


/*
 * Websocket communication in: ws://localhost:8080/websocketStats/totalUsers
 *
 * Response:
 *
 *   Success: {totalUsers: number}
 *
 *   Error: {success: Boolean, message: String}
 */
function getUsers (server) {
    var wss = new WebSocket.Server({
        host: "localhost",
        server: server,
        path: "/websocketStats/totalUsers"
    });

    var response;

    wss.on('connection', function (ws, req) {

        var id = setInterval(function () {

            User.count({admin: false}, function(err, userResult){

                if(err) {
                    response = {
                        "success": false,
                        "message": "Error recuperando datos"
                    };
                    ws.send(JSON.stringify(response), function () { /* ignore errors */ });
                } else {
                    response = {
                        "totalUsers": userResult
                    };
                    ws.send(JSON.stringify(response), function () { /* ignore errors */ });
                }
            });


        }, 100);
        console.log('started client interval');
        ws.on('close', function () {
            console.log('stopping client interval');
            clearInterval(id);
        });
    });
}


exports.statsWebSocket = statsWebSocket;
