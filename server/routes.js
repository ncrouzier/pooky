/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path'); //used for file path
var fs = require('fs-extra');
var express = require('express');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/countries', require('./api/country'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/locations', require('./api/location'));
    app.use('/auth', require('./auth'));

    app.use(busboy());

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // Upload an imahe from the DB.
    app.route('/upload').post(function(req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/assets/images/caca' + filename);
            file.pipe(fstream);
            fstream.on('close', function() {
                console.log("Upload Finished of " + filename);
                res.redirect('back'); //where to go next
            });
        });
    });

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });


};
