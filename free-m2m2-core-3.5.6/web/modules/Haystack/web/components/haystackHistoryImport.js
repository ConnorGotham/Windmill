/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular', 'require', 'moment-timezone', 'rql/query'], function(angular, require, moment, query) {
'use strict';

var haystackHistoryImport = {
	templateUrl: require.toUrl('./haystackHistoryImport.html'),
	controller: HaystackHistoryImportController,
	bindings: {
		dataSourceXid: '@sourceXid',
		selectedPointsInput: '<?selectedPoints',
		resetTableInput: '<?resetTable'
	},
	designerInfo: {}
};

HaystackHistoryImportController.$inject = ['maHaystack', 'maUser', 'maDialogHelper', 'maPoint', '$scope'];
function HaystackHistoryImportController(maHaystack, maUser, maDialogHelper, maPoint, $scope) {
	this.maHaystack = maHaystack;
	this.maDialogHelper = maDialogHelper;
	this.maPoint = maPoint;
	
	$scope.$on('$destroy', function() {
		if (this.tmpResource) {
			this.tmpResource.cancel();
		}
	}.bind(this));
	
    this.timezones = moment.tz.names();
    this.timezone = maUser.current.getTimezone();
    this.preset = 'LAST_1_MONTHS';

    this.total = '\u2026';
	this.dsPoints = [];
    this.selectedPoints = [];
    
    this.resetTable();
    
    // bind so mdDataTable can call it with correct context
    this.queryPoints = this.queryPoints.bind(this);
}

HaystackHistoryImportController.prototype.$onInit = function() {
};

HaystackHistoryImportController.prototype.$onChanges = function(changes) {
	if (changes.dataSourceXid) {
	    this.total = '\u2026';
		this.dsPoints = [];
	    this.selectedPoints = [];
	}
	if (changes.resetTableInput) {
		this.resetTable();
	}
	if ((changes.dataSourceXid || changes.selectedPointsInput) && this.dataSourceXid) {
		this.queryPoints();
	}
	if (changes.selectedPointsInput && this.selectedPointsInput && this.queryPromise) {
		this.queryPromise.then(function() {
			this.selectedPoints = this.selectedPointsInput;
		}.bind(this));
	}
};

HaystackHistoryImportController.prototype.resetTable = function() {
	this.queryOptions = {
        limit: 20,
        page: 1,
        order: 'xid'
    };
};

HaystackHistoryImportController.prototype.queryPoints = function() {
	if (this.queryPromise) {
		this.queryPromise.cancel();
    }
	
	var offset = (this.queryOptions.page - 1) * this.queryOptions.limit;
	var queryObj = new query.Query({name: 'and', args: [
		new query.Query({name: 'eq', args: ['dataSourceXid', this.dataSourceXid]}),
		new query.Query({name: 'sort', args: [this.queryOptions.order]}),
		new query.Query({name: 'limit', args: [this.queryOptions.limit, offset]})
	]});

    var pointQuery = this.maPoint.query({rqlQuery: queryObj.toString()});
    pointQuery.$promise.setCancel(pointQuery.$cancelRequest);
    
	this.queryPromise = pointQuery.$promise.then(function(points) {
		this.total = points.$total;
		return (this.dsPoints = points);
	}.bind(this));
};

HaystackHistoryImportController.prototype.timezoneChanged = function() {
	this.refresh = {};
};

HaystackHistoryImportController.prototype.doImport = function(event) {
	if (!this.from || !this.to || !this.dataSourceXid || this.tmpResource) return;
	
	var data = {};
	this.maDialogHelper.showBasicDialog(event, {
		contentTemplateUrl: require.toUrl('./haystackHistoryImportDialog.html'),
		data: data,
		showCancel: true,
		cancelDisabled: function() {
			if (!this.data.result) return false;
			return this.data.result.finished;
		},
		okDisabled: function() {
			if (!this.data.result) return true;
			return !this.data.result.finished;
		},
		titleTr: 'header.haystackHistoryImport'
	}).then(null, function(error) {
		if (!error && this.tmpResource) {
			this.tmpResource.cancel();
		}
	}.bind(this));
	
	this.maHaystack.historyImport(this.dataSourceXid, this.from, this.to, this.selectedPoints).then(function(tmpResource) {
		this.tmpResource = tmpResource;
		data.result = tmpResource.data;
		return tmpResource.refreshUntilFinished(500);
	}.bind(this)).then(function(finishedResult) {
		data.result = finishedResult;
		delete this.tmpResource;
	}.bind(this), function(httpError) {
		data.httpError = httpError;
		delete this.tmpResource;
	}.bind(this), function(progress) {
		data.result = progress;
	}.bind(this));
};

return haystackHistoryImport;

}); // require
