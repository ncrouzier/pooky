'use strict';

angular.module('pookyApp').factory('locationService', ['Restangular', function(Restangular) {

    var factory = {};
    var Location = Restangular.all('locations');


    factory.getLocations = function(params) {
        return Location.customGET("",params).then(
            function(locations) {
                return locations;
            },
            function(locations) {
                console.log('Error: ' + locations.status);
            });
    };

    factory.saveLocation = function(loc) {
        return Location.post(loc).then(
            function() {

            },
            function(res) {
                console.log('Error: ' + res.status);
            });
    };

    factory.updateLocation = function(loc) {
        loc.save();
    };

    return factory;

}]);
