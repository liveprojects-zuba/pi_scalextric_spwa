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

    var channel = $stateParams.channel;
    var ip_address = $stateParams.ip_address;

    const DEFAULT_THROTTLE = 0;

    /* 
     throttle : is the throttle percentage the user is demanding.
     actualThrottle : is the throttle percentage the real world car is at.
    */
    vm.throttle = DEFAULT_THROTTLE;
    vm.actualThrottle = DEFAULT_THROTTLE;

    //Used to show error message when there is a server error.
    vm.throttleError = false;

    vm.stop = stop;

    /*
     Stops the car and returns user back to the index page, if there is 
     a server error an alert is shown first.
    */
    function stop() {
        dataService.stop(ip_address).then(function (result) {
            $state.transitionTo('index', {});
        }).catch(function (error) {
            alert("Server Error");
            $state.transitionTo('index', {});
        })
    }

    /*
     If user navigates to a different webpage stop the car.
     When this state is navigated to the onhashchange function 
     is called which is ignored. 
    */
    window.onhashchange = function () {
        if (changed) {
            console.log('changed');
            stop();
        } else {
            changed = true;
        }
    }

    /*
     When users changes car throttle a change request is sent to server.
     The server responds with the actual throttle.
     The actual throttle is used to update the UI.  
    */
    $scope.$watch("carControlView.throttle", function (newThrottle, oldThrottle) {
        if (newThrottle != oldThrottle) {
            dataService.setThrottle(ip_address, channel, newThrottle).then(function (result) {
                result = result.data;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].channel === channel) {
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