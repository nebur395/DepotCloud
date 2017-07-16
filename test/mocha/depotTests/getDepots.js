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
 * Test suite for Depot functionalities.
 */
describe('Depot', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var password = "testPass";
    var depotsId = [];

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, ["Pepe"], function () {

            createDepot("Depot name", email, "Depot Location", "Storage Room", "[0-1km]",
                "Depot Description", depotsId, done);
        });

    });

    /**
     * Tests for getDepots functionality.
     */
    describe("#getDepots()", function () {

        it('should successfully get a list of depots', function (done) {

            chai.request(server)
                .get('/depots/' + email)
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('depots');
                    result.body.depots.should.be.a('array');

                    done();

                });
        });

        it('should successfully get a depot', function (done) {

            chai.request(server)
                .get('/depots/' + email + '/' + depotsId[0])
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('depot');
                    result.body.depot.should.be.a('object');

                    done();

                });
        });


        it('should return an error since the user doesn\'t exists getting a list of depots', function (done) {

            chai.request(server)
                .get('/depots/wrong@email.com')
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('La unidad familiar a la que se intenta acceder no existe.');

                    done();

                });
        });

        it('should return an error since the user doesn\'t exists getting a depot', function (done) {

            chai.request(server)
                .get('/depots/wrong@email.com/' + depotsId[0])
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('La unidad familiar a la que se intenta acceder no existe.');

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
