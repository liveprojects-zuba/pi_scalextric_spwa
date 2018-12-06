angular.module('app').controller('CarControlViewCtrl', CarControlViewCtrl);

CarControlViewCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'dataService'
];

function CarControlViewCtrl($scope,$state,$stateParams,dataService) {
    var vm = this;

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

    function activate(){
        console.log($stateParams);
        if($stateParams.channel === null || $stateParams.ip_address.length === null){
            $state.transitionTo('index',{});
        }
        channel = $stateParams.channel;
        address = $stateParams.ip_address;
    }

    function stop(){
        console.log('car stopped');
    }

    $scope.$watch("carControlView.throttle",function(newThrottle,oldThrottle){
        if(newThrottle != oldThrottle){
            dataService.setThrottle(ip_address,channel,newThrottle).then(function(result){
                //vm.actualThrottle = result.throttle;
            }).catch(function(error){
                console.log(error);
                vm.throttleError = true;
            })
        }
    })
   
}