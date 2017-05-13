angular.module('depotCloudApp')

    .controller('profileCtrl', ['$scope', 'authService', 'notificationService', 'userService',
        function ($scope, authService, notificationService, userService) {

        // Inputs visual variables
        $scope.email = authService.getEmail();
        $scope.name = authService.getUsername();
        $scope.current = "";
        $scope.new = "";
        $scope.delete = false;

        /*
         * Submit function
         * If $scope.delete = false, it makes a DELETE request. If  $scope.delete = true, it
         * makes a PUT request
         */
        $scope.settings = function () {
            if ($scope.delete) {
                userService.deleteAccount($scope.email, $scope.current, notificationService.showError);
            } else {
                var requestObject = {
                    name: $scope.name,
                    current: $scope.current,
                    new: $scope.new
                };
                userService.editProfile($scope.email, requestObject,
                    notificationService.showSuccess, notificationService.showError);
            }
        }

    }]);
