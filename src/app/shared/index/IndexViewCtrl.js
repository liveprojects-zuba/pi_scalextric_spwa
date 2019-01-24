angular.module('app').controller('IndexViewCtrl', IndexViewCtrl);

IndexViewCtrl.$inject = [
    '$rootScope',
    '$state',
    'dataService',
    'mqttService'
];

function IndexViewCtrl($rootScope, $state, dataService,mqttService) {
    var vm = this;

    //Initialises the range of channels that can be selected and the selected channel
    vm.channels = Array.apply(null, {
        length: $rootScope.defaultNumberChannels
    }).map(Function.call, Number);;
    vm.channel = 0;

  
    vm.go = go;

    /*
     Validates ip address and channel, if valid state changes to the Car Control state .
     If details are not valid alert is shown.
    */
    function go(valid) {
        if (!valid) {
            alert("Invalid Details")
        } else {
            mqttService.initialize('broker.hivemq.com','8000');
            mqttService.onConnectionLost(function () {
                console.error("connection lost");
            });
            
            mqttService.connect(function () {
                $state.transitionTo('carControl', 
                    {
                        channel: vm.channel,
                    });
            });
        }

    }
}