angular.module('depotCloudApp')

    .controller('adminStatsCtrl', ['$scope', function ($scope) {
        function updateStats(memuse) {
            document.getElementById('rss').innerHTML = memuse.totalUsers;
            document.getElementById('heapTotal').innerHTML = memuse.totalUsers;
            document.getElementById('heapUsed').innerHTML = memuse.totalUsers;
        }

        var host = window.document.location.host.replace(/:.*/, '');
        var ws = new WebSocket('ws://' + host + ':8080/websocketStats/totalUsers');
        ws.onmessage = function (event) {
            updateStats(JSON.parse(event.data));
        };
    }]);
