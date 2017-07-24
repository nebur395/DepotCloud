angular.module('depotCloudApp')

// 'adminService' service manage the admin functions of the page with the server
    .factory('adminService', function ($http) {

        return {

            // GET request that gets all the registered users in the system
            getUsers: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'users/',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.users);
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            },

            // PUT request that edit a user account info
            editUser: function (user, email, callbackSuccess, callbackError) {
                $http({
                    method: 'PUT',
                    url: 'admin/users/' + email,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data: JSON.stringify(user)
                }).then(function (successData) {
                    callbackSuccess(successData.data.message)
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            },

            // PUT request that activate a user account
            activateUser: function (email, callbackSuccess, callbackError) {
                $http({
                    method: 'PUT',
                    url: 'admin/users/' + email + '/active',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.message)
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            }
        };
    });
