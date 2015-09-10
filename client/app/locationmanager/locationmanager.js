'use strict';

angular.module('pookyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('locationmanager', {
        url: '/locationmanager',
        templateUrl: 'app/locationmanager/locationmanager.html',
        controller: 'LocationmanagerCtrl'
      });
  });