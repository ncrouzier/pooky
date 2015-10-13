'use strict';

angular.module('pookyApp').controller('LocationmanagerCtrl', ['$scope', '$http', '$q', '$filter', 'FileUploader', 'locationService', 'countryService', function($scope, $http, $q, $filter, FileUploader, locationService, countryService) {

    $scope.limit = 10;
    $scope.newLocationData = [];

    $scope.selectlimit = function(limit) {
        $scope.limit = limit;
        $scope.filterLocation($scope.item);
    };

    locationService.getLocations({
        limit: $scope.limit,
        sort: '-date -order'
    }).then(function(locs) {
        $scope.locationData = locs;
    });

    countryService.getCountries().then(function(countries) {
        $scope.countryData = countries;
    });



    $scope.updateLocation = function(loc) {
        loc.date = new Date(loc.date);
        locationService.updateLocation(loc);

    };



    // Filter locations by location  and country regex
    $scope.filterLocation = function(val) {
        locationService.getLocations({
            sort: '-date -order',
            limit: $scope.limit,
            filter: {
                all: val
            }
        }).then(function(locs) {
            $scope.locationData = locs;
        });
    };

    $scope.dragMarkerEnd = function(event, loc) {
        loc.lat = this.position.lat();
        loc.lng = this.position.lng();
    };


    // UPLOADER
    var uploader = $scope.uploader = new FileUploader({
        url: 'api/photo',
        alias: 'recfile'
    });

    // UPLOADER FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/ ) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';

            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // UPLOADER CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
        $scope.uploader.uploadAll();
    };

    uploader.onSuccessItem = function(fileItem) {

        var deferred = $q.defer();

        EXIF.getData(fileItem._file, function() {
            try {
                var loc = {};
                var latDegree = EXIF.getTag(fileItem._file, 'GPSLatitude')[0];
                var latMinute = EXIF.getTag(fileItem._file, 'GPSLatitude')[1];
                var latSecond = EXIF.getTag(fileItem._file, 'GPSLatitude')[2];
                var latDirection = EXIF.getTag(fileItem._file, 'GPSLatitudeRef');
                var gLat = convertDMSToDD(latDegree, latMinute, latSecond, latDirection);

                var lonDegree = EXIF.getTag(fileItem._file, 'GPSLongitude')[0];
                var lonMinute = EXIF.getTag(fileItem._file, 'GPSLongitude')[1];
                var lonSecond = EXIF.getTag(fileItem._file, 'GPSLongitude')[2];
                var lonDirection = EXIF.getTag(fileItem._file, 'GPSLongitudeRef');
                var gLon = convertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);

                loc.location = fileItem.file.name.replace(/\.[^/.]+$/, "");
                loc.description = '';
                loc.date = convertExifDateToDate(EXIF.getTag(fileItem._file, 'DateTimeOriginal'));
                loc.order = 0;
                loc.lat = gLat;
                loc.lng = gLon;
                loc.imgPath = fileItem.file.name;
                loc.zoomLvl = 16;
                loc.country = '';

                deferred.resolve(loc);
            } catch (err) {
                deferred.reject();
            }
        });



        var promise = deferred.promise;

        promise.then(function(loc) {
            $scope.newLocationData.unshift(loc);
        }, function(reason) {
            // An error has occured while parsing the EXIF data. Let's create an empty loc object
            var loc = {};
            loc.location = fileItem.file.name.replace(/\.[^/.]+$/, "");
            loc.imgPath = fileItem.file.name;
            $scope.newLocationData.unshift(loc);
        });
    };


    // GPS CONVERT FUCNTION
    function convertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = degrees + (minutes / 60) + (seconds / 36000000);

        if (direction === 'S' || direction === 'W') {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    };

    function convertExifDateToDate(exif) {
        if (exif) {
            var date = exif.split(/[ :]+/);
            return new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5], 0);
        }
    };

}]);
