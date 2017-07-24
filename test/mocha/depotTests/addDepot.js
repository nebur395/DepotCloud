var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var ObjectId = require('mongoose').Types.ObjectId;
var createUserToken = require('../../common/jwtCreator').createUserToken;
var createUser = require('../../common/userCreator').createUser;
var deleteUser = require('../../common/userCreator').deleteUser;
var deleteDepots = require('../../common/depotCreator').deleteDepots;

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

        createUser(name, false, email, password, ["Pepe"], done);

    });

    /**
     * Tests for addDepot functionality.
     */
    describe("#addDepot()", function () {

        it('should successfully add a depot', function (done) {

            chai.request(server)
                .post('/depots/' + email)
                .send({
                    name: "Depot name",
                    location: "Depot Location",
                    type: "Storage Room",
                    distance: "[0-1km]",
                    description: "Depot Description",
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('depot');
                    result.body.depot.should.be.a('object');
                    result.body.depot.should.have.property('_id');
                    result.body.depot.should.have.property('name');
                    result.body.depot.should.have.property('owner');
                    result.body.depot.should.have.property('location');
                    result.body.depot.should.have.property('type');
                    result.body.depot.should.have.property('distance');
                    result.body.depot.should.have.property('description');

                    depotsId.push(new ObjectId(result.body.depot._id));
                    done();

                });
        });

        it('should return an error since the user doesn\'t exists', function (done) {

            chai.request(server)
                .post('/depots/wrong@email.com')
                .send({
                    name: "Depot name",
                    location: "Depot Location",
                    type: "Storage Room",
                    distance: "[0-1km]",
                    description: "Depot Description",
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

        it('should return an error since name is blank', function (done) {

            chai.request(server)
                .post('/depots/' + email)
                .send({
                    name: "",
                    location: "Depot Location",
                    type: "Storage Room",
                    distance: "[0-1km]",
                    description: "Depot Description",
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Los datos que se han introducido en el almacén son incorrectos.');

                    done();

                });
        });

        it('should return an error since type is blank', function (done) {

            chai.request(server)
                .post('/depots/' + email)
                .send({
                    name: "Depot name",
                    location: "Depot Location",
                    type: "",
                    distance: "[0-1km]",
                    description: "Depot Description",
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Los datos que se han introducido en el almacén son incorrectos.');

                    done();

                });
        });

        it('should return an error since distance is blank', function (done) {

            chai.request(server)
                .post('/depots/' + email)
                .send({
                    name: "Depot name",
                    location: "Depot Location",
                    type: "Storage Room",
                    distance: "",
                    description: "Depot Description",
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Los datos que se han introducido en el almacén son incorrectos.');

                    done();

                });
        });

        it('should return an error since member is blank', function (done) {

            chai.request(server)
                .post('/depots/' + email)
                .send({
                    name: "Depot name",
                    location: "Depot Location",
                    type: "Storage Room",
                    distance: "[0-1km]",
                    description: "Depot Description",
                    member: ""
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Los datos que se han introducido en el almacén son incorrectos.');

                    done();

                });
        });

        it('should return an error since type is invalid', function (done) {

            chai.request(server)
                .post('/depots/' + email)
                .send({
                    name: "Depot name",
                    location: "Depot Location",
                    type: "Wrong type",
                    distance: "[0-1km]",
                    description: "Depot Description",
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Los datos que se han introducido en el almacén son incorrectos.');

                    done();

                });
        });

        it('should return an error since distance is invalid', function (done) {

            chai.request(server)
                .post('/depots/' + email)
                .send({
                    name: "Depot name",
                    location: "Depot Location",
                    type: "Storage Room",
                    distance: "Wrong distance",
                    description: "Depot Description",
                    member: "Pepe"
                })
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Los datos que se han introducido en el almacén son incorrectos.');

                    done();

                });
        });

        it('should return an error since member is invalid', function (done) {

            chai.request(server)
                .post('/depots/' + email)
                .send({
                    name: "Depot name",
                    location: "Depot Location",
                    type: "Storage Room",
                    distance: "[0-1km]",
                    description: "Depot Description",
                    member: "Wrong member"
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
