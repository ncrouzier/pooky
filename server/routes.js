/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path'); //used for file path
var fs = require('fs-extra');
var express = require('express');
var multer = require('multer');
var upload = multer({
    dest: './uploads/'
});
var config = require('./config/environment');
var lwip = require('lwip');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/countries', require('./api/country'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/locations', require('./api/location'));
    app.use('/auth', require('./auth'));


    var type = upload.single('recfile');

    app.post('/api/photo', type, function(req, res) {

        /** When using the "single"
            data come in "req.file" regardless of the attribute "name". **/
        var tmp_path = req.file.path;

        /** The original name of the uploaded file
            stored in the variable "originalname". **/

        var target_path = config.assetPath + '/images/locations/' + req.file.originalname;
        /** A better way to copy the uploaded file. **/
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);


        src.on('end', function() {
            fs.remove(tmp_path, function(err) {
                if (err) return console.error(err)
            });
            lwip.open(target_path, function(err, image) {
                var maxW = 300,
                    maxH = 300,
                    ratio = Math.min(maxW / image.width(), maxH / image.height());
                ratio = ratio < 1 ? ratio : 1;
                image.batch()
                    .scale(ratio)
                    .writeFile(config.assetPath + '/images/locations/TN_' + req.file.originalname, function(err) {
                        return res.status(201).send('success');
                    });

            });

        });
        src.on('error', function(err) {
            console.log("error");
            return res.status(500).send(err);
        });

    });


    // // Upload an imahe from the DB.
    // app.route('/upload').post(function(req, res, next) {

    //     var fstream;
    //     req.pipe(req.busboy);
    //     req.busboy.on('file', function(fieldname, file, filename) {
    //         console.log("Uploading: " + filename);

    //         //Path where image will be uploaded
    //         fstream = fs.createWriteStream(__dirname + '/../public/assets/images/caca' + filename);
    //         file.pipe(fstream);
    //         fstream.on('close', function() {
    //             console.log("Upload Finished of " + filename);
    //             res.redirect('back'); //where to go next
    //         });
    //     });
    // });

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);



    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });


};
