'use strict';

var _ = require('lodash');


var Location = require('./location.model');

// Get list of locations
exports.index = function(req, res) {
    var limit = req.query.limit;
    var filter = req.query.filter;
    var sort = req.query.sort;
    var query = Location.find();

    if (filter) {
        filter = JSON.parse(filter);
        if (filter.all) {

            query = query.or([{
                "location": new RegExp(filter.all, 'i')
            }, {
                "country": new RegExp(filter.all, 'i')
            }]);

        }
    }

    if (sort) {
        query = query.sort(sort);
    } else {
        query = query.sort("date");
    }



    if (limit) {
        query = query.limit(limit);
    }

    query.exec(function(err, locations) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(locations);
    });
};

// Get a single location
exports.show = function(req, res) {
    Location.findById(req.params.id, function(err, location) {
        if (err) {
            return handleError(res, err);
        }
        if (!location) {
            return res.status(404).send('Not Found');
        }
        return res.json(location);
    });
};

// Creates a new location in the DB.
exports.create = function(req, res) {
    Location.create(req.body, function(err, location) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(location);
    });
};

// Updates an existing location in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Location.findById(req.params.id, function(err, location) {
        if (err) {
            return handleError(res, err);
        }
        if (!location) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(location, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(location);
        });
    });
};

// Deletes a location from the DB.
exports.destroy = function(req, res) {
    Location.findById(req.params.id, function(err, location) {
        if (err) {
            return handleError(res, err);
        }
        if (!location) {
            return res.status(404).send('Not Found');
        }
        location.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};





function handleError(res, err) {
    return res.status(500).send(err);
}
