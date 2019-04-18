/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular', 'require'], function(angular, require) {
'use strict';

var haystackPointImport = {
	templateUrl: require.toUrl('./haystackPointImport.html'),
	controller: HaystackPointImportController,
	bindings: {
		dataSourceXid: '@sourceXid'
	},
	designerInfo: {}
};

HaystackPointImportController.$inject = ['maHaystack', '$q', 'maPoint', '$timeout', 'maDialogHelper', '$scope'];
function HaystackPointImportController(maHaystack, $q, maPoint, $timeout, maDialogHelper, $scope) {
	this.maHaystack = maHaystack;
	this.$q = $q;
	this.maPoint = maPoint;
	this.$timeout = $timeout;
	this.maDialogHelper = maDialogHelper;
	
	$scope.$on('$destroy', function() {
		this.cancelCreatePoints = true;
	}.bind(this));
	
	this.limit = 100;
	this.selectedPoints = [];
	this.generatePoints = this.generatePoints.bind(this);
	this.columns = {
		haystackId: {
			column: 'id',
			regex: '^r:([^\\s]+)',
			replace: '$1'
		},
		deviceName: {
			column: null
		},
		name: {
			column: 'dis'
		},
		xid: {
			column: null
		},
		settable: {
			column: 'writable',
			regex: '^m:',
			boolean: true
		},
		unit: {
			column: 'unit'
		}
	};
	
	// UPDATE_KEEP_XID, UPDATE, SKIP
	this.existingIdStrategy = 'SKIP';
	this.hideExistingPoints = true;
}

HaystackPointImportController.prototype.$onInit = function() {
};

HaystackPointImportController.prototype.$onChanges = function(changes) {
	if (changes.dataSourceXid) {
		if (this.dataSourceXid) {
			this.refreshHaystackIds();
		}
		this.doQuery();
	}
};

HaystackPointImportController.prototype.refreshHaystackIds = function() {
	this.haystackIdsPromise = this.maHaystack.getHaystackIds(this.dataSourceXid).then(function(list) {
		var haystackIds = {};
		list.forEach(function(item) {
			haystackIds[item.haystackId] = item.pointXid;
		});
		return (this.haystackIds = haystackIds);
	}.bind(this), function(error) {
		this.maDialogHelper.toastOptions({
			textTr: 'haystack.ui.errorReadingExistingHaystackIds',
			classes: 'md-warn',
			hideDelay: 10000
		});
		return (this.haystackIds = {});
	}.bind(this));
	
	return this.haystackIdsPromise;
};

HaystackPointImportController.prototype.doQuery = function() {
	this.selectedPoints = [];
	this.mangoPoints = [];
	this.filteredHaystackRows = [];
	delete this.results;
	
	if (!this.dataSourceXid) return;
	
	var filter = 'point';
	if (this.filter) {
		filter += ' and ' + this.filter;
	}
	
	this.downloadUrlJson = this.maHaystack.getQueryUrl(this.dataSourceXid, filter, this.limit, 'application/json');
	this.downloadUrlCsv = this.maHaystack.getQueryUrl(this.dataSourceXid, filter, this.limit, 'text/csv');
	this.downloadUrlZinc = this.maHaystack.getQueryUrl(this.dataSourceXid, filter, this.limit, 'text/plain');
	
	this.haystackIdsPromise.then(function() {
		this.haystackQueryPromise = this.maHaystack.query(this.dataSourceXid, filter, this.limit).then(function(data) {
			delete this.haystackQueryPromise;
			
			this.results = data;
			this.filterHaystackRows();
		}.bind(this), function(error) {
			delete this.haystackQueryPromise;
			
			var msg = 'HTTP ' + error.status + ' \u2014 ' + (error.data && error.data.localizedMessage || error);
			this.maDialogHelper.toastOptions({
				textTr: ['haystack.ui.errorQueryingHaystack', msg],
				classes: 'md-warn',
				hideDelay: 10000
			});
			return (this.haystackIds = {});
		}.bind(this));
	}.bind(this));
};

