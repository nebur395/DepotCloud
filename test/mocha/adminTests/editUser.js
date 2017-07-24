var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var createUserToken = require('../jwtCreator').createUserToken;
var createUser = require('../userCreator').createUser;
var deleteUser = require('../userCreator').deleteUser;

chai.use(chaiHttp);

/**
 * Test suite for Admin functionalities.
 */
describe('Admin', function () {

    var name = "testUser";
    var email = "testUser1@email.com";
    var email2 = "testUser2@email.com";
    var password = "testPass";

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, [], function () {

            createUser(name, false, email2, password, [], done);
        });

    });

    /**
     * Tests for editUser functionality.
     */
    describe("#editUser()", function () {

        it('should successfully edit a user info changing his name and not his email', function (done) {

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

        it('should successfully edit a user info changing his name and email', function (done) {

            chai.request(server)
                .put('/admin/users/' + email)
                .send({name: name, newEmail: "modified@email.com"})
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    chai.request(server)
                        .put('/admin/users/' + "modified@email.com")
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
                .send({name: name, newEmail: "false@email.com"})
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

        it('should return an error since newEmail already exist', function (done) {

            chai.request(server)
                .put('/admin/users/' + email)
                .send({name: name, newEmail: email2})
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('El email al que se desea cambiar ya le' +
                        ' pertenece a otra cuenta.');

                    done();

                });
        });
    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {

        deleteUser(email2, function () {
            deleteUser(email, done);
        });

    });
});
