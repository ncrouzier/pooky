'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CountrySchema = new Schema({
  countryCode: String,
  countryName: String
});

module.exports = mongoose.model('Country', CountrySchema);