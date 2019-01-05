angular.module('app').controller('IndexViewCtrl', IndexViewCtrl);

IndexViewCtrl.$inject = [
    '$rootScope',
    '$state',
    'dataService',
    'piDetails'
];

function IndexViewCtrl($rootScope, $state, dataService,piDetails) {
    var vm = this;

    //Initialises the range of channels that can be selected and the selected channel
    vm.channels = Array.apply(null, {
        length: piDetails.CHANNELS
    }).map(Function.call, Number);;
    vm.channel = 0;

    //Current ip address
    vm.ip_address = piDetails.HOST;

    vm.go = go;

    /*
     Validates ip address and channel, if valid state changes to the Car Control state .
     If details are not valid alert is shown.
    */
    function go(valid) {
        if (!valid) {
            alert("Invalid Details")
        } else {
            dataService.validateDetails(vm.ip_address, vm.channel).then(function (result) {
                console.log(result.status);
                if (result.status === 200) {
                    $state.transitionTo('carControl', 
                    {
                        channel: vm.channel,
                        ip_address: vm.ip_address
                    });
                } else {
                    alert("Invalid Details")
                }
            }).catch(function (error) {
                console.log(error);
                alert("Invalid Details");
            })
        }

    }
}