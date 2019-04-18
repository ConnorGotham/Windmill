/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Will Geller
 */

define(['angular'], function(angular) {
'use strict';

function dataFileDataSourceService($http) {
    var dataFileImport  = function() {};

    dataFileImport.upload = function(formData, xid, returnLocation) {
        $http.post('/rest/v2/data-file/' + xid + '/import',
            formData,
            {
                headers: { 'Content-Type': undefined }
            })
            .then(successCallback, errorCallback);

        function successCallback(data) {
            // console.log('Success, status endpoint:', data.headers().location);
            returnLocation(data.headers().location);
        }

        function errorCallback(error) {
            console.log('Error', error);
        }
    };

    dataFileImport.getStatus = function(url, statusCallback) {
        $http.get(url)
            .then(statusCallback, function(error) {
                console.log('Error', error);
            });
    };

    return dataFileImport;
}



dataFileDataSourceService.$inject = ['$http'];
return dataFileDataSourceService;

}); // define
