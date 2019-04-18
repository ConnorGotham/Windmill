/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular'], function(angular) {
'use strict';

snmpFactory.$inject = ['$http', '$httpParamSerializer', 'maTemporaryResource'];
function snmpFactory($http, $httpParamSerializer, TemporaryResource) {
    var snmpUrl = '/rest/v2/snmp';
	
	var SNMP = function() {
    };
    
	SNMP.prototype.readOid = function(config) {
		return $http({
    		method: 'POST',
    		url: snmpUrl + '/get-oid',
    		data: config
    	}).then(function(response) {
    		return response.data;
    	});
	};
	
    SNMP.prototype.dataSourceReadOid = function(dsXid, oid) {
		return $http({
    		method: 'GET',
    		url: snmpUrl + '/get-oid/' + encodeURIComponent(dsXid),
    		params: {
    			oid: oid
    		}
    	}).then(function(response) {
    		return response.data;
    	});
	};
	
    SNMP.prototype.dataSourceWriteOid = function(dsXid, oid, value, dataType) {
        const xidEncoded = encodeURIComponent(dsXid);
        return $http({
            method: 'POST',
            url: `${snmpUrl}/set-oid/${xidEncoded}`,
            data: {oid, value, dataType}
        }).then(response => response.data);
    };
	
	SNMP.prototype.walk = function(config) {
		return $http({
    		method: 'POST',
    		url: snmpUrl + '/walk',
    		data: config
    	}).then(function(response) {
    		return new TemporaryResource(response);
    	});
	};
	
	SNMP.prototype.dataSourceWalk = function(dsXid, config) {
		return $http({
    		method: 'POST',
    		url: snmpUrl + '/walk/' + encodeURIComponent(dsXid),
    		data: config
    	}).then(function(response) {
    		return new TemporaryResource(response);
    	});
	};

    SNMP.prototype.getOids = function(dsXid) {
    	return $http({
    		method: 'GET',
    		url: snmpUrl + '/' + encodeURIComponent(dsXid) + '/oids'
    	}).then(function(response) {
    		return response.data;
    	});
    };

    return new SNMP();
}

return snmpFactory;

}); // define
