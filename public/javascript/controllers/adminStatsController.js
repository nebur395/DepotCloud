angular.module('depotCloudApp')

    .controller('adminStatsCtrl', ['$scope', 'notificationService', 'statsService',
        function ($scope, notificationService, statsService) {

            $scope.optionsPieStat = {
                legend: {display: true},
                responsive: true,
                maintainAspectRatio: false
            };

            $scope.optionsRadarStat = {
                legend: {display: true},
                responsive: true, maintainAspectRatio: false,
                scale: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            };

            $scope.optionsLineStat = {
                legend: {display: true},
                scales: {
                    yAxes: [{
                        id: 'y-axis-1',
                        type: 'linear',
                        position: 'left',
                        ticks: {min: 0}
                    }]
                }
            };

            // SECTION: Total User Stat, Total Depots Stat, Total DepotObjects Stat
            $scope.labels1Stat = ["Usuarios totales en el sistema", "Almacenes totales en el" +
            " sistema ", "Objetos totales en el sistema"];
            $scope.data1Stat = [0, 0, 0];

            statsService.getTotalUsers(function (users) {
                $scope.data1Stat[0] = users;
            }, notificationService.showError);

            statsService.getTotalDepots(function (depots) {
                $scope.data1Stat[1] = depots;
            }, notificationService.showError);

            statsService.getTotalDepotObjects(function (depotObjects) {
                $scope.data1Stat[2] = depotObjects;
            }, notificationService.showError);


            // SECTION: Users Status Stat
            $scope.labels2Stat = ["Usuarios activos en el sistema", "Usuarios inactivos en el" +
            " sistema"];
            $scope.data2Stat = [0, 0];

            statsService.getUsersStatus(function (actives, inactives) {
                $scope.data2Stat[0] = actives;
                $scope.data2Stat[1] = inactives;
            }, notificationService.showError);


            // SECTION: Depots Per User Stat, DepotObjects Per User Stat
            $scope.labels3Stat = ["Número medio de almacenes por usuario", "Número medio de" +
            " objetos por usuario"];
            $scope.data3Stat = [0, 0];

            statsService.getDepotsPerUser(function (depots) {
                $scope.data3Stat[0] = depots;
            }, notificationService.showError);

            statsService.getDepotObjectsPerUser(function (depotObjects) {
                $scope.data3Stat[1] = depotObjects;
            }, notificationService.showError);

            // SECTION: lastLogins
            $scope.labels4Stat = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            $scope.data4Stat = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            $scope.series4Stat = ["Número de los últimos inicios de sesión registrados durante el" +
            " último año"];

            statsService.getLastLogins(function (lastLogins) {
                $scope.data4Stat[0] = lastLogins;
            }, notificationService.showError);

            // SECTION: lastRegistrations
            $scope.labels5Stat = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            $scope.data5Stat = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            $scope.series5Stat = ["Número de creaciones de usuarios durante el último año"];

            statsService.getLastRegistrations(function (lastRegistrations) {
                $scope.data5Stat[0] = lastRegistrations;
            }, notificationService.showError);

            // SECTION: lastDeactivations
            $scope.labels6Stat = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            $scope.data6Stat = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            $scope.series6Stat = ["Número de cuentas de usuarios dadas de baja durante el último" +
            " año"];

            statsService.getLastDeactivations(function (lastDeactivations) {
                $scope.data6Stat[0] = lastDeactivations;
            }, notificationService.showError);

            // SECTION: creationDateDepots
            $scope.labels7Stat = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            $scope.data7Stat = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            $scope.series7Stat = ["Número de creaciones de almacenes durante el último año"];

            statsService.getCreationDateDepots(function (creationDateDepots) {
                $scope.data7Stat[0] = creationDateDepots;
            }, notificationService.showError);

            // SECTION: creationDateDepotObjects
            $scope.labels8Stat = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            $scope.data8Stat = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            $scope.series8Stat = ["Número de creaciones de objetos durante el último año"];

            statsService.getCreationDateDepotObjects(function (creationDateDepotObjects) {
                $scope.data8Stat[0] = creationDateDepotObjects;
            }, notificationService.showError);

            // SECTION: depotTypes
            $scope.labels9Stat = ['Trasteros', 'Casas', 'Armarios'];
            $scope.data9Stat = [[0, 0, 0]];
            $scope.series9Stat = ["Tipo de almacenes existentes en el sistema"];

            statsService.getDepotTypes(function (storageRooms, houses, wardrobes) {
                $scope.data9Stat[0][0] = storageRooms;
                $scope.data9Stat[0][1] = houses;
                $scope.data9Stat[0][2] = wardrobes;
            }, notificationService.showError);

            // SECTION: depotDistances
            $scope.labels10Stat = ["[0-1km]", "[1km-2km]", "[2km-10km]", "[10km-100km]",
                "[100km-300km]", "[300km, +]"];
            $scope.data10Stat = [[0, 0, 0, 0, 0, 0]];
            $scope.series10Stat = ["Distancia de los almacenes existentes en el sistema"];

            statsService.getDepotDistances(function (distances) {
                $scope.data10Stat[0] = distances;
            }, notificationService.showError);

        }]);
