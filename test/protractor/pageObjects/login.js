'use strict';

var LoginPageObject = function() {
    var emailInput = element(by.model('email'));
    var passwordInput = element(by.model('password'));
    var loginButton = element(by.buttonText('Iniciar sesión'));

    var feedbackMessage = element(by.className('message'));

    this.get = function() {
        browser.get('http://localhost:8080/#!/starter');
    };

    this.getUrl = function() {
        return "http://localhost:8080/#!/starter";
    };

    this.setEmail = function(email) {
        emailInput.sendKeys(email)
    };

    this.setPassword = function(password) {
        passwordInput.sendKeys(password)
    };

    this.loginClick = function() {
        loginButton.click()
    };

    this.getMessage = function() {
        return feedbackMessage.getText();
    };
};

module.exports = LoginPageObject;
