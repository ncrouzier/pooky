'use strict';

angular.module('pookyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider,uiGmapGoogleMapApiProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    uiGmapGoogleMapApiProvider.configure({
        key: '',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'geometry,visualization'
    });
  });
