var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var createUserToken = require('../jwtCreator').createUserToken;
var createUser = require('../userCreator').createUser;
var deleteUser = require('../userCreator').deleteUser;
var createDepot = require('../depotCreator').createDepot;
var deleteDepots = require('../depotCreator').deleteDepots;

chai.use(chaiHttp);

/**
 * Test suite for Stats functionalities.
 */
describe('Stats', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var password = "testPass";
    var depotsId = [];

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, ["Pepe"], function () {

            createDepot("Depot name", email, "Depot Location", "House", "[0-1km]",
                "Depot Description", depotsId, function () {

                    createDepot("Depot name", email, "Depot Location", "House", "[1km-2km]",
                        "Depot Description", depotsId, function () {

                            createDepot("Depot name", email, "Depot Location", "House", "[2km-10km]",
                                "Depot Description", depotsId, function () {

                                    createDepot("Depot name", email, "Depot Location", "House",
                                        "[10km-100km]", "Depot Description", depotsId, function () {

                                            createDepot("Depot name", email, "Depot Location", "House",
                                                "[100km-300km]", "Depot Description", depotsId, function () {

                                                    createDepot("Depot name", email, "Depot Location", "House",
                                                        "[300km, +]", "Depot Description", depotsId, done);
                                                });
                                        });
                                });
                        });
                });
        });

    });

    /**
     * Tests for depotDistances stat.
     */
    describe("#depotDistances()", function () {

        it('should successfully get the depotDistances stats', function (done) {

            chai.request(server)
                .get('/adminStats/depotDistances')
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('depotDistances');
                    result.body.depotDistances.should.be.a('array');

                    done();

                });
        });

        it('should return an error since user isn\'t an admin', function (done) {

            chai.request(server)
                .get('/adminStats/depotDistances')
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(403);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('No estás autorizado a acceder a esta operación.');

                    done();

                });
        });
    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {

        deleteDepots(depotsId, function () {
            deleteUser(email, done);
        });

    });
});
