angular.module('depotCloudApp')

    .controller('adminManagementCtrl', ['$scope', 'notificationService', 'adminService',
        function ($scope, notificationService, adminService) {

        $scope.userList = [];

        $scope.isEmpty = function() {
            return $scope.userList.length === 0;
        };

        // get the user list
        adminService.getUsers(function (data) {
            $scope.userList = data;
        }, notificationService.showError);

    }]);
