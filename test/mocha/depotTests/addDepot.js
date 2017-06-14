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
            done();
        });


    });

    /**
     * Tests for addDepot functionality.
     */
    describe("#addDepot()", function () {

        it('should successfully add a depot', function (done) {

            chai.request(server)
                .post('/depots/' + email)
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
                    result.body.should.have.property('depot');
                    result.body.depot.should.be.a('object');
                    result.body.depot.should.have.property('_id');
                    result.body.depot.should.have.property('name');
                    result.body.depot.should.have.property('owner');
                    result.body.depot.should.have.property('location');
                    result.body.depot.should.have.property('type');
                    result.body.depot.should.have.property('distance');
                    result.body.depot.should.have.property('description');

                    depotsId.push(new ObjectId(result.body.depot._id));
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
                done();
            })
        });
    });
});
