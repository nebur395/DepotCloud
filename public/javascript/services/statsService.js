angular.module('depotCloudApp')

// 'statsService' service manage the stats functions of the page with the server
    .factory('statsService', function ($http, authService) {

        return {

            // GET request that get the totalUsers stats
            getTotalUsers: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/totalUsers',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.totalUsers);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            },

            // GET request that get the totalDepots stats
            getTotalDepots: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/totalDepots',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.totalDepots);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            },

            // GET request that get the totalDepotObjects stats
            getTotalDepotObjects: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/totalDepotObjects',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.totalDepotObjects);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            },

            // GET request that get the usersStatus stats
            getUsersStatus: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/usersStatus',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.activeUsers, successData.data.inactiveUsers);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            },

            // GET request that get the depotsPerUser stats
            getDepotsPerUser: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/depotsPerUser',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.depotsPerUser);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            },

            // GET request that get the depotObjectsPerUser stats
            getDepotObjectsPerUser: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/depotObjectsPerUser',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.depotObjectsPerUser);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            },

            // GET request that get the lastLogins stats
            getLastLogins: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/lastLogins',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.lastLogins);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            },

            // GET request that get the lastRegistrations stats
            getLastRegistrations: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/lastRegistrations',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.lastRegistrations);
                }, function (errorData) {
                    callbackError('&#10008',errorData.data.message);
                });
            }
        };
    });
