'use strict';

angular.module('pookyApp').service('locationService',['Restangular', function (Restangular) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Location = Restangular.all('locations');


	this.getLocations = function(params) {
        return Location.getList().then(
            function(locations) {
            	console.log(locations)
                return locations;
            },
            function(locations) {
                console.log('Error: ' + res.status);
            });
    };

  }]);
