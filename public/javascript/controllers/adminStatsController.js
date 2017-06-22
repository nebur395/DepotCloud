angular.module('depotCloudApp')

    .controller('adminStatsCtrl', ['$scope', 'notificationService', 'statsService',
        function ($scope, notificationService, statsService) {

            $scope.optionsPieStat = {
                legend: {display: true},
                responsive: true,
                maintainAspectRatio: false
            };

            $scope.optionsRadarStat = {
                responsive: true, maintainAspectRatio: false,
                scale: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            };

            $scope.optionsLineStat = {
                scales: {
                    yAxes: [{
                        id: 'y-axis-1',
                        type: 'linear',
                        position: 'left',
                        ticks: {min: 0, max:100}
                    }]
                }
            };


            // SECTION: Total User Stat, Total Depots Stat, Total DepotObjects Stat
            $scope.labels1Stat = ["Usuarios", "Almacenes", "Objetos"];
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
            $scope.labels2Stat = ["Usuarios activos", "Usuarios inactivos"];
            $scope.data2Stat = [0, 0];

            statsService.getUsersStatus(function (actives, inactives) {
                $scope.data2Stat[0] = actives;
                $scope.data2Stat[1] = inactives;
            }, notificationService.showError);
        }]);
