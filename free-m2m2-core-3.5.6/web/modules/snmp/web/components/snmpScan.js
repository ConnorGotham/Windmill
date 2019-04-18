/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular', 'require', 'ipaddr'], function(angular, require, ipaddr) {
'use strict';

var snmpScan = {
	templateUrl: require.toUrl('./snmpScan.html'),
	controller: SNMPScanController,
	bindings: {
	},
	designerInfo: {}
};

SNMPScanController.$inject = ['maSNMP', '$q', '$timeout', 'maDialogHelper', 'maDataSource', '$scope'];
function SNMPScanController(maSNMP, $q, $timeout, maDialogHelper, maDataSource, $scope) {
	this.maSNMP = maSNMP;
	this.$q = $q;
	this.$timeout = $timeout;
	this.maDialogHelper = maDialogHelper;
	this.maDataSource = maDataSource;
	
	$scope.$on('$destroy', function() {
		this.cancelScan = true;
	}.bind(this));
	
	this.ipRange = '';

	this.scanSettings = {
		port: 161,
		retries: 0,
		timeout: 500,
		version: 'v1',
		readCommunity: 'public',
		writeCommunity: 'public',
		securityName: '',
		authProtocol: '',
		authPassphrase: '',
		privProtocol: '',
		privPassphrase: '',
		engineId: '',
		contextEngineId: '',
		contextName: ''
	};
	
	this.standardOids = [
		{
		    name: 'sysDescr',
		    oid: '1.3.6.1.2.1.1.1.0'
		},
		{
		    name: 'sysObjectID',
		    oid: '1.3.6.1.2.1.1.2.0'
		},
		{
		    name: 'sysUpTime',
		    oid: '1.3.6.1.2.1.1.3.0'
		},
		{
		    name: 'sysContact',
		    oid: '1.3.6.1.2.1.1.4.0'
		},
		{
		    name: 'sysName',
		    oid: '1.3.6.1.2.1.1.5.0'
		},
		{
		    name: 'sysLocation',
		    oid: '1.3.6.1.2.1.1.6.0'
		},
		{
		    name: 'sysServices',
		    oid: '1.3.6.1.2.1.1.7.0'
		}
	];
}

SNMPScanController.prototype.$onInit = function() {
};

SNMPScanController.prototype.$onChanges = function(changes) {
};

SNMPScanController.prototype.startScan = function(event) {
	this.hosts = [];
	this.devices = [];
	this.scanProgress = 0;
	
	(this.ipRange || '').split(/\s?[,\s]\s?/).forEach(function(ipRangeOrHostname) {
		var ipRange;
		try {
			ipRange = ipaddr.parseCIDR(ipRangeOrHostname);
		} catch (e) {}
		
		if (ipRange) {
			var checkIp = angular.copy(ipRange[0]);
			var count;
			
			if (checkIp.kind() === 'ipv4') {
				count = Math.pow(2, 32 - ipRange[1]);
				if (ipRange[1] < 31) {
					incrementIpAddress(checkIp);
					count -= 2;
				}
			} else if (checkIp.kind() === 'ipv6') {
				count = Math.pow(2, 128 - ipRange[1]);
			} else {
				throw new Error('unknown ip version');
			}
			
			for (var i = 0; i < count; i++) {
				if (!checkIp.match(ipRange)) {
					throw new Error('Not in range');
				}

				this.hosts.push(checkIp.toString());
				incrementIpAddress(checkIp);
			}
			return;
		}
		
		try {
			var ip = ipaddr.parse(ipRangeOrHostname);
			this.hosts.push(ip.toString());
			return;
		} catch (e) {}
		
		// assume its a hostname
		this.hosts.push(ipRangeOrHostname);
	}.bind(this));
	
	var seenHosts = {};
	this.hosts = this.hosts.filter(function(host) {
		if (seenHosts[host]) return false;
		return (seenHosts[host] = true);
	});
	
	var scanPromise = this.$q.resolve();
	
	this.hosts.forEach(function(host) {
		scanPromise = scanPromise.then(this.scanHost.bind(this, host));
	}.bind(this));
	
	scanPromise.finally(function() {
		delete this.scanPromise;
		delete this.cancelScan;
	}.bind(this));
	
	this.scanPromise = scanPromise;
};

SNMPScanController.prototype.scanHost = function(host) {
	if (this.cancelScan) {
		return this.$q.reject();
	}
	var device = {
		host: host
	};
	return this.readStandardOids(device).then(function() {
		this.devices.push(device);
	}.bind(this), angular.noop).finally(function() {
		this.scanProgress++;
	}.bind(this));
};

SNMPScanController.prototype.readStandardOids = function(device) {
	return this.standardOids.reduce(function(promise, oidObj) {
		return promise.then(function() {
			if (this.cancelScan) {
				return this.$q.reject();
			}
			
			var readSettings = angular.extend({
				host: device.host,
				oid: oidObj.oid
			}, this.scanSettings);
			
			return this.maSNMP.readOid(readSettings).then(function(result) {
				device[oidObj.name] = result;
			}.bind(this), function(error) {
				// dont try and read other OIDs from this host if its unreachable
				var mangoStatusName = error.data && error.data.mangoStatusName;
				if (error.status !== 500 || !mangoStatusName || mangoStatusName === 'NO_RESPONSE' || mangoStatusName === 'NETWORK_UNREACHABLE') {
					return this.$q.reject();
				}
			}.bind(this));
		}.bind(this));
	}.bind(this), this.$q.resolve());
};

SNMPScanController.prototype.addDataSource = function(event, device) {
	return this.maDialogHelper.prompt(event, 'snmp.ui.enterDataSourceName', null, 'snmp.ui.dataSourceName', device.sysName || device.sysDescr)
	.then(function(dsName) {
		var ds = new this.maDataSource(this.scanSettings);
		angular.extend(ds, {
			modelType: 'SNMP',
			name: dsName,
			host: device.host
		});
		
		return ds.$save();
	}.bind(this)).then(function(dataSource) {
		this.maDialogHelper.toastOptions({
			textTr: ['snmp.ui.successfullyCreatedDataSource', dataSource.name],
		});
	}.bind(this), function(error) {
		if (!error) return; // dialog cancelled
		
		var errorMsg;
		if (error.status === 422 && error.data && error.data.validationMessages && error.data.validationMessages[0]) {
			var validationError = error.data.validationMessages[0];
			errorMsg = validationError.message;
			if (errorMsg === 'Required value') {
				errorMsg += ' \u2014 ' + validationError.property;
			}
		} else {
			errorMsg = (error.data && error.data.localizedMessage) ||
				error.headers('errors') || 'Error';
		}

		this.maDialogHelper.toastOptions({
			textTr: ['snmp.ui.errorCreatingDataSource', errorMsg],
			classes: 'md-warn',
			hideDelay: 10000
		});
	}.bind(this));
};

function incrementIpAddress(ip) {
	if (ip.kind() === 'ipv4') {
		incrementIpParts(ip.octets, ip.octets.length - 1, 0xFF);
	} else if (ip.kind() === 'ipv6') {
		incrementIpParts(ip.parts, ip.parts.length - 1, 0xFFFF);
	} else {
		throw new Error('unknown ip version');
	}
	
	function incrementIpParts(parts, i, max) {
		parts[i] += 1;
		if (parts[i] > max) {
			parts[i] = 0;
			incrementIpParts(parts, i - 1, max);
		}
	}
}

return snmpScan;

}); // require
