'use strict';

angular.module('pookyApp').controller('LocationmanagerCtrl', ['$scope', '$http', '$q', 'FileUploader', 'locationService', 'countryService', function($scope, $http, $q, FileUploader, locationService, countryService) {

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
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
        // console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        // var fileReader = new FileReader();

        $scope.uploader.uploadAll();
        // console.info('onAfterAddingFile', fileItem.file.name);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        // console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        // console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        // console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        // console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {




            EXIF.getData(fileItem._file, function() {
                console.log("lsdjf");
                var loc = {};
                loc.location = '';
                loc.description = '';
                loc.date = '';
                loc.order = '';
                loc.lat = EXIF.getTag(fileItem._file, "GPSLatitude")[0] + ((EXIF.getTag(fileItem._file, "GPSLatitude")[1] / 60) + (EXIF.getTag(fileItem._file, "GPSLatitude")[2] / 3600));
                loc.lng = EXIF.getTag(fileItem._file, "GPSLongitude")[0] + ((EXIF.getTag(fileItem._file, "GPSLongitude")[1] / 60) + (EXIF.getTag(fileItem._file, "GPSLongitude")[2] / 3600));
                loc.imgPath = fileItem.file.name;
                loc.zoomLvl = 16;
                loc.country = '';

                $scope.newLocationData.push(loc);
               
            });
$scope.newLocationData.push({});

        // console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        // console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        // console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        // console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        // console.info('onCompleteAll');
    };

}]);
