'use strict';

angular.module('pookyApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Map',
      'link': '/'
    },
    {
      'title': 'Stats',
      'link': '/stats'
    },
    {
      'title': 'Location Manager',
      'link': '/locationmanager'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });