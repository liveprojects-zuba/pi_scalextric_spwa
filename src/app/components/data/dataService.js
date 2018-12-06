angular.module('app').service('dataService', dataService);

dataService.$inject = [
    '$rootScope',
    '$http'
];

function dataService($rootScope, $http) {
    var self = this;


    self.validateDetails = validateDetails;


    /*
        Validates IP Address and Channel, return 200 if details are ok

        Path : /macros/start
        Method : Post
    */
    function validateDetails(ip_address, channel) {
        var details = {
            address: address,
            channel: channel
        }

        var url = $rootScope.url + '/macros/start'

        return $http.post(url, details);
    }

    /*
        Sends throttle percentage

        Path : /macros/setPercentage/:channel/:percentage
        Method : Post
    */
    function setThrottle(channel, percentage) {
        var throttle_details = {
            channel: channel,
            percentage: percentage
        }

        var url = $rootScope.url + '/macros/setPercentage/' + channel + '/' + percentage;

        return $http.post(url, details);
    }

   

}