angular.module('app').controller('CarControlViewCtrl', CarControlViewCtrl);

CarControlViewCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'mqttService',
    'brokerDetails'
];

function CarControlViewCtrl($scope, $state, $stateParams, mqttService, brokerDetails) {
    var vm = this;

    var changed = false;

    var channel = $stateParams.channel;

    const DEFAULT_THROTTLE = 0;

    var throttleTopic = `${brokerDetails.UUID}/control/${channel}/throttle`;
    var getResourcesTopic = `${brokerDetails.UUID}/resources`;

    //subscribe to channel throttle
    mqttService.subscribe(throttleTopic);

    // subscribe to channel resources
    mqttService.subscribe(getResourcesTopic);

    /* 
     throttle : is the throttle percentage the user is demanding.
     actualThrottle : is the throttle percentage the real world car is at.
    */
    vm.throttle = DEFAULT_THROTTLE;
    vm.actualThrottle = DEFAULT_THROTTLE;
    vm.resources;

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
        Special weapons messages that could be received :

        {
            state: "busy"
        }

        or

        {
            state: "ready"
        }

        Special weapons payload format for firing :

        {
            state: "requested",
            target: [CHANNEL_ID]
        }

    */

    function fireSpecialWeapon(resourceId) {
        let payload = {
            state: "requested",
            target: 1
        };
        mqttService.publish(`${brokerDetails.UUID}/control/0/${resourceId}/state`, JSON.stringify(payload));
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

        console.log(message);

        //check the correct topic
        if (message.topic === throttleTopic) {
            var throttle  = JSON.parse(message.payloadString);

            //filter out any set throttle messages
            if(throttle.hasOwnProperty("throttle")){
                vm.actualThrottle = throttle.throttle;
            }
        } else if (message.topic === getResourcesTopic) {
            console.log(message);
            vm.resources = JSON.parse(message.payloadString);
            console.log(vm.resources);
        }
    });

    /*
     When users changes car throttle a change request is sent to server. 
    */
    $scope.$watch("carControlView.throttle", function (newThrottle, oldThrottle) {
        if (newThrottle != oldThrottle) {
            var payload = {
                set : newThrottle
            }
            mqttService.publish(throttleTopic, JSON.stringify(payload));
        }
    })

}