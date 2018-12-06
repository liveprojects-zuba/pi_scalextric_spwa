angular.module('app').controller('CarControlViewCtrl', CarControlViewCtrl);

CarControlViewCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$stateParams',
    'dataService'
];

function CarControlViewCtrl($rootScope,$scope,$stateParams,dataService) {
    var vm = this;

    const DEFAULT_THROTTLE = 0;
    vm.channel;
    vm.ip_address;
    //throttle is the percentage the user is demanding
    vm.throttle = DEFAULT_THROTTLE;
    //actual throttle is the throttle the real world car is at
    vm.actualThrottle = DEFAULT_THROTTLE;
    vm.stop = stop;
    vm.throttleError = false;

    activate();

    function activate(){
        vm.channel = $stateParams.channel;
        vm.ip_address = $stateParams.ip_address;
    }

    function stop(){
        console.log('car stopped');
    }

    $scope.$watch("carControlView.throttle",function(newThrottle,oldThrottle){
        if(newThrottle != oldThrottle){
            
        }
    })
   
}