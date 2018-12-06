angular.module('app').controller('IndexViewCtrl', IndexViewCtrl);

IndexViewCtrl.$inject = [
    '$rootScope',
    '$state',
    'dataService'
];

function IndexViewCtrl($rootScope,$state,dataService) {
    var vm = this;

    vm.channels = Array.apply(null, { length: $rootScope.defaultNumberChannels }).map(Function.call, Number);;
    vm.channel = 0;
    vm.ip_address = $rootScope.defaultUrl;
    vm.go = go;

    function go(valid) {
        if (!valid) {
            alert("Invalid Details")
        } else {/* 
            dataService.validateDetails(vm.ip_address,vm.channel).then(function(result){
                if(result.status === 200){
                    
                }else{
                    alert("Invalid Details")
                }
            }).catch(function(error){
                console.log(error);
                alert("Invalid Details")
            }) */

            //NOT CHECKING DETAILS DEBUGGING ONLY
            $state.transitionTo('carControl',{channel : vm.channel, ip_address : vm.ip_address});
        }

    }
}