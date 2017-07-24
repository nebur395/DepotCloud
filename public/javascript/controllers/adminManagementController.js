angular.module('depotCloudApp')

    .controller('adminManagementCtrl', ['$scope', 'notificationService', 'adminService',
        function ($scope, notificationService, adminService) {

            $scope.userList = [];

            // Returns true if userList is empty
            $scope.isEmpty = function () {
                return $scope.userList.length === 0;
            };

            // Get the user list
            adminService.getUsers(function (data) {
                $scope.userList = data;
            }, notificationService.showError);

        }]);
