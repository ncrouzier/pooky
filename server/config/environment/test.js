'use strict';

var path = require('path');

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/pooky-test'
  },
  seedDB: true,

  assetPath: path.normalize(__dirname + '/../../..') + '/client/assets'
};