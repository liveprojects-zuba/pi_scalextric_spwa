angular.module('app').controller('IndexViewCtrl', IndexViewCtrl);

IndexViewCtrl.$inject = [
    '$rootScope',
    'dataService'
];

function IndexViewCtrl($rootScope,dataService) {
    var vm = this;

    vm.channels = Array.apply(null, { length: $rootScope.numberChannels }).map(Function.call, Number);;
    vm.channel = 0;
    vm.ip_address = $rootScope.url;
    vm.go = go;

    function go(valid) {
        if (!valid) {
            alert("Invalid Details")
        } else {
            dataService.validateDetails(vm.ip_address,vm.channel).then(function(result){
                if(result.status === 200){
                    
                }else{
                    alert("Invalid Details")
                }
            }).catch(function(error){
                console.log(error);
                alert("Invalid Details")
            })
        }

    }
}