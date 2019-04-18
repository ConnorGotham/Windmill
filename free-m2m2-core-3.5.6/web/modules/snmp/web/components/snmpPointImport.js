/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular', 'require'], function(angular, require) {
'use strict';

var snmpPointImport = {
	templateUrl: require.toUrl('./snmpPointImport.html'),
	controller: SNMPPointImportController,
	bindings: {
		dataSourceXid: '@sourceXid'
	},
	designerInfo: {}
};

SNMPPointImportController.$inject = ['maSNMP', '$q', 'maPoint', '$timeout', 'maDialogHelper', '$filter', 'maFileStore', '$scope'];
function SNMPPointImportController(maSNMP, $q, maPoint, $timeout, maDialogHelper, $filter, maFileStore, $scope) {
	this.maSNMP = maSNMP;
	this.$q = $q;
	this.maPoint = maPoint;
	this.$timeout = $timeout;
	this.maDialogHelper = maDialogHelper;
	this.$filter = $filter;
	this.maFileStore = maFileStore;

	$scope.$on('$destroy', function() {
		this.cancelCreatePoints = true;
		if (this.walkResource) {
			this.walkResource.cancel();
		}
	}.bind(this));
	
	this.selectedOids = [];
	this.filterWalkResults = this.filterWalkResults.bind(this);
	this.generatePoints = this.generatePoints.bind(this);
	this.orderPoints = this.orderPoints.bind(this);
	
	this.pointOrder = 'oid';
	this.walkResultTable = {
		page: 1,
		limit: 20,
		order: 'oid',
		total: 0
	};
	
	this.columns = {
		deviceName: {
			column: null
		},
		name: {
			column: 'symbol'
		},
		xid: {
			column: null
		},
		dataType: {
			column: null
		},
		settable: {
			column: 'accessible',
			regex: 'read-write',
			boolean: true
		},
		unit: {
			column: null
		}
	};
	
	this.dataTypeMap = {
		'Integer32': {
		    setType: 'INTEGER_32',
		    dataType: 'NUMERIC'
		},
		'OCTET STRING': {
		    setType: 'OCTET_STRING',
		    dataType: 'ALPHANUMERIC'
		},
		'OBJECT IDENTIFIER': {
		    setType: 'OID',
		    dataType: 'ALPHANUMERIC'
		},
		'TimeTicks': {
		    setType: 'TIME_TICKS',
		    dataType: 'NUMERIC'
		},
		'Counter': {
		    setType: 'COUNTER_32',
		    dataType: 'NUMERIC'
		},
		'Counter64': {
		    setType: 'COUNTER_64',
		    dataType: 'NUMERIC'
		},
		'Gauge': {
		    setType: 'GAUGE_32',
		    dataType: 'NUMERIC'
		},
		'IpAddress': {
		    setType: 'IP_ADDRESS',
		    dataType: 'ALPHANUMERIC'
		},
		'Opaque': {
		    setType: 'Opaque',
		    dataType: 'ALPHANUMERIC'
		}
	};

	// UPDATE_KEEP_XID, UPDATE, SKIP
	this.existingIdStrategy = 'SKIP';
	this.hideExistingOids = true;
}

SNMPPointImportController.prototype.$onInit = function() {
};

SNMPPointImportController.prototype.$onChanges = function(changes) {
	if (changes.dataSourceXid) {
		if (this.dataSourceXid) {
			this.refreshExistingOids();
			
			this.maSNMP.dataSourceReadOid(this.dataSourceXid, '1.3.6.1.2.1.1.2.0').then(function(result) {
				this.rootOid = result;
			}.bind(this), function(error) {
				var msg = error.data && error.data.localizedMessage || error.statusText;
				this.maDialogHelper.toastOptions({
					textTr: ['snmp.ui.errorGettingRootOid', msg],
					classes: 'md-warn',
					hideDelay: 10000
				});
				return (this.existingOids = {});
			}.bind(this));
		}
	}
};

SNMPPointImportController.prototype.setMibFiles = function(urls) {
	this.mibFileUrls = urls;
	this.mibFileNames = (urls || []).map(function (url) {
		var path = this.maFileStore.fromUrl(url);
		// remove file store name
		path.shift();
		return path.join('/');
	}.bind(this));
};

