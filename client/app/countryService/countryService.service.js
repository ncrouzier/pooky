'use strict';

angular.module('pookyApp').factory('countryService', ['Restangular', function(Restangular) {
    
    var factory = {};
    var Country = Restangular.all('countries');


    factory.getCountries = function(params) {
        return Country.getList(params).then(
            function(countries) {
                return countries;
            },
            function(countries) {
                console.log('Error: ' + countries.status);
            });
    };

    factory.saveCountry = function(country) {
        return Country.post(country).then(
            function() {

            },
            function(res) {
                console.log('Error: ' + res.status);
            });
    };

    factory.updateCountry = function(country) {
        country.save();
    };

    return factory;
  }]);
