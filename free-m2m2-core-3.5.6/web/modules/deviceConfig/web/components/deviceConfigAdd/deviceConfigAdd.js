/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular', 'require', 'sha512'], function(angular, require, sha512) {
'use strict';

var DEFAULT_CONNECTION = {
    type: 'MODBUS_IP',

    host: '',
    port: 502,
    timeout: 500,
    retries: 0,
    transport: 'TCP',
    encapsulated: false,
    
    commPortId: '',
    baudRate: 9600,
    dataBits: 8,
    parity: 0,
    stopBits: 1,
    encoding: 'RTU'
};

DeviceConfigAddController.$inject = ['$http', '$templateRequest', '$interpolate', 'maDialogHelper', 'ma.ModbusTools', '$q', 'MA_DEVICE_INTERFACES', '$scope', 'maUtil'];
function DeviceConfigAddController($http, $templateRequest, $interpolate, maDialogHelper, ModbusTools, $q, MA_DEVICE_INTERFACES, $scope, Util) {
    this.$http = $http;
    this.$templateRequest = $templateRequest;
    this.$interpolate = $interpolate;
    this.maDialogHelper = maDialogHelper;
    this.$q = $q;
    this.MA_DEVICE_INTERFACES = MA_DEVICE_INTERFACES;
    $scope.Math = Math;
    
    this.modbusTools = new ModbusTools({
        connection: angular.copy(DEFAULT_CONNECTION),
        oneBased: true,
        swapWords: true,
        littleEndian: false
    });
    
    this.connection = this.modbusTools.connection;
    
    this.deviceConfig = {};
    this.baseUrl = function(path) {
    	return require.toUrl('.' + path);
    };
    this.selectedTab = 0;
    this.selectManual = false;
}

DeviceConfigAddController.prototype.$onInit = function() {
    this.$http.get(require.toUrl('../../devices/deviceTypes.json')).then(function(response) {
        this.deviceTypes = response.data;
        for (var i = 0; i < this.deviceTypes.length; i++) {
            var deviceType = this.deviceTypes[i];
            angular.merge(deviceType, this.MA_DEVICE_INTERFACES[deviceType.deviceInterface]);
        }
    }.bind(this));

    this.$templateRequest(require.toUrl('../../devices/dataSources.json')).then(function(text) {
        this.dataSourcesTemplate = text;
    }.bind(this));
};

DeviceConfigAddController.prototype.selectDevice = function(device, nextTab) {
    angular.merge(this.deviceConfig, device);
    this.deviceChanged();
    
    this.$templateRequest(require.toUrl('../../devices/' + device.jsonTemplateFile)).then(function(text) {
        this.deviceTemplate = text;
    }.bind(this));
    
    if (angular.isUndefined(nextTab) || nextTab)
        this.selectedTab++;
};

DeviceConfigAddController.prototype.interpolateJson = function() {
    if (this.templateVariablesForm.$invalid) {
        this.jsonString = '';
        return;
    }

    var dataPointsJson = this.$interpolate(this.deviceTemplate)(this.deviceConfig);
    var importObject = angular.fromJson(dataPointsJson);
    
    if (!this.dataSource) {
        var dsContext = angular.extend({
            dataSourceXid: this.deviceConfig.dataSourceXid,
            dataSourceName: this.deviceConfig.dataSourceName
        }, this.connection);
        var dataSourcesJson = this.$interpolate(this.dataSourcesTemplate)(dsContext);
        var dataSource = angular.fromJson(dataSourcesJson)[this.connection.type];
        importObject.dataSources = [dataSource];
    }

    this.jsonString = angular.toJson(importObject, 3);
};

DeviceConfigAddController.prototype.generateConnectionId = function() {
    var generatedId = [this.connection.type];
    if (this.connection.type === 'MODBUS_SERIAL') {
        generatedId.push(this.connection.commPortId.trim().toUpperCase());
    } else if (this.connection.type === 'MODBUS_IP') {
        generatedId.push(this.connection.host.trim().toUpperCase());
        generatedId.push(this.connection.port.toString());
    }
    var generatedIdString = generatedId.join('_');
    this.connectionId = sha512.sha512(generatedIdString).substr(0,12).toUpperCase();
};

