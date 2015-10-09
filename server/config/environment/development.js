'use strict';

var path = require('path');

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/pooky-dev'
  },

  seedDB: true,

  assetPath: path.normalize(__dirname + '/../../..') + '/client/assets'
};
