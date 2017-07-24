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
     * Tests for getUsers functionality.
     */
    describe("#getUsers()", function () {

        it('should successfully return a user list', function (done) {

            chai.request(server)
                .get('/users/')
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('users');
                    result.body.users[0].should.have.property('email');
                    result.body.users[0].should.have.property('name');
                    result.body.users[0].should.have.property('admin');
                    result.body.users[0].should.have.property('isActive');
                    result.body.users[0].should.have.property('members');

                    done();

                });
        });

        it('should return an error since user is not an admin', function (done) {

            chai.request(server)
                .get('/users/')
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

    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {

        deleteUser(email, done);

    });
});
