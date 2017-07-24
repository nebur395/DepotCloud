'use strict';

var NavbarPageOject = function() {
    var profile = element(by.linkText('Cuenta'));
    var logout = element(by.linkText('Salir'));
    var home = element(by.linkText("Depot Cloud"));
    var stats = element(by.linkText('Estadísticas del sistema'));
    var userManagement = element(by.linkText('Gestión de usuarios'));

    this.goProfile = function() {
        profile.click();
    };
    this.goLogout = function() {
        logout.click();
    };
    this.goHome = function() {
        home.click();
    };
    this.goStats = function() {
        stats.click();
    };
    this.goUserManagement = function() {
        userManagement.click();
    };
};

module.exports = NavbarPageOject;
