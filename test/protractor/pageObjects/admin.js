'use strict';

var AdminPageOject = function() {

    var feedbackAlert = element(by.className('ui-notification clickable'));
    var feedbackMessage = feedbackAlert.element(by.className('message'));

    this.get = function() {
        browser.get('http://localhost:8080/#!/adminManagement');
    };

    this.getUrl = function() {
        return "http://localhost:8080/#!/adminManagement";
    };

    this.userClick = function(emailUser) {
        element.all(by.repeater("user in userList")).filter(function (elm) {
            return elm.evaluate("user.email").then(function (email) {
                return email === emailUser;
            });
        }).then(function (elms) {
            var button = elms[0].element(by.binding('currentEmail'));
            button.click();
        });
    };

    this.activeClick = function(emailUser) {
        element.all(by.repeater("user in userList")).filter(function (elm) {
            return elm.evaluate("user.email").then(function (email) {
                return email === emailUser;
            });
        }).then(function (elms) {
            var button = elms[0].element(by.buttonText('Activar'));
            button.click();
        });
    };

    this.editClick = function(emailUser) {
        element.all(by.repeater("user in userList")).filter(function (elm) {
            return elm.evaluate("user.email").then(function (email) {
                return email === emailUser;
            });
        }).then(function (elms) {
            var button = elms[0].element(by.buttonText('Editar'));
            button.click();
        });
    };

    this.saveClick = function(emailUser) {
        element.all(by.repeater("user in userList")).filter(function (elm) {
            return elm.evaluate("user.email").then(function (email) {
                return email === emailUser;
            });
        }).then(function (elms) {
            var button = elms[0].element(by.buttonText('Guardar'));
            button.click();
        });
    };

    this.getMessage = function() {
        var text = feedbackMessage.getText();
        feedbackAlert.click();
        return text;
    };
};

module.exports = AdminPageOject;
