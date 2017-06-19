var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var crypto = require("crypto");
var base64 = require('base-64');
var User = server.models.User;
var Activity = server.models.Activity;
var createUserToken = require('../jwtCreator').createUserToken;

chai.use(chaiHttp);

/**
 * Test suite for Activity functionalities.
 */
describe('Activity', function () {

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
            Activity.create({

                owner: email,
                type : "MEMBER",
                action: "ADD",
                name: "Pepe",
                author: ""

            }, function () {
                done();
            });
        });


    });

    /**
     * Tests for getActivities functionality.
     */
    describe("#getActivities()", function () {

        it('should successfully get a list of activities', function (done) {

            chai.request(server)
                .get('/activities/' + email)
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('activities');
                    result.body.activities.should.be.a('array');

                    done();

                });
        });

        it('should return an error since the user doesn\'t exists', function (done) {

            chai.request(server)
                .get('/activities/wrong@email.com')
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
