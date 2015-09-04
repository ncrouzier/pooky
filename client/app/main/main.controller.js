'use strict';

angular.module('pookyApp')
  .controller('MainCtrl', function ($scope, $http, uiGmapGoogleMapApi) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

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
    
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
      console.log($scope.map);

    uiGmapGoogleMapApi.then(function(maps) {

    });
  });
