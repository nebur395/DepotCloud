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

            }, function (err,result1) {
                depotsId.push(new ObjectId(result1._id));
                Depot.create({

                    name: "Depot name",
                    owner: email,
                    location: "Depot Location",
                    type: "Storage Room",
                    distance: "[0-1km]",
                    description: "Depot Description"

                }, function (err,result2) {
                    depotsId.push(new ObjectId(result2._id));
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
                    result.body.message.should.equal('Fallo al modificar el almacén. Se ha de ser el propietario del mismo.');

                    done();

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
                    result.body.message.should.equal('El almacén que se desea eliminar no existe.');

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
