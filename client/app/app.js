'use strict';

var app = angular.module('pookyApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngMap',
    'restangular'
]);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
        .otherwise('/');

    $locationProvider.html5Mode(true);


});
app.run(['$http', 'Restangular', function($http, Restangular) {
    Restangular.setBaseUrl('/api/');

}]);