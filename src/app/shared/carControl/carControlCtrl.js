angular.module('app').controller('CarControlViewCtrl', CarControlViewCtrl);

CarControlViewCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$window',
    'dataService',
    'mqttService'
];

function CarControlViewCtrl($scope, $state, $stateParams, $window, dataService,mqttService) {
    var vm = this;

    var changed = false;

    var channel = $stateParams.channel;

    const DEFAULT_THROTTLE = 0;

    var throttleTopic = `testUUID/control/${channel}/throttle`;

    //subscribe to channel throttle
    mqttService.subscribe(throttleTopic);

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
     Stops the car and returns user back to the index page,
    */
    function stop() {
        mqttService.disconnect();
        $state.transitionTo('index', {});
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

    mqttService.onMessageArrived(function (message) {
        if(message.topic === throttleTopic){
            vm.actualThrottle = message.payloadString;
        }
        
    });

    /*
     When users changes car throttle a change request is sent to server. 
    */
    $scope.$watch("carControlView.throttle", function (newThrottle, oldThrottle) {
        if (newThrottle != oldThrottle) {
           mqttService.publish(throttleTopic,newThrottle.toString());
        }
    })

}