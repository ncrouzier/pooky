'use strict';

angular.module('pookyApp').controller('LocationmanagerCtrl', ['$scope', '$http', 'locationService', function($scope, $http, locationService) {

    locationService.getLocations({
        limit: 10,
        sort: '-date'
    }).then(function(locs) {
        $scope.locationData = locs;
    });

    $scope.updateLocation = function(loc) {

        locationService.updateLocation(loc);

    };

// Filter locations by location, date and country regex
    $scope.filterLocation = function(val) {
	    locationService.getLocations({
        	sort: '-date',
        	limit: 10,
        	filter: {
        		all: val
        	}
    	}).then(function(locs) {
        	$scope.locationData = locs;
    	});
    };

}]);
