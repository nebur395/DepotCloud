angular.module('depotCloudApp', ['ui.router', 'base64', 'ui-notification', 'chart.js', 'angular-jwt'])

// Config UI-Notification angularjs module
    .config(function (NotificationProvider) {
        NotificationProvider.setOptions({
            positionX: 'center',
            //delay: null, // Uncomment for Protractor testing
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
                onEnter: function ($state, authService) {
                    if (authService.isAuthenticated() && authService.getAdmin()) {
                        $state.go('adminManagement');
                    }
                }
            })

            // profile screen
            .state('profile', {
                url: "/profile",
                templateUrl: "templates/profile.html",
                controller: "profileCtrl",
                onEnter: function ($state, authService, notificationService) {
                    if (!authService.isAuthenticated()) {
                        notificationService.showError("Error de autenticación", "Token inválido" +
                            " o no existente. Por favor, envíe un token correcto.");
                        $state.go('starter');
                    } else if (!authService.getAdmin()) {
                        notificationService.showError("Usuario no autorizado", "Por favor," +
                            " introduzca las credenciales de un usuario administrador.", null);
                        authService.logout();
                    }
                }
            })

            // admin management screen
            .state('adminManagement', {
                url: "/adminManagement",
                templateUrl: "templates/adminManagement.html",
                controller: "adminManagementCtrl",
                onEnter: function ($state, authService, notificationService) {
                    if (!authService.isAuthenticated()) {
                        notificationService.showError("Error de autenticación", "Token inválido" +
                            " o no existente. Por favor, envíe un token correcto.");
                        $state.go('starter');
                    } else if (!authService.getAdmin()) {
                        notificationService.showError("Usuario no autorizado", "Por favor," +
                            " introduzca las credenciales de un usuario administrador.", null);
                        authService.logout();
                    }
                }
            })

            // admin stats screen
            .state('adminStats', {
                url: "/adminStats",
                templateUrl: "templates/adminStats.html",
                controller: "adminStatsCtrl",
                onEnter: function ($state, authService, notificationService) {
                    if (!authService.isAuthenticated()) {
                        notificationService.showError("Error de autenticación", "Token inválido" +
                            " o no existente. Por favor, envíe un token correcto.");
                        $state.go('starter');
                    } else if (!authService.getAdmin()) {
                        notificationService.showError("Usuario no autorizado", "Por favor," +
                            " introduzca las credenciales de un usuario administrador.", null);
                        authService.logout();
                    }
                }
            });

        $urlRouterProvider.otherwise('starter');
    })

    .config(['$httpProvider', function ($httpProvider) {
        /**
         *  HTTP Interceptor.
         *  Authorization JWT is sent in every request if exist.
         *  LogOut function is execute in every response if http 401.
         */
        $httpProvider.interceptors.push(['$q', '$injector', function ($q, $injector) {
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

                    if (response.status === 401 || response.status === 403) {
                        var authService = $injector.get('authService');

                        if (authService.getToken() && authService.isTokenExpired()) {
                            authService.logout();
                        }
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]);
