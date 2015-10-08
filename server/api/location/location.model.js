'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
	location: String,
	description: String,
    date: Date,
    order: Number,
    lat: String,
    lng: String,
    zoomLvl: Number,
    imgPath: String,
    imgHeight: Number,
    imgWidth: Number,
    country: String,
    createdAt: Date,
    updatedAt: Date
});

LocationSchema.pre('save', function(next, done) {
    if (this.isNew) {
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
    next();
});


module.exports = mongoose.model('Location', LocationSchema);
