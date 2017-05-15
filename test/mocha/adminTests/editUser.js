var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var crypto = require("crypto");
var base64 = require('base-64');
var User = server.models.User;
var config = require("../../../config");
var createUserToken = require('../jwtCreator').createUserToken;

chai.use(chaiHttp);

/**
 * Test suite for Admin functionalities.
 */
describe('Admin', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var password = "testPass";
    var hashPass = require('crypto')
        .createHash('sha1')
        .update(password)
        .digest('base64');

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        User.create({

            email: email,
            name: name,
            password: hashPass,
            admin: false

        }, function () {
            done();
        });


    });

    /**
     * Tests for editUser functionality.
     */
    describe("#editUser()", function () {

        it('should successfully edit a user info changing his name and email', function (done) {

            chai.request(server)
                .put('/admin/users/' + email)
                .send({name: name, newEmail: email})
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(true);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Usuario actualizado correctamente.');

                    done();

                });
        });

        it('should return an error since user is not an admin', function (done) {

            chai.request(server)
                .put('/admin/users/' + email)
                .send({name: name, newEmail: email})
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

        it('should return an error since newEmail is blank', function (done) {

            chai.request(server)
                .put('/admin/users/' + email)
                .send({name: name, newEmail: ""})
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Datos a actualizar incorrectos incorrectos.');

                    done();

                });
        });

        it('should return an error since name is blank', function (done) {

            chai.request(server)
                .put('/admin/users/' + email)
                .send({name: "", newEmail: email})
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Datos a actualizar incorrectos incorrectos.');

                    done();

                });
        });

        it('should return an error since the user doesn\'t exist', function (done) {

            chai.request(server)
                .put('/admin/users/' + "false@email.com")
                .send({name: name, newEmail: email})
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('El usuario no existe.');

                    done();

                });
        });
    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {
        User.collection.remove({"email": email});
        done();
    });
});
