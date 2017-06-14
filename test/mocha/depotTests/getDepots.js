var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var crypto = require("crypto");
var base64 = require('base-64');
var User = server.models.User;
var createUserToken = require('../jwtCreator').createUserToken;

chai.use(chaiHttp);

/**
 * Test suite for Depot functionalities.
 */
describe('Depot', function () {

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
            admin: false,
            members: ["Pepe"]

        }, function () {
            done();
        });


    });

    /**
     * Tests for getDepots functionality.
     */
    describe("#getDepots()", function () {

        it('should successfully get a list of depots', function (done) {

            chai.request(server)
                .get('/depots/' + email)
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('depots');
                    result.body.depots.should.be.a('array');

                    done();

                });
        });

        it('should return an error since the user doesn\'t exists', function (done) {

            chai.request(server)
                .get('/depots/wrong@email.com')
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

    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {
        User.collection.remove({"email":email}, function(){
            done();
        });
    });
});
