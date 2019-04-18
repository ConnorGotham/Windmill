/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define([
    'angular',
    'require',
    './components/deviceConfigAdd/deviceConfigAdd'
    ], function(angular, require, deviceConfigAdd) {
'use strict';

var measurlogic = {
    identify: function(deviceInfo, modbusTools, deviceTypes, $q) {
        return modbusTools.read({
            slaveId: deviceInfo.slaveId,
            range: 'HOLDING_REGISTER',
            addressRange: [10003, 10016],
            asPromise: true
        }).then(function(data) {
            deviceInfo.registers.serial = data.getInt32(10003);
            deviceInfo.registers.fwVersion = data.getInt32(10009) * 0.0001;
            deviceInfo.registers.modelId = data.getInt32(10015);
            
            var deviceType = deviceTypes.find(function(deviceType) {
                return deviceType.modelId === deviceInfo.registers.modelId;
            });
            
            if (!deviceType) {
                return $q.reject();
            }
            
            angular.merge(deviceInfo, deviceType);
        });
    },
    readRegisters: function(modbusTools) {
        modbusTools.read({
            slaveId: this.slaveId,
            range: 'HOLDING_REGISTER',
            addressRange: [10003, 10016],
            asPromise: true
        }).then(function(data) {
            this.registers.serial = data.getInt32(10003);
            this.registers.fwVersion = data.getInt32(10009) * 0.0001;
            this.registers.modelId = data.getInt32(10015);
        }.bind(this));
        
        modbusTools.read({
            slaveId: this.slaveId,
            range: 'HOLDING_REGISTER',
            addressRange: [16001, 16046],
            asPromise: true
        }).then(function(data) {
            this.registerData = data;
            this.registers.voltagePrimary = data.getInt32(16001);
            this.registers.voltageSecondary = data.getInt32(16003);
            this.registers.currentPrimary = data.getInt32(16009);
            this.registers.currentSecondary = data.getInt32(16011);
            this.registers.enerPowDivider = data.getInt32(16045);
        }.bind(this));
    },
    writeRegisters: function(modbusTools) {
        this.registerData.setInt32(16001, this.registers.voltagePrimary);
        this.registerData.setInt32(16003, this.registers.voltageSecondary);
        this.registerData.setInt32(16009, this.registers.currentPrimary);
        this.registerData.setInt32(16011, this.registers.currentSecondary);
        this.registerData.setInt32(16045, this.registers.enerPowDivider);
        
        modbusTools.write(this.registerData);
    }
};

var dent = {
    identify: function(deviceInfo, modbusTools, deviceTypes, $q) {
        return modbusTools.read({
            slaveId: deviceInfo.slaveId,
            range: 'HOLDING_REGISTER',
            addressRange: [4201, 4210],
            asPromise: true
        }).then(function(data) {
            deviceInfo.registers.modelId = data.getAsciiString(4201, 10);
            deviceInfo.registers.serial = data.getAsciiString(4206, 10);
            
            var deviceType = deviceTypes.find(function(deviceType) {
                return deviceInfo.registers.modelId.indexOf(deviceType.modelId) === 0;
            });
            
            if (!deviceType) {
                return $q.reject();
            }
            
            angular.merge(deviceInfo, deviceType);
        });
    },
    readRegisters: function(modbusTools) {
        modbusTools.read({
            slaveId: this.slaveId,
            range: 'HOLDING_REGISTER',
            addressRange: [4201, 4210],
            asPromise: true
        }).then(function(data) {
            this.registers.modelId = data.getAsciiString(4201, 10);
            this.registers.serial = data.getAsciiString(4206, 10);
        }.bind(this)).then(function() {
            return modbusTools.read({
                slaveId: this.slaveId,
                range: 'HOLDING_REGISTER',
                addressRange: [4511, 4511],
                asPromise: true
            }).then(function(data) {
                this.registers.hwRevision = data.getUint16(4511);
            }.bind(this));
        }.bind(this)).then(function() {
            return modbusTools.read({
                slaveId: this.slaveId,
                range: 'HOLDING_REGISTER',
                addressRange: [4069, 4070],
                asPromise: true
            }).then(function(data) {
                var major = data.getUint16(4069);
                var minor = data.getUint16(4070);
                this.registers.fwVersion = major + '.' + minor;
            }.bind(this));
        }.bind(this)).then(function() {
            return modbusTools.read({
                slaveId: this.slaveId,
                range: 'HOLDING_REGISTER',
                addressRange: [4602, 4609],
                asPromise: true
            }).then(function(data) {
                this.configData = data;
                this.registers.dataScalar = data.getUint16(4602);
                this.registers.serviceType = data.getUint16(4607);
                this.registers.lineFrequency = data.getUint16(4609);
            }.bind(this));
        }.bind(this)).then(function() {
            return modbusTools.read({
                slaveId: this.slaveId,
                range: 'HOLDING_REGISTER',
                addressRange: [10104, 10104],
                asPromise: true
            }).then(function(data) {
                this.ct1Data = data;
                this.registers.ct1AmpsMultiplier = data.getUint16(10104);
            }.bind(this));
        }.bind(this)).then(function() {
            return modbusTools.read({
                slaveId: this.slaveId,
                range: 'HOLDING_REGISTER',
                addressRange: [10204, 10204],
                asPromise: true
            }).then(function(data) {
                this.ct2Data = data;
                this.registers.ct2AmpsMultiplier = data.getUint16(10204);
            }.bind(this));
        }.bind(this)).then(function() {
            return modbusTools.read({
                slaveId: this.slaveId,
                range: 'HOLDING_REGISTER',
                addressRange: [10304, 10304],
                asPromise: true
            }).then(function(data) {
                this.ct3Data = data;
                this.registers.ct3AmpsMultiplier = data.getUint16(10304);
            }.bind(this));
        }.bind(this)).then(function() {
            switch(this.registers.dataScalar) {
            case 0:
                this.powerScalar = 0.00001;
                this.ampScalar = 0.01;
                this.voltScalar = 0.1;
                break;
            case 1:
                this.powerScalar = 0.001;
                this.ampScalar = 0.1;
                this.voltScalar = 0.1;
                break;
            case 2:
                this.powerScalar = 0.01;
                this.ampScalar = 0.1;
                this.voltScalar = 0.1;
                break;
            case 3:
                this.powerScalar = 0.1;
                this.ampScalar = 0.1;
                this.voltScalar = 0.1;
                break;
            case 4:
                this.powerScalar = 1;
                this.ampScalar = 1;
                this.voltScalar = 1;
                break;
            case 5:
                this.powerScalar = 10;
                this.ampScalar = 1;
                this.voltScalar = 1;
                break;
            default:
                this.powerScalar = 100;
                this.ampScalar = 1;
                this.voltScalar = 1;
                break;
            }
        }.bind(this), function() {
            this.powerScalar = 0.1;
            this.ampScalar = 0.1;
            this.voltScalar = 0.1;
        }.bind(this));
    },
    writeRegisters: function(modbusTools) {
        this.configData.setUint16(4602, this.registers.dataScalar);
        this.configData.setUint16(4607, this.registers.serviceType);
        this.configData.setUint16(4609, this.registers.lineFrequency);
        this.ct1Data.setUint16(10104, this.registers.ct1AmpsMultiplier);
        this.ct2Data.setUint16(10204, this.registers.ct2AmpsMultiplier);
        this.ct3Data.setUint16(10304, this.registers.ct3AmpsMultiplier);
        
        modbusTools.write(this.configData.slice(4602,1)).then(function() {
            return modbusTools.write(this.configData.slice(4607,1));
        }.bind(this)).then(function() {
            return modbusTools.write(this.configData.slice(4609,1));
        }.bind(this)).then(function() {
            return modbusTools.write(this.ct1Data);
        }.bind(this)).then(function() {
            return modbusTools.write(this.ct2Data);
        }.bind(this)).then(function() {
            return modbusTools.write(this.ct3Data);
        }.bind(this));
    }
};

var MA_DEVICE_INTERFACES = {
    measurlogic: measurlogic,
    dent: dent
};

return angular.module('maDeviceConfigModule', ['maUiApp'])
.component('maDeviceConfigAdd', deviceConfigAdd)
.constant('MA_DEVICE_INTERFACES', MA_DEVICE_INTERFACES)
.config(['maUiMenuProvider', function(MenuProvider) {
    var menuItems = [{
        name: 'ui.settings.deviceConfig',
        url: '/device-config',
        template: '<ma-device-config-add></ma-device-config-add>',
        menuTr: 'deviceConfig.addDevice',
        menuIcon: 'add',
        weight: 900,
        resolve: {
            deviceConfig: ['maTranslate', function(Translate) {
                return Translate.loadNamespaces('deviceConfig');
            }]
        },
        permission: 'superadmin',
        menuHidden: true,
        showInUtilities: true
    }];
    MenuProvider.registerMenuItems(menuItems);
}]);

}); // require
