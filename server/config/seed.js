/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Country = require('../api/country/country.model');



User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'a@a.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Country.find({}).remove(function() {
  Country.create({
    countryCode: 'count1',
    countryName: 'Country 1'
  }, {
    countryCode: 'count2',
    countryName: 'Country 2'
  }, function() {
      console.log('finished populating countries');
    }
  );
});