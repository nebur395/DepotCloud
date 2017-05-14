angular.module('depotCloudApp')

    .controller('userCardCtrl', ['$scope', 'notificationService', 'adminService',
        function ($scope, notificationService, adminService) {

            $scope.showCard = false;
            $scope.editing = false;
            $scope.currentEmail = $scope.user.email;
            $scope.isActive = $scope.user.isActive;

            $scope.modalButton = 0;
            $scope.modalSubmit = function () {
                switch ($scope.modalButton) {
                    case 0: // activate a user
                        adminService.activateUser($scope.currentEmail, function (message) {
                            $scope.user.isActive = true;
                            $scope.isActive = $scope.user.isActive;
                            notificationService.showSuccess('&#10004', message);
                        }, notificationService.showError);
                        break;
                    case 1:
                        $scope.editing = !$scope.editing;
                        break;
                    default: // save and modify a user
                        var user = {
                            name: $scope.user.name,
                            newEmail: $scope.user.email
                        };
                        adminService.editUser(user, $scope.currentEmail, function (message) {
                            $scope.currentEmail = $scope.user.email;
                            $scope.editing = !$scope.editing;
                            notificationService.showSuccess('&#10004', message);
                        }, notificationService.showError);
                }
            };

        }]);
