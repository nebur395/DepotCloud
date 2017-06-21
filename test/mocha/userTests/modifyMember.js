var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var createUserToken = require('../jwtCreator').createUserToken;
var createUser = require('../userCreator').createUser;
var deleteUser = require('../userCreator').deleteUser;

chai.use(chaiHttp);

/**
 * Test suite for Member functionalities.
 */
describe('Member', function () {

    var name = "testUser";
    var email = "testUser@email.com";
    var password = "testPass";

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        createUser(name, false, email, password, ["Pepe"], done);

    });

    /**
     * Tests for modifyMember functionality.
     */
    describe("#modifyMember()", function () {

        it('should successfully modify a member', function (done) {

            chai.request(server)
                .put('/members/' + email + '/Pepe')
                .send({newName: name})
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(true);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('Miembro de la unidad familiar modificado correctamente.');

                    done();

                });
        });

        it('should return an error since the user doesn\'t exists', function (done) {

            chai.request(server)
                .put('/members/wrong@email.com/Pepe')
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

        it('should return an error since the member doesn\'t exists', function (done) {

            chai.request(server)
                .put('/members/' + email + '/wrongMember')
                .set('Authorization','Bearer ' + createUserToken(name, false))
                .end(function (err, result) {

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal('El miembro de la unidad familiar que se desea modificar no existe.');

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