HaystackPointImportController.prototype.filterHaystackRows = function() {
	if (!this.results) return;
	
	this.filteredHaystackRows = this.results.rows.filter(function(row) {
		var id = this.extractValueFromColumn(row, 'haystackId');
		row.existingXid = this.haystackIds[id];
		
		return !this.hideExistingPoints || !row.existingXid;
	}.bind(this));
};

HaystackPointImportController.prototype.generatePoints = function() {
	this.mangoPoints = this.selectedPoints.map(this.haystackToMangoPoint.bind(this));
};

HaystackPointImportController.prototype.haystackToMangoPoint = function(haystackPoint) {
	var mangoPoint = {};
	Object.keys(this.columns).forEach(function(columnName) {
		mangoPoint[columnName] = this.extractValueFromColumn(haystackPoint, columnName);
	}.bind(this));

	var kind = haystackPoint.kind;
	if (kind) {
		switch (kind) {
		case 'Bool': mangoPoint.dataType = 'BINARY'; break;
		case 'Number': mangoPoint.dataType = 'NUMERIC'; break;
		case 'Str': mangoPoint.dataType = 'ALPHANUMERIC'; break;
		}
	}
	
	// kind should be set for all points but i'll leave the previous way of doing it
	// in here just in case
	if (!mangoPoint.dataType) {
		var curVal = haystackPoint.curVal;
		if (typeof curVal === 'boolean') {
			mangoPoint.dataType = 'BINARY';
		} else if (typeof curVal === 'string' && curVal.indexOf('n:') === 0) {
			mangoPoint.dataType = 'NUMERIC';
		} else if (typeof curVal === 'string') {
			mangoPoint.dataType = 'ALPHANUMERIC';
		}
	}

	return mangoPoint;
};

HaystackPointImportController.prototype.extractValueFromColumn = function(haystackPoint, columnName) {
	var columnInfo = this.columns[columnName];
	var wholeValue = '';
	if (columnInfo.column != null && haystackPoint[columnInfo.column]) {
		wholeValue = haystackPoint[columnInfo.column];
	}
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

HaystackPointImportController.prototype.checkExistingPoints = function() {
	this.existingPointsChecked = false;
	if (!this.haystackIdsPromise) return;
	
	this.haystackIdsPromise.then(function(ids) {
		this.mangoPoints.forEach(function(pt) {
			pt.newXid = pt.xid;
			delete pt.originalXid;
			delete pt.status;
			delete pt.skip;
			
			var existingXid = ids[pt.haystackId];
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

HaystackPointImportController.prototype.createPoints = function(event) {
	this.createPointsPromise = this.$q.resolve();
	delete this.cancelCreatePoints;
	this.progress = 0;
	this.hasResults = true;
	
	this.mangoPoints.forEach(function(pt, index) {
		this.createPointsPromise = this.createPointsPromise.then(this.createMangoPoint.bind(this, pt));
	}.bind(this));
	
	this.createPointsPromise.finally(function() {
		delete this.createPointsPromise;
		this.refreshHaystackIds().then(this.filterHaystackRows.bind(this));
	}.bind(this));
};

HaystackPointImportController.prototype.createMangoPoint = function(flatPoint) {
	if (this.cancelCreatePoints) {
		delete this.cancelCreatePoints;
		return this.$q.reject();
	}
	
	if (flatPoint.skip) {
		flatPoint.status = {
			skipped: true
		};
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
				modelType: 'PL.HAYSTACK',
				dataType: flatPoint.dataType,
				id: flatPoint.haystackId
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
		this.progress++;
		//return this.$timeout(angular.noop, 500);
	}.bind(this));
};

HaystackPointImportController.prototype.createPointsForHistoryImport = function() {
	this.pointsForHistoryImport = this.mangoPoints.filter(function(pt) {
		return pt.status && pt.status.created;
	}).map(function(pt) {
		return pt.newXid;
	});
};

return haystackPointImport;

}); // require
