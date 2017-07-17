var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var Depot = server.models.Depot;
var ObjectId = require('mongoose').Types.ObjectId;
var createUserToken = require('../jwtCreator').createUserToken;
var createUser = require('../userCreator').createUser;
var deleteUser = require('../userCreator').deleteUser;
var createDepot = require('../depotCreator').createDepot;
var deleteDepots = require('../depotCreator').deleteDepots;
var createDepotObject = require('../depotObjectCreator').createDepotObject;
var deleteDepotObjects = require('../depotObjectCreator').deleteDepotObjects;

chai.use(chaiHttp);

/**
 * Test suite for DepotObject functionalities.
 */
describe('DepotObject', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var password = "testPass";
    var depotsId = [];
    var depotObjectsId = [];

    var image = "iVBORw0KGgoAAAANSUhEUgAAATQAAAEuCAIAAACPrn" +
        "k1AAAAKnRFWHRDcmVhdGlvbiBUaW1lAOh0IDIwIFhJIDIwMDgg" +
        "MDE6MzE6NDUgKzAxMDAbKxfdAAAAB3RJTUUH2AsUACAcG5e91g" +
        "AAAAlwSFlzAAAK8AAACvABQqw0mAAAAARnQU1BAACxjwv8YQUA" +
        "AAO6SURBVHja7doxDsIwEABBgvj/l00NJKmQshfNdHZ1zeoKe1" +
        "trPYCe59UDAPvECVHihChxQpQ4IUqcECVOiBInRIkTosQJUeKE" +
        "KHFClDghSpwQJU6IEidEiROixAlR4oQocUKUOCFKnBAlTogSJ0" +
        "SJE6LECVHihChxQpQ4IUqcECVOiBInRIkTosQJUeKEKHFClDgh" +
        "SpwQJU6IEidEiROixAlR4oQocUKUOCFKnBAlTogSJ0SJE6LECV" +
        "HihChxQpQ4IUqcECVOiBInRIkTosQJUeKEKHFClDghSpwQJU6I" +
        "EidEiROixAlR4oQocUKUOCFKnBAlTogSJ0SJE6LECVHihChxQp" +
        "Q4IUqcECVOiBInRIkTosQJUeKEKHFClDghSpwQJU6IEidEiROi" +
        "xAlR4oQocUKUOCFKnBAlTogSJ0SJE6LECVHihChxQpQ4IUqcEC" +
        "VOiBInRIkTosQJUeKEKHFClDghSpwQJU6IEidEiROixAlR4oQo" +
        "cUKUOCFKnBAlTogSJ0SJE6LECVHihChxQpQ4IUqcECVOiBInRI" +
        "kTosQJUeKEKHFClDghSpwQJU6IEidEiROixAlR4oQocULU6+oB" +
        "+Idt+ziudfVA/IHNOd9Xmbs3DCTO4Y461Od84pzsvEB9DidOiB" +
        "InRIkTosQJUeKc7Pw902vncOIc7qhAZc4nzvl+O1TmLfi+dwtq" +
        "vCObE6LECVHihChxQpQ4IUqcECVOiBInRIkTosQJUeKEKHFClD" +
        "ghSpwQJU6IEidEiROixAlR4oQocUKUOCFKnBAlTogSJ0SJE6LE" +
        "CVHihChxQpQ4IUqcECVOiBInRIkTosQJUeKEKHFClDghSpwQJU" +
        "6IEidEiROixAlR4oQocUKUOCFKnBAlTogSJ0SJE6LECVHihChx" +
        "QpQ4IUqcECVOiBInRIkTosQJUeKEKHFClDghSpwQJU6IEidEiR" +
        "OixAlR4oQocUKUOCFKnBAlTogSJ0SJE6LECVHihChxQpQ4IUqc" +
        "ECVOiBInRIkTosQJUeKEKHFClDghSpwQJU6IEidEiROixAlR4o" +
        "QocUKUOCFKnBAlTogSJ0SJE6LECVHihChxQpQ4IUqcECVOiBIn" +
        "RIkTosQJUeKEKHFClDghSpwQJU6IEidEiROixAlR4oQocUKUOC" +
        "FKnBAlTogSJ0SJE6LECVHihChxQpQ4IUqcECVOiBInRIkTosQJ" +
        "UeKEKHFClDghSpwQJU6IEidEiROixAlR4oQocUKUOCFKnBAlTo" +
        "gSJ0SJE6LECVHihChxQpQ4IeoNZV8VWyt15Y8AAAAASUVORK5CYII=";
    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, ["Pepe"], function () {

            createDepot("Depot name", email, "Depot Location", "Storage Room", "[0-1km]",
                "Depot Description", depotsId, function () {

                    createDepotObject(depotsId[0], email, "test depot object", null, "2017-06-17",
                        "2017-06-17", "Depot Description", depotObjectsId, done);
                });
        });


    });

    /**
     * Tests for getDepotObjects functionality.
     */
    describe("#getDepotObjects()", function () {

        it('should successfully get a list of depots', function (done) {

            chai.request(server)
                .post('/depotObjects/' + depotsId[0])
                .send({
                    owner: email,
                    name: "test depot object",
                    image: image,
                    guarantee: "2017-06-17",
                    dateOfExpiry: "2017-06-17",
                    description: "Depot Description",
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    depotObjectsId.push(new ObjectId(result.body.depotObject._id));

                    chai.request(server)
                        .get('/depotObjects/' + depotsId[0])
                        .set('Authorization','Bearer ' + createUserToken(name, false))
                        .end(function (err, result) {

                            result.should.have.status(200);
                            result.body.should.be.a('object');
                            result.body.should.have.property('depotObjects');
                            result.body.depotObjects.should.be.a('array');

                            done();

                        });

                });
        });

        it('should successfully get a list of depots', function (done) {

            chai.request(server)
                .post('/depotObjects/' + depotsId[0])
                .send({
                    owner: email,
                    name: "test depot object",
                    image: image,
                    guarantee: "2017-06-17",
                    dateOfExpiry: "2017-06-17",
                    description: "Depot Description",
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    depotObjectsId.push(new ObjectId(result.body.depotObject._id));

                    chai.request(server)
                        .get('/depotObjects/search/' + email + '/test')
                        .set('Authorization','Bearer ' + createUserToken(name, false))
                        .end(function (err, result) {

                            result.should.have.status(200);
                            result.body.should.be.a('object');
                            result.body.should.have.property('depotObjects');
                            result.body.depotObjects.should.be.a('array');

                            done();

                        });

                });
        });

        it('should return an error since the depot doesn\'t exists', function (done) {

            Depot.collection.remove({"_id":depotsId[0]}, function(){
                chai.request(server)
                    .get('/depotObjects/' + depotsId[0])
                    .set('Authorization','Bearer ' + createUserToken(name, false))
                    .end(function (err, result) {

                        result.should.have.status(404);
                        result.body.should.be.a('object');
                        result.body.should.have.property('success');
                        result.body.success.should.equal(false);
                        result.body.should.have.property('message');
                        result.body.message.should.equal('El almacén al que se intenta acceder no existe.');

                        done();

                    });
            });
        });

    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {

        deleteDepotObjects(depotObjectsId, function () {
            deleteDepots(depotsId, function () {
                deleteUser(email, done);
            });
        });

    });
});
