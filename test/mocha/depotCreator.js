var server = require('../../server');
var ObjectId = require('mongoose').Types.ObjectId;
var User = server.models.User;
var Depot = server.models.Depot;

/*
 * Create a depot
 */
function createDepot(name, owner, location, type, distance, description, depotsId, callback){

    Depot.create({

        name: name,
        owner: owner,
        location: location,
        type: type,
        distance: distance,
        description: description

    }, function (err, result) {

        if (depotsId) {

            depotsId.push(new ObjectId(result._id));

        } else if (callback) {

            callback();

        }
    });
}

/*
 * Delete a depot
 */
function deleteDepot(depotsId, callback){

    Depot.collection.remove({"_id": {$in: depotsId}}, function(){

        callback();

    });
}

exports.createDepot = createDepot;
exports.deleteDepot = deleteDepot;
