'use strict';
/* globals LatLon */
angular.module('pookyApp').controller('MainCtrl', ['$scope', '$http', '$compile', 'locationService', function($scope, $http, $compile, locationService) {

    $scope.infoWindows = [];
    $scope.pathData = [];
    $scope.distanceTraveled = 0;
    locationService.getLocations().then(function(locs) {
        $scope.locationData = locs;
        var loc = $scope.locationData[$scope.locationData.length - 1];
        $scope.currentlocation = $scope.getLocation(loc);
        $scope.currentzoom = 6; //$scope.getZoom(loc);


        var oldPoint, newPoint;
        locs.map(function(item) {
            $scope.pathData.push([item.lat, item.lng]);

            newPoint = new LatLon(item.lat, item.lng);
            if (oldPoint !== undefined) {
                $scope.distanceTraveled = $scope.distanceTraveled + newPoint.distanceTo(oldPoint);
            }
            oldPoint = newPoint;

        });
        $scope.distanceTraveled = addSeparatorsNF(($scope.distanceTraveled / 1000).toFixed(2), '.', '.', ' ');
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



    $scope.toggleTraceLine = function() {
        if ($scope.map.shapes.traceline.getVisible() === false) {
            $scope.map.shapes.traceline.setVisible(true);
        } else {
            $scope.map.shapes.traceline.setVisible(false);
        }
    };

    $scope.getZoom = function(loc) {
        return loc.zoomLvl;
    };

    $scope.getLocation = function(loc) {
        return loc.lat + ',' + loc.lng;
    };

    $scope.getLatLng = function(loc) {
        return new google.maps.LatLng(loc.lat, loc.lng);
    };

    $scope.locationZoom = function(zoom) {
        $scope.map.setZoom(zoom);
    };

    $scope.showInfoWindowFromLink = function(loc) {
        var infowindow = createInfoWindow(loc);

        closeAllInfoWindows();
        infowindow.open($scope.map);
        $scope.map.panTo($scope.getLatLng(loc));

    };

    $scope.showInfoWindowFromMarker = function() {
        var loc = this.location;
        var infowindow = createInfoWindow(loc);

        closeAllInfoWindows();
        infowindow.open($scope.map);
        $scope.map.panTo($scope.getLatLng(loc));
    };

    function closeAllInfoWindows() {
        for (var i = 0; i < $scope.infoWindows.length; i++) {
            $scope.infoWindows[i].close();
        }
    }


    function createInfoWindow(loc) {
        var onload = function() {
            $scope.$apply(function() {
                $compile(document.getElementById("infowindow_" + loc._id))($scope)
            });
        }
        var infowindow = new google.maps.InfoWindow({
            content: '<div id="infowindow_' + loc._id + '">' + loc.location + '<br> <img src="assets/images/locations/TN_' + loc.imgPath + '"><br><a ng-click="locationZoom(' + loc.zoomLvl + ')">zoom</a></div>',
            position: $scope.getLatLng(loc),
            pixelOffset: new google.maps.Size(0, -25)
        });
        google.maps.event.addListener(infowindow, 'domready', function(a, b, c, d) {
            onload();
        });
        $scope.infoWindows.push(infowindow);
        return infowindow;
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
