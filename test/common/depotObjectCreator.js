var server = require('../../server');
var ObjectId = require('mongoose').Types.ObjectId;
var Depot = server.models.Depot;
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
 * Populates a set of depot objects in order to check the report generator
 */
function populateDepotObjectsReport(depot, owner, depotsId, depotObjectsId, callback){
    DepotObject.create({

        depot: depot,
        owner: owner,
        name: "test depot object",
        image: null,
        guarantee: "",
        dateOfExpiry: "",
        description:  "Depot Description"

    }, function (err, result) {

        depotObjectsId.push(new ObjectId(result._id));

        DepotObject.create({

            depot: depot,
            owner: owner,
            name: "test depot object",
            image: null,
            guarantee: "2016-06-17",
            dateOfExpiry: "2016-06-17",
            uses: 21,
            description:  "Depot Description"

        }, function (err, result) {

            depotObjectsId.push(new ObjectId(result._id));

            DepotObject.create({

                depot: depot,
                owner: owner,
                name: "test depot object",
                image: null,
                guarantee: "2017-02-17",
                dateOfExpiry: "2017-02-17",
                uses: 21,
                description:  "Depot Description"

            }, function (err, result) {

                depotObjectsId.push(new ObjectId(result._id));

                DepotObject.create({

                    depot: depot,
                    owner: owner,
                    name: "test depot object",
                    image: null,
                    guarantee: "2017-07-01",
                    dateOfExpiry: "2017-07-01",
                    uses: 21,
                    description:  "Depot Description"

                }, function (err, result) {

                    depotObjectsId.push(new ObjectId(result._id));

                    Depot.create({

                        name: "Depot name",
                        owner: owner,
                        location: "Depot Location",
                        type: "Storage Room",
                        distance: "[0-1km]",
                        description: "Depot Description"

                    }, function (err, result) {

                        depotsId.push(new ObjectId(result._id));

                        callback();

                    });

                });

            });

        });

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
exports.populateDepotObjectsReport = populateDepotObjectsReport;
exports.deleteDepotObjects = deleteDepotObjects;
