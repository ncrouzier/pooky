'use strict';

angular.module('pookyApp').controller('LocationmanagerCtrl', ['$scope', '$http', 'locationService', function($scope, $http, locationService) {

	$scope.limit=10;

	$scope.selectlimit = function(limit){
		$scope.limit=limit;
		$scope.filterLocation($scope.item)
	}

    locationService.getLocations({
        limit: $scope.limit,
        sort: '-date'
    }).then(function(locs) {
        $scope.locationData = locs;
    });

    $scope.updateLocation = function(loc) {

        locationService.updateLocation(loc);

    };

// Filter locations by location  and country regex
    $scope.filterLocation = function(val) {
	    locationService.getLocations({
        	sort: '-date',
        	limit: $scope.limit,
        	filter: {
        		all: val
        	}
    	}).then(function(locs) {
        	$scope.locationData = locs;
    	});
    };

}]);