DeviceConfigAddController.prototype.dataSourceSelected = function() {
    if (!this.useExistingDataSource) {
        this.dataSource = null;
    }
    var ds = this.dataSource;

    this.connection.host = '';
    this.connection.commPortId = '';
    
    if (ds && ds.modelType === 'MODBUS_IP') {
        this.connection.type = 'MODBUS_IP';
        this.connection.host = ds.host;
        this.connection.port = ds.port;
    } else if (ds && ds.modelType === 'MODBUS_SERIAL') {
        this.connection.type = 'MODBUS_SERIAL';
        this.connection.commPortId = ds.commPortId;
        this.connection.baudRate = ds.baudRate;
        this.connection.dataBits = ds.dataBits;
        this.connection.parity = ds.parity;
        this.connection.stopBits = ds.stopBits;
    }
    
    this.connectionChanged();
};

DeviceConfigAddController.prototype.scan = function() {
    if (this.scanStatus)
        this.scanStatus.cancel();
    this.scannedDevicesMap = {};
    this.scannedDevices = [];
    
    this.scanStatus = this.modbusTools.scan(true);
    this.scanStatus.$promise.then(null, null, function(status) {
        for (var i = 0; i < status.discoveredNodes.length; i++) {
            if (!this.scannedDevicesMap[status.discoveredNodes[i]]) {
                this.scanDevice(status.discoveredNodes[i]);
            }
        }
    }.bind(this));
};

DeviceConfigAddController.prototype.scanDevice = function(slaveId) {
    var deviceInfo = {
        slaveId: slaveId,
        registers: {}
    };
    this.scannedDevicesMap[slaveId] = deviceInfo;
    this.scannedDevices.push(deviceInfo);

    var promise = this.$q.reject();
    for (var key in this.MA_DEVICE_INTERFACES) {
        promise = promise.then(null, this.MA_DEVICE_INTERFACES[key].identify.bind(null, deviceInfo, this.modbusTools, this.deviceTypes, this.$q));
    }
};

DeviceConfigAddController.prototype.readRegisters = function() {
    this.deviceConfig.readRegisters(this.modbusTools);
    this.deviceConfigForm.$setPristine();
};

DeviceConfigAddController.prototype.writeRegisters = function() {
    this.deviceConfig.writeRegisters(this.modbusTools);
    this.deviceConfigForm.$setPristine();
};

DeviceConfigAddController.prototype.connectionChanged = function() {
    if (this.scanStatus)
        this.scanStatus.cancel();
    delete this.scanStatus;
    delete this.scannedDevicesMap;
    delete this.scannedDevices;
    
    this.generateConnectionId();
    
    if (this.dataSource) {
        this.deviceConfig.dataSourceXid = this.dataSource.xid;
        this.deviceConfig.dataSourceName = this.dataSource.name;
    } else {
        this.deviceConfig.dataSourceXid = 'DS_' + this.connectionId;
        this.deviceConfig.dataSourceName = '';
    }
    
    this.deviceChanged();
};

DeviceConfigAddController.prototype.deviceChanged = function() {
    this.deviceConfig.registers = {};
    
    if (!this.deviceConfig.dataSourceXid || !this.deviceConfig.slaveId) {
        this.deviceConfig.deviceId = '';
        return;
    }
    
    var deviceIdString = this.connectionId + '_' + this.deviceConfig.slaveId.toString();
    this.deviceConfig.deviceId = sha512.sha512(deviceIdString).substr(0,12).toUpperCase();
};

DeviceConfigAddController.prototype.save = function($event) {
    var data = angular.fromJson(this.jsonString);
    this.maDialogHelper.showConfigImportDialog(data, $event);
};

DeviceConfigAddController.prototype.nextStep = function() {
    this.selectedTab++;
};

DeviceConfigAddController.prototype.isNextDisabled = function() {
    switch(this.selectedTab) {
    case 0: return !this.connectionForm || this.connectionForm.$invalid;
    case 1: return !(this.deviceConfig.slaveId && this.deviceConfig.name);
    }
    return false;
};

DeviceConfigAddController.prototype.prevStep = function() {
    this.selectedTab--;
};

DeviceConfigAddController.prototype.isLastStep = function() {
    return this.selectedTab === 3;
};

return {
    templateUrl: require.toUrl('./deviceConfigAdd.html'),
    controller: DeviceConfigAddController,
    bindings: {
    }
};

}); // define
