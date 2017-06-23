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
            $scope.labels4Stat = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto',
                'Septiembre','Octubre','Noviembre','Diciembre'];
            $scope.data4Stat = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            $scope.series4Stat = ["Número de los últimos inicios de sesión registrados durante el" +
            " último año"];

            statsService.getLastLogins(function (lastLogins) {
                $scope.data4Stat[0] = lastLogins;
            }, notificationService.showError);

            // SECTION: lastRegistrations
            $scope.labels5Stat = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto',
                'Septiembre','Octubre','Noviembre','Diciembre'];
            $scope.data5Stat = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            $scope.series5Stat = ["Número de creaciones de usuarios durante el último año"];

            statsService.getLastRegistrations(function (lastRegistrations) {
                $scope.data5Stat[0] = lastRegistrations;
            }, notificationService.showError);

            // SECTION: lastRegistrations
            $scope.labels6Stat = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto',
                'Septiembre','Octubre','Noviembre','Diciembre'];
            $scope.data6Stat = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            $scope.series6Stat = ["Número de creaciones de almacenes durante el último año"];

            statsService.getCreationDateDepots(function (creationDateDepots) {
                $scope.data6Stat[0] = creationDateDepots;
            }, notificationService.showError);

        }]);
