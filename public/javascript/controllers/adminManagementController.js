angular.module('depotCloudApp')

    .controller('adminManagementCtrl', ['$scope', 'notificationService', function ($scope, notificationService) {

        $scope.userList = [];

        $scope.isEmpty = function() {
            return $scope.userList.length == 0;
        };

        // get the user list
        userManagement.getUsers(function (data) {
            $scope.userList = data;
        }, notificationService.showError);

    }]);
