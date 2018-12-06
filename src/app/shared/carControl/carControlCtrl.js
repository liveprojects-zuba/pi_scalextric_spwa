angular.module('app').controller('CarControlViewCtrl', CarControlViewCtrl);

CarControlViewCtrl.$inject = [
    '$rootScope',
    '$scope',
    'dataService'
];

function CarControlViewCtrl($rootScope,$scope,dataService) {
    var vm = this;

    const DEFAULT_THROTTLE = 0;

    //throttle is the percentage the user is demanding
    vm.throttle = DEFAULT_THROTTLE;
    //actual throttle is the throttle the real world car is at
    vm.actualThrottle = DEFAULT_THROTTLE;
    vm.stop = stop;
    vm.throttleError = false;

    function stop(){
        console.log('car stopped');
    }

    $scope.$watch("carControlView.throttle",function(newThrottle,oldThrottle){
        if(newThrottle != oldThrottle){
            console.log(newThrottle);
        }
    })
   
}