'use strict';

angular.module('pookyApp')
  .controller('MainCtrl', function ($scope, $http,locationService) {

    // $scope.$on('mapInitialized', function(event, map) {

    // });

    // $scope.$watch('locationData', function() {
    //     var location = JSON.parse($scope.locationData);
    //     $scope.location = {
    //         lng : location.longitude,
    //         lat : location.latitude
        // initialize();
    // });

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

    locationService.getLocations();

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

   
  });
