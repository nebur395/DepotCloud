var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var createUserToken = require('../../common/jwtCreator').createUserToken;
var createUser = require('../../common/userCreator').createUser;
var deleteUser = require('../../common/userCreator').deleteUser;
var createDepot = require('../../common/depotCreator').createDepot;
var deleteDepots = require('../../common/depotCreator').deleteDepots;

chai.use(chaiHttp);

/**
 * Test suite for Depot functionalities.
 */
describe('Depot', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var wrongEmail = "testUser2@email.com";
    var password = "testPass";
    var depotsId = [];

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, ["Pepe"], function () {

            createDepot("Depot name", email, "Depot Location", "Storage Room", "[0-1km]",
                "Depot Description", depotsId, function () {

                    createDepot("Depot name", email, "Depot Location", "Storage Room", "[0-1km]",
                        "Depot Description", depotsId, function () {

                            createUser(name, false, wrongEmail, password, ["Pepe"], done);

                        });
                });
        });

    });

    /**
     * Tests for deleteDepot functionality.
     */
    describe("#deleteDepot()", function () {

        it('should successfully delete a depot', function (done) {

            chai.request(server)
                .delete('/depots/' + email + '/' + depotsId[0])
                .send({
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(true);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Almacén eliminado correctamente.');

                    done();

                });
        });

        it('should return an error since the user doesn\'t exists', function (done) {

            chai.request(server)
                .delete('/depots/wrong@email.com/' + depotsId[1])
                .send({
                    member: "Pepe"
                })
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

        it('should return an error since the user isn\'t the owner of the depot', function (done) {

            chai.request(server)
                .delete('/depots/' + wrongEmail + '/' + depotsId[1])
                .send({
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('El almacén no existe o no eres su propietario.');

                    done();

                });
        });

        it('should return an error since member is invalid', function (done) {

            createDepot("Depot name", email, "Depot Location", "Storage Room", "[0-1km",
                "Depot Description", depotsId, function () {

                    chai.request(server)
                        .delete('/depots/' + email + '/' + depotsId[depotsId.length - 1])
                        .send({
                            member: "Marta"
                        })
                        .set('Authorization','Bearer ' + createUserToken(name, false))
                        .end(function (err, result) {

                            result.should.have.status(404);
                            result.body.should.be.a('object');
                            result.body.should.have.property('success');
                            result.body.success.should.equal(false);
                            result.body.should.have.property('message');
                            result.body.message.should.equal('El miembro de la unidad familiar con el' +
                                ' que se desea realizar la acción no existe o no pertenece a la misma.');

                            done();

                        });

                });
        });

        it('should return an error since id of the depot is wrong', function (done) {

            chai.request(server)
                .delete('/depots/' + email + '/' + depotsId[0])
                .send({
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('El almacén no existe o no eres su propietario.');

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
            deleteUser(email, function () {
                deleteUser(wrongEmail, done);
            });
        });

    });
});
