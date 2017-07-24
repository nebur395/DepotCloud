angular.module('depotCloudApp')

// 'userService' service manage the user functions of the page with the server
    .factory('userService', function ($http, authService) {

        return {

            // PUT request that edit the profile info of an account
            editProfile: function (email, userData, callbackSuccess, callbackError) {
                $http({
                    method: 'PUT',
                    url: 'users/' + email,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data: JSON.stringify(userData)
                }).then(function (successData) {
                    callbackSuccess('&#10004', successData.data.message);
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            },

            // DELETE request that delete the user account
            deleteAccount: function (email, password, callbackError) {
                var temp = {
                    current: password
                };
                $http({
                    method: 'DELETE',
                    url: 'users/' + email,
                    data: JSON.stringify(temp),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function () {
                    authService.logout();
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            }
        };
    });
