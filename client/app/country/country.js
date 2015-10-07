'use strict';

angular.module('pookyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('country', {
        url: '/country',
        templateUrl: 'app/country/country.html',
        controller: 'CountryCtrl'
      });
  });