SNMPPointImportController.prototype.startSNMPWalk = function(event) {
	this.selectedOids = [];
	this.mangoPoints = [];
	this.orderedMangoPoints = [];
	this.filteredWalkResults = [];
	delete this.walkResults;
	
	if (!this.dataSourceXid) return;

	this.snmpWalkPromise = this.existingOidsPromise.then(function() {
		return this.maSNMP.dataSourceWalk(this.dataSourceXid, {
			filenames: this.mibFileNames,
			useMibFiles: true,
			oid: this.rootOid
		});
	}.bind(this)).then(function(tmpResource) {
		this.walkResource = tmpResource;
		return tmpResource.refreshUntilFinished(500);
	}.bind(this)).then(function(tmpResourceData) {
	    
	    if (tmpResourceData.error) {
	        this.maDialogHelper.toastOptions({
	            textTr: ['snmp.ui.walkStoppedDueToError', tmpResourceData.error],
	            classes: 'md-warn',
	            hideDelay: 10000
	        });
	    }
	    
		this.walkResults = tmpResourceData.results;
		this.filterWalkResults();
	}.bind(this), function(error) {
		var msg = 'HTTP ' + error.status + ' \u2014 ' + (error.data && error.data.localizedMessage || error.statusText);
		this.maDialogHelper.toastOptions({
			textTr: ['snmp.ui.snmpWalkError', msg],
			classes: 'md-warn',
			hideDelay: 10000
		});
		return (this.existingOids = {});
	}.bind(this), function(tmpResourceData) {
		// tmp resource notify
		if (tmpResourceData.results) {
			this.walkResults = tmpResourceData.results;
			this.filterWalkResults();
		}
	}.bind(this)).finally(function() {
		delete this.walkResource;
		delete this.snmpWalkPromise;
	}.bind(this));
};

SNMPPointImportController.prototype.refreshExistingOids = function() {
	this.existingOidsPromise = this.maSNMP.getOids(this.dataSourceXid).then(function(list) {
		var existingOids = {};
		list.forEach(function(item) {
			existingOids[item.oid] = item.pointXid;
		});
		return (this.existingOids = existingOids);
	}.bind(this), function(error) {
		var msg = 'HTTP ' + error.status + ' \u2014 ' + (error.data && error.data.localizedMessage || error.statusText);
		this.maDialogHelper.toastOptions({
			textTr: ['snmp.ui.errorReadingExistingOids', msg],
			classes: 'md-warn',
			hideDelay: 10000
		});
		return (this.existingOids = {});
	}.bind(this));
	
	return this.existingOidsPromise;
};

SNMPPointImportController.prototype.filterWalkResults = function() {
	if (!this.walkResults) return;

	var startIndex = (this.walkResultTable.page - 1) * this.walkResultTable.limit;
	var endIndex = startIndex + this.walkResultTable.limit;

    var valueRegExp = this.valueFilter && new RegExp(this.valueFilter, 'i');
	var symbolRegExp = this.symbolFilter && new RegExp(this.symbolFilter, 'i');
    var descriptionRegExp = this.descriptionFilter && new RegExp(this.descriptionFilter, 'i');
	
	var filtered = this.walkResults.filter((row) => {
		row.existingXid = this.existingOids[row.oid];
		
		const oidIndex = row.oid.split('.').pop();
		row.symbolWithIndex = `${row.symbol} ${oidIndex}`;

        if (this.oidFilter && (!row.oid || row.oid.indexOf(this.oidFilter) !== 0)) {
            return false;
        }
        if (valueRegExp && !valueRegExp.test(row.currentValue)) {
            return false;
        }
		if (symbolRegExp && !symbolRegExp.test(row.symbol)) {
			return false;
		}
		if (descriptionRegExp && !descriptionRegExp.test(row.description)) {
			return false;
		}
		
		return !this.hideExistingOids || !row.existingXid;
	});
	
	this.walkResultTable.total = filtered.length;

	var ordered;
	if (this.walkResultTable.order === 'oid') {
		ordered = filtered.sort(sortByOid);
	} else {
		ordered = this.$filter('orderBy')(filtered, this.walkResultTable.order);
	}
	
	this.filteredWalkResults = ordered.slice(startIndex, endIndex);
};

