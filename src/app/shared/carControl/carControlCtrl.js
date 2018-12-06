angular.module('app').controller('CarControlViewCtrl', CarControlViewCtrl);

CarControlViewCtrl.$inject = [
    '$rootScope',
    '$scope',
    'dataService'
];

function CarControlViewCtrl($rootScope,$scope,dataService) {
    var vm = this;

    vm.throttle = 0;
    vm.stop = stop;

    function stop(){
        console.log('car stopped');
    }

    $scope.$watch("carControlView.throttle",function(newThrottle,oldThrottle){
        if(newThrottle != oldThrottle){
            console.log(newThrottle);
        }
    })
   
}