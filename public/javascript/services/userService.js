angular.module('depotCloudApp')

// 'userService' service manage the user functions of the page with the server
    .factory('userService', function ($http) {

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
                    callbackSuccess('&#10004',successData.data.message);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            }
        };
    });
