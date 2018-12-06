angular.module('app').service('dataService', dataService);

dataService.$inject = [
    '$rootScope',
    '$http'
];

function dataService($rootScope, $http) {
    var self = this;


    self.validateDetails = validateDetails;
    self.setThrottle = setThrottle;
    self.getThrottle = getThrottle


    /*
        Validates IP Address and Channel, return 200 if details are ok

        Path : /macros/start
        Method : Post
    */
    function validateDetails(ip_address, channel) {
        var details = {
            channel: channel
        }

        if(!ip_address){ ip_address = $rootScope.defaultUrl; }

        var url = ip_address + '/macros/start'

        return $http.post(url, details);
    }

    /*
        Sends throttle percentage

        Path : /macros/setPercentage/:channel/:percentage
        Method : Post
    */
    function setThrottle(ip_address,channel, percentage) {
        var throttle_details = {
            channel: channel,
            percentage: percentage
        }

        if(!ip_address){ ip_address = $rootScope.defaultUrl; }

        var url = ip_address + '/macros/setPercentage/' + channel + '/' + percentage;

        return $http.post(url, throttle_details);
    }

    /*
        Gets throttle percentage
        
        Path :/macros/getPercentage/:channel
        Method : Post
    */
    function getThrottle(ip_address,channel) {

        if(!ip_address){ ip_address = $rootScope.defaultUrl; }

        var url = ip_address + '/macros/getPercentage/' + channel;

        return $http.get(url);

    }

}