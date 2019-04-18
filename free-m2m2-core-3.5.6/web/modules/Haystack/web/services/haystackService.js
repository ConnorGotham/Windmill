/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular'], function(angular) {
'use strict';

haystackFactory.$inject = ['$http', '$httpParamSerializer', 'maTemporaryResource'];
function haystackFactory($http, $httpParamSerializer, TemporaryResource) {
    var haystackDsUrl = '/rest/v2/haystack-ds/';
	
	var Haystack = function() {
    }
    
	Haystack.prototype.getQueryUrl = function(dsXid, filter, limit, mediaType) {
		var params = {
			mediaType: mediaType || 'application/json'
		};
    	if (isFinite(limit)) {
    		params.limit = limit;
    	}
		var paramsStr = $httpParamSerializer(params);
		var url = haystackDsUrl + encodeURIComponent(dsXid) + '/read/' + encodeURIComponent(filter);
		if (paramsStr) {
			url += '?' + paramsStr;
		}
		return url;
	};
	
    Haystack.prototype.query = function(dsXid, filter, limit) {
    	var params = {};
    	if (isFinite(limit)) {
    		params.limit = limit;
    	}
    	return $http({
    		method: 'GET',
    		url: haystackDsUrl + encodeURIComponent(dsXid) + '/read/' + encodeURIComponent(filter),
    		params: params
    	}).then(function(response) {
    		return response.data;
    	});
    };
    
    Haystack.prototype.getHaystackIds = function(dsXid) {
    	return $http({
    		method: 'GET',
    		url: haystackDsUrl + encodeURIComponent(dsXid) + '/haystack-ids'
    	}).then(function(response) {
    		return response.data;
    	});
    };
    
    Haystack.prototype.historyImport = function(dsXid, from, to, pointXids) {
    	return $http({
    		method: 'POST',
    		url: haystackDsUrl + encodeURIComponent(dsXid) + '/history-import',
    		data: pointXids,
            params: {
              from: from.toISOString(),
              to: to.toISOString()
            },
    	}).then(function(response) {
    		return new TemporaryResource(response);
    	});
    };

    return new Haystack();
}

return haystackFactory;

}); // define
