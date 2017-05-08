var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../server');
var User = server.models.User;
var config = require("../../../config");
var jwt = require('jsonwebtoken');

chai.use(chaiHttp);

/**
 * Test suite for Session functionalities.
 */
describe('Session', function(){

    var name = "Testing";
    var email = "testUser@email.com";
    var password = "testPass";
    var hashPass = require('crypto')
        .createHash('sha1')
        .update(password)
        .digest('base64');
    var emailInactive = 'testInactive@email.com';

    /**
     * Tests for signUp functionality.
     */
    describe('#signUp()', function(){

        var singUpSuccessMessage = "Usuario creado correctamente.";
        var signUpErrorAlreadyExistMessage = "Ya existe una cuenta con ese correo.";
        var signUpBlankFieldMessage = "Nombre, contraseña o email incorrectos.";
        var signUpWrongPasswordsMessage = "Las contraseñas no coinciden.";
        var signUpInvalidPasswordsMessage = "La contraseña no tiene el tamaño adecuado.";

        it('should sign up a new user', function(done) {

            chai.request(server)
                .post('/users/')
                .send({name: name, password: password, rePassword: password, email:email})
                .end(function(err, result){

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(true);
                    result.body.should.have.property('message');
                    result.body.message.should.equal(singUpSuccessMessage);

                    done();

                });
        });

        it('should return an error message since the user already exists', function(done){

            chai.request(server)
                .post('/users/')
                .send({name: name, password: password, rePassword: password, email:email})
                .end(function(err, result){

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal(signUpErrorAlreadyExistMessage);

                    done();
                });
        });

        it('should return an error message since name is blank', function(done){

            chai.request(server)
                .post('/users/')
                .send({name: "", password: password, rePassword: password, email:email})
                .end(function(err, result){

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal(signUpBlankFieldMessage);

                    done();
                });
        });

        it('should return an error message password is blank', function(done){

            chai.request(server)
                .post('/users/')
                .send({name: "", password: "", rePassword: password, email:email})
                .end(function(err, result){

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal(signUpBlankFieldMessage);

                    done();
                });
        });

        it('should return an error message rePassword is blank', function(done){

            chai.request(server)
                .post('/users/')
                .send({name: "", password: password, rePassword: "", email:email})
                .end(function(err, result){

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal(signUpBlankFieldMessage);

                    done();
                });
        });

        it('should return an error message password doesn\'t match', function(done){

            chai.request(server)
                .post('/users/')
                .send({name: name, password: password, rePassword: "wrongPass", email:email})
                .end(function(err, result){

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal(signUpWrongPasswordsMessage);

                    done();
                });
        });

        it('should return an error message since password isn\'t of adequate length', function(done){

            chai.request(server)
                .post('/users/')
                .send({name: name, password: "pass", rePassword: "pass", email:email})
                .end(function(err, result){

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal(signUpInvalidPasswordsMessage);

                    done();
                });
        });

        it('should return an error message since email is blank', function(done){

            chai.request(server)
                .post('/users/')
                .send({name: "", password: password, rePassword: password, email:""})
                .end(function(err, result){

                    result.should.have.status(404);
                    result.body.should.be.a('object');
                    result.body.should.have.property('success');
                    result.body.success.should.equal(false);
                    result.body.should.have.property('message');
                    result.body.message.should.equal(signUpBlankFieldMessage);

                    done();
                });
        });

        /*
         * Removes the user created during the signIn tests.
         */
        after(function(done){
            User.collection.remove({"email":email});
            done();
        });

    });
});
