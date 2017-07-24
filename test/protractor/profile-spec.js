'use strict';

var server = require('../../server.js');
var User = server.models.User;

var LoginPageObject = require('./pageObjects/login');
var AdminPageObject = require('./pageObjects/admin');
var NavbarPageOject = require('./pageObjects/components/navbar');
var ProfilePageOject = require('./pageObjects/profile');

// login-spec.js
describe('Profile Page', function() {
    var loginPage,
        navbar,
        adminPage,
        profilePage;

    var name = "e2etest";
    var email = "e2etest@email.com";
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
        });
    });

    beforeEach(function() {
        loginPage = new LoginPageObject();
        navbar = new NavbarPageOject();
        adminPage = new AdminPageObject();
        profilePage = new ProfilePageOject();
    });

    it('should show an error with incorrect credentials', function() {
        loginPage.get();

        loginPage.setEmail(email);
        loginPage.setPassword(password);
        loginPage.loginClick();

        navbar.goProfile();

        profilePage.setCurrentPassword("wrongPass");
        profilePage.setNewPassword("newPass");
        profilePage.changePasswordClick();

        expect(profilePage.getMessage()).toContain("Email o contraseña actual incorrectos.");
        navbar.goLogout();
    });

    it('should show an error with incorrect password', function() {
        loginPage.get();

        loginPage.setEmail(email);
        loginPage.setPassword(password);
        loginPage.loginClick();

        navbar.goProfile();

        profilePage.setCurrentPassword(password);
        profilePage.setNewPassword("pass");
        profilePage.changePasswordClick();

        expect(profilePage.getMessage()).toContain("La contraseña nueva no tiene el tamaño adecuado.");
        navbar.goLogout();
    });

    it('should change the password', function() {
        loginPage.get();

        loginPage.setEmail(email);
        loginPage.setPassword(password);
        loginPage.loginClick();

        navbar.goProfile();

        profilePage.setCurrentPassword(password);
        profilePage.setNewPassword("passwordChanged");
        profilePage.changePasswordClick();

        expect(profilePage.getMessage()).toContain("Usuario actualizado correctamente.");

        navbar.goLogout();

        loginPage.setEmail(email);
        loginPage.setPassword(password);
        loginPage.loginClick();

        expect(loginPage.getMessage()).toContain("Email o contraseña incorrectos.");
    });

    it('should delete the account', function() {
        loginPage.get();

        loginPage.setEmail(email);
        loginPage.setPassword("passwordChanged");
        loginPage.loginClick();

        navbar.goProfile();

        profilePage.setCurrentPassword("passwordChanged");
        profilePage.deleteAccountClick();

        expect(browser.getCurrentUrl()).toBe(loginPage.getUrl());

        loginPage.setEmail(email);
        loginPage.setPassword("passwordChanged");
        loginPage.loginClick();

        expect(loginPage.getMessage()).toContain("La cuenta no está activa. Contacte con el administrador.");
    });

    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    afterAll(function(){
        User.collection.remove({"email": email});
    });
});
