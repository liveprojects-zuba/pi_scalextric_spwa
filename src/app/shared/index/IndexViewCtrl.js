angular.module('app').controller('IndexViewCtrl', IndexViewCtrl);

IndexViewCtrl.$inject = [
    '$rootScope',
    '$state',
    'dataService',
    'mqttService',
    'brokerDetails'
];

function IndexViewCtrl($rootScope, $state, dataService,mqttService,brokerDetails) {
    var vm = this;

    //Initialises the range of channels that can be selected and the selected channel
    vm.channels = Array.apply(null, {
        length: $rootScope.defaultNumberChannels
    }).map(Function.call, Number);;
    vm.channel = 0;


    console.log(brokerDetails);

    vm.go = go;

    /*
     Validates ip address and channel, if valid state changes to the Car Control state .
     If details are not valid alert is shown.
    */
    function go(valid) {
        if (!valid) {
            alert("Invalid Details")
        } else {
            mqttService.initialize(brokerDetails.HOST,brokerDetails.PORT);
            mqttService.onConnectionLost(function () {
                console.error("connection lost");
            });
            
            mqttService.connect(brokerDetails.USERNAME,brokerDetails.PASSWORD,true,function () {
                $state.transitionTo('carControl', 
                    {
                        channel: vm.channel,
                    });
            });
        }

    }
}