SNMPPointImportController.prototype.generatePoints = function() {
	this.mangoPoints = this.selectedOids.map(this.snmpToMangoPoint.bind(this));
	this.orderPoints();
};

SNMPPointImportController.prototype.snmpToMangoPoint = function(oidInfo) {
	var mangoPoint = {};
	Object.keys(this.columns).forEach(function(columnName) {
		mangoPoint[columnName] = this.extractValueFromColumn(oidInfo, columnName);
	}.bind(this));

	mangoPoint.oid = oidInfo.oid;
	if (!mangoPoint.name) {
		mangoPoint.name = oidInfo.oid;
	}
	if (!mangoPoint.deviceName) {
		// set to null not empty string so REST API sets it to the data source name
		mangoPoint.deviceName = null;
	}
	mangoPoint.currentValue = oidInfo.currentValue;

	var dataTypeInfo = this.dataTypeMap[oidInfo.variableSyntax];
	mangoPoint.setType = mangoPoint.settable ? dataTypeInfo.setType : 'NONE';
	if (!mangoPoint.dataType) {
		mangoPoint.dataType = dataTypeInfo.dataType;
	}

	return mangoPoint;
};

SNMPPointImportController.prototype.extractValueFromColumn = function(oidInfo, columnName) {
	var columnInfo = this.columns[columnName];
	if (columnInfo.column == null) {
		return columnInfo.replace || '';
	}
	
	var wholeValue = oidInfo[columnInfo.column] || '';
	var regex = new RegExp(columnInfo.regex || '.*');
	var matches = regex.exec(wholeValue);
	
	var result;
	if (!matches) {
		result = '';
	} else if (!columnInfo.replace) {
		result = matches[0];
	} else {
		result = matches[0].replace(regex, columnInfo.replace);
	}
	
	return columnInfo.boolean ? !!result : result;
	
//	return columnInfo.replace.replace(/\\(100|[0-9]{1,2})/g, function(match, number, offset, str) {
//		if (str[offset-1] === '\\') return match;
//		return matches[parseInt(number)] || match;
//	});
};

SNMPPointImportController.prototype.checkExistingPoints = function() {
	this.existingPointsChecked = false;
	
	this.existingOidsPromise.then(function(ids) {
		this.mangoPoints.forEach(function(pt) {
			pt.newXid = pt.xid;
			delete pt.originalXid;
			delete pt.status;
			delete pt.statusText;
			delete pt.skip;
			
			var existingXid = ids[pt.oid];
			if (existingXid) {
				pt.originalXid = existingXid;
				
				switch(this.existingIdStrategy) {
				case 'UPDATE_KEEP_XID':
					pt.newXid = existingXid;
					break;
				case 'UPDATE':
					break;
				case 'SKIP':
					pt.newXid = '';
					pt.skip = true;
					break;
				}
			}
		}.bind(this));
		this.existingPointsChecked = true;
	}.bind(this));
};

SNMPPointImportController.prototype.createPoints = function(event) {
	this.createPointsPromise = this.$q.resolve();
	delete this.cancelCreatePoints;
	this.progress = 0;
	this.hasResults = true;
	
	this.mangoPoints.forEach(function(pt, index) {
		this.createPointsPromise = this.createPointsPromise.then(this.createMangoPoint.bind(this, pt));
	}.bind(this));
	
	this.createPointsPromise.finally(function() {
		delete this.createPointsPromise;
		this.refreshExistingOids().then(this.filterWalkResults.bind(this));
	}.bind(this));
};

