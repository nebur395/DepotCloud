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
    var email = "testUser@email.com";
    var password = "testPass";

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, [], done);

    });

    /**
     * Tests for activateUser functionality.
     */
    describe("#activateUser()", function () {

        it('should successfully activate a user account', function (done) {

            chai.request(server)
                .put('/admin/users/' + email + '/active')
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(true);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Cuenta de usuario reactivada correctamente.');

                    done();

                });
        });

        it('should return an error since user is not an admin', function (done) {

            chai.request(server)
                .put('/admin/users/' + email + '/active')
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

        it('should return an error since the user doesn\'t exist', function (done) {

            chai.request(server)
                .put('/admin/users/' + "false@email.com" + '/active')
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

        deleteUser(email, done);

    });
});
