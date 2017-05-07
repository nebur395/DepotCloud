angular.module('depotCloudApp')

    .controller('navbarCtrl', ['$scope', 'auth', function ($scope, auth) {

        $scope.home = "";
        $scope.logged = false;

        // Watches to control if the user is authenticated
        $scope.$watch(function() {
            return auth.isAuthenticated();
        }, function () {
            $scope.logged = auth.isAuthenticated();
            $scope.home = $scope.logged ? "adminManagement" : "starter";
        });

        $scope.logout = function () {
            auth.logout();
        }
    }]);
