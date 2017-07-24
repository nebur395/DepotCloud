'use strict';

var createUser = require('../common/userCreator').createUser;
var createInactiveUser = require('../common/userCreator').createInactiveUser;
var deleteUser = require('../common/userCreator').deleteUser;

var LoginPageObject = require('./pageObjects/login');
var AdminPageObject = require('./pageObjects/admin');
var NavbarPageOject = require('./pageObjects/components/navbar');

// admin-spec.js
describe('Admin Page', function() {
    var loginPage,
        navbar,
        adminPage;

    var name = "e2etestADMIN";
    var email = "e2etestADMIN@email.com";
    var email2 = "e2etest@email.com";
    var password = "testPass";

    beforeAll(function(){

        createUser(name, true, email, password, [], function () {

            createInactiveUser(name, false, email2, password, [], function () {});
        });
    });

    beforeEach(function() {
        loginPage = new LoginPageObject();
        navbar = new NavbarPageOject();
        adminPage = new AdminPageObject();
    });

    it('should active a user', function() {
        loginPage.get();

        loginPage.setEmail(email);
        loginPage.setPassword(password);
        loginPage.loginClick();

        navbar.goUserManagement();
        expect(browser.getCurrentUrl()).toBe(adminPage.getUrl());

        adminPage.userClick(email2);
        browser.sleep(500);
        adminPage.activeClick(email2);

        expect(adminPage.getMessage()).toContain("Cuenta de usuario reactivada correctamente.");
        navbar.goLogout();
    });

    it('should edit a user', function() {
        loginPage.get();

        loginPage.setEmail(email);
        loginPage.setPassword(password);
        loginPage.loginClick();

        navbar.goUserManagement();
        expect(browser.getCurrentUrl()).toBe(adminPage.getUrl());

        adminPage.userClick(email2);
        browser.sleep(500);
        adminPage.editClick(email2);
        adminPage.saveClick(email2);

        expect(adminPage.getMessage()).toContain("Usuario actualizado correctamente.");
        navbar.goLogout();
    });

    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    afterAll(function(){
        deleteUser(email2, function () {
            deleteUser(email, function () {});
        });
    });

});
