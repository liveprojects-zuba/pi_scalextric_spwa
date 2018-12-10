angular.module('app').controller('CarControlViewCtrl', CarControlViewCtrl);

CarControlViewCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$window',
    'dataService'
];

function CarControlViewCtrl($scope, $state, $stateParams, $window, dataService) {
    var vm = this;
    var changed = false;
    const DEFAULT_THROTTLE = 0;
    var channel;
    var ip_address;
    //throttle is the percentage the user is demanding
    vm.throttle = DEFAULT_THROTTLE;
    //actual throttle is the throttle the real world car is at
    vm.actualThrottle = DEFAULT_THROTTLE;
    vm.stop = stop;
    vm.throttleError = false;

    activate();

    function activate() {
        console.log($stateParams);
        if ($stateParams.channel === null || $stateParams.ip_address.length === null) {
            $state.transitionTo('index', {});
        }
        channel = $stateParams.channel;
        address = $stateParams.ip_address;
    }

    function stop() {
        dataService.stop(ip_address).then(function (result) {
            $state.transitionTo('index', {});
        }).catch(function (error) {
            alert("Server Error");
            $state.transitionTo('index', {});
        })
    }

    window.onhashchange = function () {
        if (changed) {
            console.log('changed');
            stop();
        } else {
            changed = true;
        }
    }

    $scope.$watch("carControlView.throttle", function (newThrottle, oldThrottle) {
        if (newThrottle != oldThrottle) {
            dataService.setThrottle(ip_address, channel, newThrottle).then(function (result) {

                result = result.data;
                for (var i = 0; i < result.length; i++) {

                    if (result[i].channel === channel) {
                        console.log('found channel');
                        vm.actualThrottle = result[i].percent;
                        break;
                    }
                }
            }).catch(function (error) {
                console.log(error);
                vm.throttleError = true;
            })
        }
    })

}