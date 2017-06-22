var server = require('../../server');
var ObjectId = require('mongoose').Types.ObjectId;
var DepotObject = server.models.DepotObject;

/*
 * Create a depotObject
 */
function createDepotObject(depot, owner, name, image, guarantee, dateOfExpiry, description, depotObjectsId, callback){

    DepotObject.create({

        depot: depot,
        owner: owner,
        name: name,
        image: image,
        guarantee: guarantee,
        dateOfExpiry: dateOfExpiry,
        description: description

    }, function (err, result) {

        depotObjectsId.push(new ObjectId(result._id));

        callback();

    });
}

/*
 * Delete a depotObject
 */
function deleteDepotObjects(depotObjectsId, callback){

    DepotObject.collection.remove({"_id": {$in: depotObjectsId}}, function(){

        callback();

    });
}

exports.createDepotObject = createDepotObject;
exports.deleteDepotObjects = deleteDepotObjects;
