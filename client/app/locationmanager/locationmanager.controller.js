'use strict';

angular.module('pookyApp').controller('LocationmanagerCtrl', ['$scope', '$http', 'locationService', function($scope, $http, locationService) {

    locationService.getLocations({
        limit: 10
    }).then(function(locs) {
        $scope.locationData = locs;
    });

    $scope.updateLocation = function(loc) {

        locationService.updateLocation(loc);

    };

}]);
