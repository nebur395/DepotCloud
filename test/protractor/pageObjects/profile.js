'use strict';

var ProfilePageOject = function() {
    var currentPasswordInput = element(by.model('current'));
    var newPasswordInput = element(by.model('new'));
    var changePasswordButton = element(by.buttonText('Guardar cambios'));
    var deleteAccountButton = element(by.buttonText('Borrar cuenta'));

    var feedbackMessage = element(by.className('message'));

    this.get = function() {
        browser.get('http://localhost:8080/#!/profile');
    };

    this.getUrl = function() {
        return "http://localhost:8080/#!/profile";
    };

    this.setCurrentPassword = function(password) {
        currentPasswordInput.sendKeys(password)
    };

    this.setNewPassword = function(password) {
        newPasswordInput.sendKeys(password)
    };

    this.changePasswordClick = function() {
        changePasswordButton.click()
    };

    this.deleteAccountClick = function() {
        deleteAccountButton.click()
    };

    this.getMessage = function() {
        return feedbackMessage.getText();
    };
};

module.exports = ProfilePageOject;
