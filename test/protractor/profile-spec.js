'use strict';

var createUser = require('../common/userCreator').createUser;
var deleteUser = require('../common/userCreator').deleteUser;

var LoginPageObject = require('./pageObjects/login');
var ProfilePageOject = require('./pageObjects/profile');
var NavbarPageOject = require('./pageObjects/components/navbar');

// login-spec.js
describe('Profile Page', function() {
    var loginPage,
        profilePage,
        navbar;

    var name = "e2etest";
    var email = "e2etest@email.com";
    var password = "testPass";

    beforeAll(function(){

        createUser(name, true, email, password, [], function () {});
    });

    beforeEach(function() {
        loginPage = new LoginPageObject();
        profilePage = new ProfilePageOject();
        navbar = new NavbarPageOject();
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
        deleteUser(email, function () {});
    });
});
