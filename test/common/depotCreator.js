var server = require('../../server');
var ObjectId = require('mongoose').Types.ObjectId;
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

        depotsId.push(new ObjectId(result._id));

        callback();

    });
}

/*
 * Delete a depot
 */
function deleteDepots(depotsId, callback){

    Depot.collection.remove({"_id": {$in: depotsId}}, function(){

        callback();

    });
}

exports.createDepot = createDepot;
exports.deleteDepots = deleteDepots;
