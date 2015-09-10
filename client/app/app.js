'use strict';

var app = angular.module('pookyApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngMap',
    'restangular',
    'xeditable'
]);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
        .otherwise('/');

    $locationProvider.html5Mode(true);


});
app.run(['$http', 'Restangular','editableOptions', function($http, Restangular,editableOptions) {
    Restangular.setBaseUrl('/api/');
    Restangular.setRestangularFields({
        id: '_id'
    });
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

}]);