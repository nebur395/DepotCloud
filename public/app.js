angular.module('depotCloudApp', ['ui.router', 'base64', 'ui-notification', 'chart.js', 'angular-jwt'])

    // Config UI-Notification angularjs module
    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            positionX: 'center',
            maxCount: 4
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            // starter screen
            .state('starter', {
                url: "/starter",
                templateUrl: "templates/starter.html",
                controller: "starterCtrl",
                onEnter: function($state, authService){
                    if (authService.isAuthenticated()) {
                        $state.go('adminManagement');
                    }
                }
            })

            // profile screen
            .state('profile', {
                url: "/profile",
                templateUrl: "templates/profile.html",
                controller: "profileCtrl",
                onEnter: function($state, authService){
                    if (!authService.isAuthenticated()) {
                        $state.go('starter');
                    }
                }
            })

            // admin management screen
            .state('adminManagement', {
                url: "/adminManagement",
                templateUrl: "templates/adminManagement.html",
                controller: "adminManagementCtrl",
                onEnter: function($state, authService){
                    if (!authService.isAuthenticated()) {
                        $state.go('starter');
                    }
                }
            })

            // admin stats screen
            .state('adminStats', {
                url: "/adminStats",
                templateUrl: "templates/adminStats.html",
                controller: "adminStatsCtrl",
                onEnter: function($state, authService){
                    if (!authService.isAuthenticated()) {
                        $state.go('starter');
                    }
                }
            });

        $urlRouterProvider.otherwise('starter');
    })

    .config(['$httpProvider',function ($httpProvider) {
        /**
         *  HTTP Interceptor.
         *  Authorization JWT is sent in every request if exist.
         *  LogOut function is execute in every response if http 401.
         */
        $httpProvider.interceptors.push(['$q','$injector', function ($q, $injector) {
            return {
                'request': function (config) {
                    var authService = $injector.get('authService');
                    config.headers = config.headers || {};
                    if (authService.getToken()) {
                        config.headers.Authorization = 'Bearer ' + authService.getToken();
                    }
                    return config;
                },
                'responseError': function (response) {

                    if (response.status === 401) {
                        var authService = $injector.get('authService');

                        if(authService.getToken() && authService.isTokenExpired()){
                            authService.logout();
                        }
                    } else if (response.status === 403) {
                        var authService = $injector.get('authService');

                        if(authService.getToken() && authService.isTokenExpired()){
                            authService.logout();
                        }
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]);