SNMPPointImportController.prototype.createMangoPoint = function(flatPoint) {
	if (this.cancelCreatePoints) {
		delete this.cancelCreatePoints;
		return this.$q.reject();
	}
	
	if (flatPoint.skip) {
		flatPoint.status = {
			skipped: true
		};
		flatPoint.statusText = 'skipped';
		
		// remove skipped points from the selection
		this.removeOidFromSelected(flatPoint.oid);
		
		this.progress++;
		return this.$q.resolve();
	}
	
	var point = new this.maPoint();
	var pointPromise;
	if (flatPoint.originalXid) {
		point.xid = flatPoint.originalXid;
		pointPromise = point.$get();
	} else {
		var templateXid;
		switch(flatPoint.dataType) {
		case 'BINARY': templateXid = 'Binary_Default'; break;
		case 'NUMERIC': templateXid = 'Numeric_Default'; break;
		case 'ALPHANUMERIC': templateXid = 'Alphanumeric_Default'; break;
		case 'MULTISTATE': templateXid = 'Multistate_Default'; break;
		}
		
		pointPromise = this.$q.resolve(angular.merge(point, {
			templateXid: templateXid,
			chartColour: '',
			textRenderer: {
				type: 'textRendererPlain',
				unit: '',
				renderedUnit: '',
				useUnitAsSuffix: true
			},
			enabled: true
		}));
	}
	
	return pointPromise.then(function(point) {
		return angular.merge(point, {
			xid: flatPoint.newXid || null,
			originalXid: flatPoint.originalXid,
			dataSourceXid: this.dataSourceXid,
			name: flatPoint.name,
			deviceName: flatPoint.deviceName,
			pointLocator: {
				modelType: 'PL.SNMP',
				dataType: flatPoint.dataType,
				oid: flatPoint.oid,
				setType: flatPoint.setType
			},
			unit: flatPoint.unit
		});
	}.bind(this)).then(function(point) {
		if (point.originalXid) {
			return point.$update({xid: point.originalXid});
		} else {
			return point.$save();
		}
	}).then(function(point) {
		flatPoint.newXid = point.xid;
		
		flatPoint.status = {
			created: !flatPoint.originalXid,
			updated: !!flatPoint.originalXid
		};
		flatPoint.statusText = flatPoint.originalXid ? 'updated' : 'created';
		
		// remove successfully created/updated points from the selection
		this.removeOidFromSelected(flatPoint.oid);

		this.progress++;
		//return this.$timeout(angular.noop, 500);
	}.bind(this), function(error) {
		var errorMsg;
		if (error.status === 422 && error.data && error.data.validationMessages && error.data.validationMessages[0]) {
			var validationError = error.data.validationMessages[0];
			errorMsg = validationError.message;
			if (validationError.property) {
				errorMsg += ' \u2014 ' + validationError.property;
			}
		} else {
			errorMsg = (error.data && error.data.localizedMessage) ||
				error.headers('errors') || 'Error';
		}
		
		flatPoint.status = {
			error: errorMsg
		};
		flatPoint.statusText = errorMsg;
		this.progress++;
		//return this.$timeout(angular.noop, 500);
	}.bind(this));
};

SNMPPointImportController.prototype.removeOidFromSelected = function(oid) {
	for (var i = 0; i < this.selectedOids.length; i++) {
		if (this.selectedOids[i].oid === oid) {
			this.selectedOids.splice(i, 1);
			break;
		}
	}
};

SNMPPointImportController.prototype.startOver = function() {
	this.hasResults = null;
	if (!this.selectedOids.length) {
		this.activeTab = 0;
	    this.generatePoints();
	} else {
	    this.mangoPoints = this.mangoPoints.filter(point => point.status.error);
	    this.orderPoints();
	}
    this.checkExistingPoints();
};

SNMPPointImportController.prototype.orderPoints = function() {
	if (this.pointOrder === 'oid') {
		this.orderedMangoPoints = this.mangoPoints.sort(sortByOid);
	} else {
		this.orderedMangoPoints = this.$filter('orderBy')(this.mangoPoints, this.pointOrder);
	}
};

function sortByOid(a, b) {
	var oidA = a.oid.split('.');
	var oidB = b.oid.split('.');
	for (var i = 0; i < oidA.length; i++) {
		if (oidB[i] == null) return 1;
		
		var partA = parseInt(oidA[i], 10);
		var partB = parseInt(oidB[i], 10);
		if (partA < partB) return -1;
		if (partA > partB) return 1;
	}
	return 0;
}

return snmpPointImport;

}); // require
