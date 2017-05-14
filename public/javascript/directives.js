angular.module('depotCloudApp')

// include the 'navbar.html' into the <navbar> tag
    .directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/components/navbar.html',
            controller: 'navbarCtrl',
            scope: {}
        }
    })

    // include the 'userCard.html' into the <user> tag
    .directive('user', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/components/userCard.html',
            controller: 'userCardCtrl',
            scope: true
        }
    });

