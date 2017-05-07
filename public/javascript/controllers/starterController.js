angular.module('pirineoPOIApp')

    .controller('starterCtrl', ['$scope', 'authService', 'notificationService',
        function ($scope, authService, notificationService) {

            // inputs visual variables
            $scope.name = "";
            $scope.email = "";
            $scope.password = "";

            // send the login form to the auth service
            $scope.login = function () {
                // Standard 'authorization basic'
                authService.login($scope.email, $scope.password, function (data) {
                    notificationService.showError("",data);
                });
            };
        }]);
