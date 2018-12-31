angular.module('app', ['ui.router']);


angular.module('app').config(config);

config.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
]

function config($stateProvider, $urlRouterProvider) {

    /* 
     Index Page
     user can enter ip address and channel number
    */
    var indexState = {
        name: 'index',
        url: '/index',
        templateUrl: 'app/shared/index/indexView.html',
        controller: 'IndexViewCtrl',
        controllerAs: 'indexView'
    }

    /*
     Car Control Page
     User can control the cars throttle
    */
    var carControlState = {
        name: 'carControl',
        url: '/control',
        templateUrl: 'app/shared/carControl/carControlView.html',
        controller: 'CarControlViewCtrl',
        controllerAs: 'carControlView',
        params: {
            channel: null,
            ip_address: null
        },
        //resolve used to check if transition contains channel and ipaddress params
        resolve: {
            authenticated: ['$q', '$state','$stateParams', function ($q, $state,$stateParams) {
                var deferred = $q.defer();
               
                if ($stateParams.channel === null || $stateParams.ip_address.length === null) {
                    $state.transitionTo('index', {});
                }else{
                    deferred.resolve();
                }

                return deferred.promise;
            }]
        }
    };

    $stateProvider.state(indexState);
    $stateProvider.state(carControlState);

    $urlRouterProvider.otherwise('/index');
}

angular.module('app').run(run);
run.$inject = [
    '$rootScope'
]
function run($rootScope) {
    console.log('version 1.0.0 Yusof Bandar');
    $rootScope.defaultNumberChannels = 5;
    $rootScope.defaultUrl = '192.168.1.102';
}
