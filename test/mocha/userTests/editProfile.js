var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var createUserToken = require('../../common/jwtCreator').createUserToken;
var createUser = require('../../common/userCreator').createUser;
var deleteUser = require('../../common/userCreator').deleteUser;

chai.use(chaiHttp);

/**
 * Test suite for User functionalities.
 */
describe('User', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var password = "testPass";

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, [], done);

    });

    /**
     * Tests for editProfile functionality.
     */
    describe("#editProfile()", function () {

        it('should successfully edit a user profile changing his password and name', function (done) {

            chai.request(server)
                .put('/users/' + email)
                .send({name: name, current: password, new: password})
                .set('Authorization','Bearer ' + createUserToken(name, false))
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

        it('should successfully edit a user profile changing only his name', function (done) {

            chai.request(server)
                .put('/users/' + email)
                .send({name: name, current: password, new: ""})
                .set('Authorization','Bearer ' + createUserToken(name, false))
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

        it('should return an error since password is not a valid password', function (done) {

            chai.request(server)
                .put('/users/' + email)
                .send({name: name, current: password, new: "pass"})
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('La contraseña nueva no tiene el tamaño adecuado.');

                    done();

                });
        });

        it('should return an error since the user\'s password is wrong', function (done) {

            chai.request(server)
                .put('/users/' + email)
                .send({name: name, current: "wrongPass", new: ""})
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Email o contraseña actual incorrectos.');

                    done();

                });
        });

        it('should return an error message since name is blank', function (done) {

            chai.request(server)
                .put('/users/' + email)
                .send({name: "", current: password, new: ""})
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Datos de perfil incorrectos.');

                    done();

                });
        });

        it('should return an error message since password is blank', function (done) {

            chai.request(server)
                .put('/users/' + email)
                .send({name: name, current: "", new: ""})
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Datos de perfil incorrectos.');

                    done();

                });
        });
    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {

        deleteUser(email, done);

    });
});
