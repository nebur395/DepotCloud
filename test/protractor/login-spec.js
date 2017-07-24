'use strict';

var server = require('../../server.js');
var User = server.models.User;

var LoginPageObject = require('./pageObjects/login');
var AdminPageObject = require('./pageObjects/admin');
var NavbarPageOject = require('./pageObjects/components/navbar');

// login-spec.js
describe('Login Page', function() {
    var loginPage,
        navbar,
        adminPage;

    var name = "e2etest";
    var email = "e2etest@email.com";
    var email2 = "e2etestInactive@email.com";
    var password = "testPass";

    beforeAll(function(){

        var hashPass = require('crypto')
            .createHash('sha1')
            .update(password)
            .digest('base64');

        User.create({

            email: email,
            name: name,
            password: hashPass,
            admin: true

        }, function () {

            User.create({

                email: email2,
                name: name,
                password: hashPass,
                admin: false,
                isActive: false

            });
        });
    });

    beforeEach(function() {
        loginPage = new LoginPageObject();
        navbar = new NavbarPageOject();
        adminPage = new AdminPageObject();
    });

    it('should show an error with incorrect credentials', function() {
        loginPage.get();

        loginPage.setEmail(email);
        loginPage.setPassword('wrongPass');
        loginPage.loginClick();

        expect(loginPage.getMessage()).toContain("Email o contraseña incorrectos.");
    });

    it('should show an error since user is not active', function() {
        loginPage.get();

        loginPage.setEmail(email2);
        loginPage.setPassword(password);
        loginPage.loginClick();

        expect(loginPage.getMessage()).toContain("La cuenta no está activa. Contacte con el administrador.");
    });

    it('should login', function() {
        loginPage.get();

        loginPage.setEmail(email);
        loginPage.setPassword(password);
        loginPage.loginClick();

        expect(browser.getCurrentUrl()).toBe(adminPage.getUrl());
    });

    it('should logout', function() {
        loginPage.get();

        navbar.goLogout();

        expect(browser.getCurrentUrl()).toBe(loginPage.getUrl());
    });

    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    afterAll(function(){
        User.collection.remove({"email": email}, function () {
            User.collection.remove({"email": email2});
        });
    });
});
