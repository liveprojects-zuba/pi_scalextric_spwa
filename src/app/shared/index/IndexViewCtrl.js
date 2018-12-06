angular.module('app').controller('IndexViewCtrl', IndexViewCtrl);

IndexViewCtrl.$inject = [
    '$rootScope'
];

function IndexViewCtrl($rootScope) {
    var vm = this;

    vm.channels = Array.apply(null, { length: $rootScope.numberChannels }).map(Function.call, Number);;
    vm.channel = 0;
    vm.ip_address = $rootScope.url;
    vm.go = go;

    function go(valid) {
        if (!valid) {
            console.log('invalid');
        } else {
            console.log('conents', vm.channel, ' ', vm.ip_address);
        }

    }
}