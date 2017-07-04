var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var createUserToken = require('../jwtCreator').createUserToken;
var createUser = require('../userCreator').createUser;
var deleteUser = require('../userCreator').deleteUser;
var createDepot = require('../depotCreator').createDepot;
var deleteDepots = require('../depotCreator').deleteDepots;
var createDepotObject = require('../depotObjectCreator').createDepotObject;
var deleteDepotObjects = require('../depotObjectCreator').deleteDepotObjects;
var createReport = require('../reportCreator').createReport;
var deleteReport = require('../reportCreator').deleteReport;

chai.use(chaiHttp);

/**
 * Test suite for Report functionalities.
 */
describe('Report', function () {

    var name = "testUser";
    var email = "testUser2@email.com";
    var password = "testPass";
    var depotsId = [];
    var depotObjectsId = [];
    var reportsId = [];

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, ["Pepe"], function () {

            createDepot("Depot name", email, "Depot Location", "Storage Room", "[0-1km]",
                "Depot Description", depotsId, function () {

                    createDepotObject(depotsId[0], email, "test depot object", null, "2017-06-17",
                        "2017-06-17", "Depot Description", depotObjectsId, function () {

                            createReport(email, depotObjectsId[0], "guarantee", reportsId, done);
                        });
                });
        });

    });

    /**
     * Tests for getReports functionality.
     */
    describe("#getReports()", function () {

        it('should successfully get a list of reports', function (done) {

            chai.request(server)
                .get('/reports/' + email)
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('reports');
                    result.body.reports.should.be.a('array');

                    done();

                });
        });

        it('should return an error since the user doesn\'t exists', function (done) {

            chai.request(server)
                .get('/reports/wrong@email.com')
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

        deleteReport(reportsId, function () {
            deleteDepotObjects(depotObjectsId, function () {
                deleteDepots(depotsId, function () {
                    deleteUser(email, done);
                });
            });
        });
    });
});