var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var createUserToken = require('../../common/jwtCreator').createUserToken;
var createUser = require('../../common/userCreator').createUser;
var createInactiveUser = require('../../common/userCreator').createInactiveUser;
var deleteUser = require('../../common/userCreator').deleteUser;

chai.use(chaiHttp);

/**
 * Test suite for Stats functionalities.
 */
describe('Stats', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var email2 = "testUserInactive@email.com";
    var password = "testPass";

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, ["Pepe"], function () {

            createInactiveUser(name, false, email2, password, ["Pepe"], done);
        });

    });

    /**
     * Tests for usersStatus stat.
     */
    describe("#usersStatus()", function () {

        it('should successfully get the usersStatus stats', function (done) {

            chai.request(server)
                .get('/adminStats/usersStatus')
                .set('Authorization','Bearer ' + createUserToken(name, true))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('activeUsers');
                    result.body.should.have.property('inactiveUsers');

                    done();

                });
        });

        it('should return an error since user isn\'t an admin', function (done) {

            chai.request(server)
                .get('/adminStats/usersStatus')
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

        deleteUser(email2, function () {
            deleteUser(email, done);
        });

    });
});
