'use strict';
/* globals LatLon */
angular.module('pookyApp').controller('MainCtrl', ['$scope', '$http', 'locationService', function($scope, $http, locationService) {

    $scope.pathData = [];
    $scope.distanceTraveled = 0;
    locationService.getLocations().then(function(locs) {
        $scope.locationData = locs;
        var oldPoint, newPoint;
        locs.map(function(item) {
            $scope.pathData.push([item.lat, item.lng]);

            newPoint = new LatLon(item.lat, item.lng);
            if (oldPoint !== undefined) {
                $scope.distanceTraveled = $scope.distanceTraveled + newPoint.distanceTo(oldPoint);
            }
            oldPoint = newPoint;

        });
        $scope.distanceTraveled = addSeparatorsNF(($scope.distanceTraveled / 1000).toFixed(2) , '.', '.', ' ');
    });


    function addSeparatorsNF(nStr, inD, outD, sep) {
        nStr += '';
        var dpos = nStr.indexOf(inD);
        var nStrEnd = '';
        if (dpos !== -1) {
            nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
            nStr = nStr.substring(0, dpos);
        }
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(nStr)) {
            nStr = nStr.replace(rgx, '$1' + sep + '$2');
        }
        return nStr + nStrEnd;
    }


    // function initialize() {
    //     var mapOptions = {
    //         panControl    : true,
    //         zoomControl   : true,
    //         scaleControl  : true,
    //         mapTypeControl: true,
    //         mapTypeId     : google.maps.MapTypeId.ROADMAP
    //     };

    //     $scope.map = {
    //         center: {
    //             latitude: 41,
    //             longitude: 87
    //         },
    //         zoom: 8,
    //         options: mapOptions,
    //     };
    // }



    // $scope.awesomeThings = [];
    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });




    $scope.addThing = function() {
        if ($scope.newThing === '') {
            return;
        }
        $http.post('/api/things', {
            name: $scope.newThing
        });
        $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
        $http.delete('/api/things/' + thing._id);
    };


}]);
