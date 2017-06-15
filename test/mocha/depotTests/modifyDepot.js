var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var crypto = require("crypto");
var base64 = require('base-64');
var User = server.models.User;
var Depot = server.models.Depot;
var ObjectId = require('mongoose').Types.ObjectId;
var createUserToken = require('../jwtCreator').createUserToken;

chai.use(chaiHttp);

/**
 * Test suite for Depot functionalities.
 */
describe('Depot', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var wrongEmail = "testUser2@email.com";
    var password = "testPass";
    var hashPass = require('crypto')
        .createHash('sha1')
        .update(password)
        .digest('base64');
    var depotsId = [];

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        User.create({

            email: email,
            name: name,
            password: hashPass,
            admin: false,
            members: ["Pepe"]

        }, function () {
            Depot.create ({

                name: "Depot name",
                owner: email,
                location: "Depot Location",
                type: "Storage Room",
                distance: "[0-1km]",
                description: "Depot Description"

            }, function (err,result) {
                depotsId.push(new ObjectId(result._id));
                User.create ({

                    email: wrongEmail,
                    name: name,
                    password: hashPass,
                    admin: false,
                    members: ["Pepe"]

                }, function () {
                    done();
                });
            });
        });


    });

    /**
     * Tests for modifyDepot functionality.
     */
    describe("#modifyDepot()", function () {

        it('should successfully modify a depot', function (done) {

            chai.request(server)
                .put('/depots/' + email + '/' + depotsId[0])
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
                    result.body.should.have.property('success');
                    result.body.success.should.equal(true);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Almacén modificado correctamente.');

                    done();

                });
        });

        it('should return an error since the user doesn\'t exists', function (done) {

            chai.request(server)
                .put('/depots/wrong@email.com/' + depotsId[0])
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

        it('should return an error since id of the depot is wrong', function (done) {

            chai.request(server)
                .put('/depots/' + email + '/' + new ObjectId())
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
                    result.body.message.should.equal('El almacén que se desea modificar no existe.');

                    done();

                });
        });

        it('should return an error since the user isn\'t the owner of the depot', function (done) {

            chai.request(server)
                .put('/depots/' + wrongEmail + '/' + depotsId[0])
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
                    result.body.message.should.equal('Fallo al modificar el almacén. Se ha de ser el propietario del mismo.');

                    done();

                });
        });

        it('should return an error since name is blank', function (done) {

            chai.request(server)
                .put('/depots/' + email + '/' + depotsId[0])
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
                .put('/depots/' + email + '/' + depotsId[0])
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
                .put('/depots/' + email + '/' + depotsId[0])
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
                .put('/depots/' + email + '/' + depotsId[0])
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
                .put('/depots/' + email + '/' + depotsId[0])
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
                .put('/depots/' + email + '/' + depotsId[0])
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
                .put('/depots/' + email + '/' + depotsId[0])
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
        Depot.collection.remove({"_id": {$in: depotsId}}, function(){
            User.collection.remove({"email":email}, function(){
                User.collection.remove({"email":wrongEmail}, function(){
                    done();
                });
            });
        });
    });
});
