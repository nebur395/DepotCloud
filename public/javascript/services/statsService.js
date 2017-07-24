angular.module('depotCloudApp')

// 'statsService' service manage the stats functions of the page with the server
    .factory('statsService', function ($http) {

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
                    callbackError('&#10008', errorData.data.message);
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
                    callbackError('&#10008', errorData.data.message);
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
                    callbackError('&#10008', errorData.data.message);
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
                    callbackError('&#10008', errorData.data.message);
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
                    callbackError('&#10008', errorData.data.message);
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
                    callbackError('&#10008', errorData.data.message);
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
                    callbackError('&#10008', errorData.data.message);
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
                    callbackError('&#10008', errorData.data.message);
                });
            },

            // GET request that get the lastDeactivations stats
            getLastDeactivations: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/lastDeactivations',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.lastDeactivations);
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            },

            // GET request that get the creationDateDepots stats
            getCreationDateDepots: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/creationDateDepots',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.creationDateDepots);
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            },

            // GET request that get the creationDateDepotObjects stats
            getCreationDateDepotObjects: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/creationDateDepotObjects',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.creationDateDepotObjects);
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            },

            // GET request that get the depotTypes stats
            getDepotTypes: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/depotTypes',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.storageRooms, successData.data.houses,
                        successData.data.wardrobes);
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            },

            // GET request that get the depotDistances stats
            getDepotDistances: function (callbackSuccess, callbackError) {
                $http({
                    method: 'GET',
                    url: 'adminStats/depotDistances',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function (successData) {
                    callbackSuccess(successData.data.depotDistances);
                }, function (errorData) {
                    callbackError('&#10008', errorData.data.message);
                });
            }
        };
    });
