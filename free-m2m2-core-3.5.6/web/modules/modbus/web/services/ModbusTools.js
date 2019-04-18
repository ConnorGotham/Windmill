/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['require', 'angular'], function(require, angular) {
'use strict';

ModbusToolsFactory.$inject = ['$http', '$q', '$timeout', 'maUtil'];
function ModbusToolsFactory($http, $q, $timeout, Util) {
    var MODBUS_TOOLS_URL = '/rest/v1/modbus';

    function ScanStatus(location) {
        this.location = location;
    }
    
    ScanStatus.prototype.get = function() {
        return $http({
            method: 'GET',
            url: this.location,
            headers: {
                'Accept': 'application/json'
            },
            cache: false
        }).then(function(response) {
            angular.extend(this, response.data);
            return this;
        }.bind(this));
    };

    ScanStatus.prototype.cancel = function() {
        if (this.loopGetPromise)
            $timeout.cancel(this.loopGetPromise);
        if (this.scanProgress)
            this.scanProgress.reject();
        
        if (this.progress !== 100) {
            this.cancelled = true;
            
            return $http({
                method: 'PUT',
                data: {cancel: true},
                url: this.location,
                headers: {
                    'Accept': 'application/json'
                },
                cache: false
            }).then(function(response) {
                angular.extend(this, response.data);
                return this;
            }.bind(this));
        }
    };
    
    ScanStatus.prototype.getUntilComplete = function() {
        var _this = this;
        
        if (this.scanProgress)
            return this.scanProgress.promise;
        
        this.scanProgress = $q.defer();
        loopGet();
        return this.scanProgress.promise;
        
        function loopGet() {
            _this.get().then(function() {
                if (_this.progress === 100) {
                    _this.scanProgress.resolve(_this);
                } else {
                    _this.scanProgress.notify(_this);
                    _this.loopGetPromise = $timeout(loopGet, 1000, false);
                }
            });
        }
    };

    function ModbusTools(options) {
        angular.copy(options, this);
    }
    
    ModbusTools.prototype.scan = function(getUntilComplete, asPromise) {
        var status = new ScanStatus();
        
        var protocol = this.connection.host ? 'ip' : 'serial';
        status.$promise = $http({
            method: 'POST',
            url: MODBUS_TOOLS_URL + '/' + protocol + '/scan',
            headers: {
                'Accept': 'application/json'
            },
            data: this.connection,
            cache: false
        }).then(function(response) {
            status.location = response.headers('Location');
            if (getUntilComplete)
                return status.getUntilComplete();
            return status;
        });
        
        return asPromise ? status.$promise : status;
    };
    
    ModbusTools.prototype.readOptionsToRequestData = function(options) {
        var requestData = {
            configuration: this.connection,
            slaveId: options.slaveId,
            range: options.range,
            offset: options.offset,
            length: options.length
        };
        
        if (options.addressRange) {
            requestData.offset = options.addressRange[0];
            requestData.length = options.addressRange[1] - options.addressRange[0] + 1;
        }

        if (this.oneBased) {
            requestData.offset--;
        }

        return requestData;
    };

    /*
     * Reads the modbus data as an array of strings
     */
    ModbusTools.prototype.readAsStrings = function(options) {
        if (!angular.isObject(options)) throw new Error('Requires an options parameter');
        
        var requestData = this.readOptionsToRequestData(options);
        var protocol = this.connection.host ? 'ip' : 'serial';
        return $http({
            method: 'POST',
            url: MODBUS_TOOLS_URL + '/' + protocol + '/read',
            headers: {
                'Accept': 'application/json'
            },
            data: requestData,
            cache: false
        }).then(function(response) {
            return response.data;
        });
    };

    /*
     * Reads the modbus data as a ModbusData object
     */
    ModbusTools.prototype.read = function(options) {
        if (!angular.isObject(options)) throw new Error('Requires an options parameter');
        
        var requestData = this.readOptionsToRequestData(options);

        var modbusData = new ModbusData({
            slaveId: options.slaveId,
            range: options.range,
            offset: this.oneBased ? requestData.offset + 1 : requestData.offset,
            swapWords: this.swapWords,
            littleEndian: this.littleEndian,
            viewType: options.viewType
        });
        
        var protocol = this.connection.host ? 'ip' : 'serial';
        modbusData.$promise = $http({
            method: 'POST',
            url: MODBUS_TOOLS_URL + '/' + protocol + '/read-raw',
            headers: {
                'Accept': 'application/json'
            },
            data: requestData,
            cache: false
        }).then(function(response) {
            delete modbusData.$promise;
            modbusData.setArray(response.data.data);
            return modbusData;
        }.bind(this));
        
        return options.asPromise ? modbusData.$promise : modbusData;
    };

    /*
     * Writes a ModbusData object to the modbus registers
     */
    ModbusTools.prototype.write = function(data) {
        if (!angular.isObject(data)) throw new Error('Requires a data parameter');

        var requestData = {
            configuration: this.connection,
            slaveId: data.slaveId,
            range: data.range,
            offset: this.oneBased ? data.offset - 1 : data.offset,
            data: data.array
        };
        var protocol = this.connection.host ? 'ip' : 'serial';
        return $http({
            method: 'POST',
            url: MODBUS_TOOLS_URL + '/' + protocol + '/write-raw',
            headers: {
                'Accept': 'application/json'
            },
            data: requestData,
            cache: false
        }).then(function(response) {
            var bytesWritten = response.data;
            if (bytesWritten !== data.array.length) {
                return $q.reject('Tried to write ' + data.array.length + ' bytes, only wrote ' + bytesWritten);
            }
            return bytesWritten;
        }.bind(this));
    };

    ModbusTools.prototype.newModbusData = function(slaveId, range, address, length, viewType) {
        if (angular.isArray(address)) {
            length = address[1] - address[0] + 1;
            address = address[0];
        }

        var array = [];
        for (var i = 0; i < length; i++)
            array.push(0);

        return new ModbusData({
            array: array,
            slaveId: slaveId,
            range: range,
            offset: address,
            oneBased: this.oneBased,
            swapWords: this.swapWords,
            littleEndian: this.littleEndian,
            viewType: viewType
        });
    };

    /*
     * ModbusData - Wraps an array and allows access based on register addresses
     */
    function ModbusData(options) {
        if (!angular.isObject(options)) throw new Error('Requires an options parameter');
        
        angular.copy(options, this);
        if (options.array) {
            this.setArray(options.array);
        }
    }
    
    ModbusData.prototype.setArray = function(array) {
        this.array = array;
        this.toView();
    };
    
    ModbusData.prototype.isBinary = function() {
        return this.range === 'COIL_STATUS' || this.range === 'INPUT_STATUS';
    };
    
    ModbusData.prototype.wordsPerViewItem = function() {
        var bits = this.viewType.slice(-2);
        var wordsPerItem;
        if (bits === '64') wordsPerItem = 4;
        else if (bits === '32') wordsPerItem = 2;
        else wordsPerItem = 1;
        return wordsPerItem;
    };
    
    ModbusData.prototype.toView = function() {
        if (this.viewType && !this.isBinary()) {
            var wordsPerItem = this.wordsPerViewItem();
            
            this.view = [];
            for (var i = 0; (i + wordsPerItem - 1) < this.array.length; i = i + wordsPerItem) {
                this.view.push(this['get' + this.viewType](this.offset + i));
            }
            return this.view;
        }
    };
    
    ModbusData.prototype.fromView = function() {
        if (this.viewType && this.view && !this.isBinary()) {
            var wordsPerItem = this.wordsPerViewItem();
            
            for (var i = 0; i < this.view.length; i++) {
                this['set' + this.viewType](this.offset + i * wordsPerItem, this.view[i]);
            }
        }
        return this;
    };

    ModbusData.prototype.slice = function(address, length) {
        if (angular.isArray(address)) {
            length = address[1] - address[0] + 1;
            address = address[0];
        }

        var sliceStartIndex = address - this.offset;
        
        return new ModbusData({
            array: this.array.slice(sliceStartIndex, sliceStartIndex + length),
            slaveId: this.slaveId,
            range: this.range,
            offset: address,
            swapWords: this.swapWords,
            littleEndian: this.littleEndian,
            viewType: this.viewType
        });
    };
    
    ModbusData.prototype.swap2Words = function(array) {
        array = array || this.array;
        if (array.length % 2 !== 0)
            throw new Error('Array length must be a multiple of 2');
        for (var i = 0; i < array.length; i = i + 2) {
            var words = array.slice(i, i + 2);
            array[i] = words[1];
            array[i+1] = words[0];
        }
        return array;
    };
    
    ModbusData.prototype.swap4Words = function(array) {
        array = array || this.array;
        if (array.length % 4 !== 0)
            throw new Error('Array length must be a multiple of 4');
        for (var i = 0; i < array.length; i = i + 4) {
            var words = array.slice(i, i + 4);
            array[i] = words[3];
            array[i+1] = words[2];
            array[i+2] = words[1];
            array[i+3] = words[0];
        }
        return array;
    };
    
    ModbusData.prototype.getBit = function(address) {
        if (!this.array) return undefined;
        return this.array[address - this.offset];
    };
    
    ModbusData.prototype.setBit = function(address, value) {
        if (!this.array) return undefined;
        this.array[address - this.offset] = value ? 1 : 0;
        return this;
    };
    
    ModbusData.prototype.getInt16 = function(address) {
        if (!this.array) return undefined;
        return this.get16Bits(address).getInt16(0, this.littleEndian);
    };
    
    ModbusData.prototype.setInt16 = function(address, value) {
        if (!this.array) return undefined;
        var dataView = this.newDataView(16);
        dataView.setInt16(0, value, this.littleEndian);
        this.set16Bits(address, dataView);
        return this;
    };
    
    ModbusData.prototype.getUint16 = function(address) {
        if (!this.array) return undefined;
        return this.get16Bits(address).getUint16(0, this.littleEndian);
    };
    
    ModbusData.prototype.setUint16 = function(address, value) {
        if (!this.array) return undefined;
        var dataView = this.newDataView(16);
        dataView.setUint16(0, value, this.littleEndian);
        this.set16Bits(address, dataView);
        return this;
    };

    ModbusData.prototype.getInt32 = function(address) {
        if (!this.array) return undefined;
        return this.get32Bits(address).getInt32(0, this.littleEndian);
    };
    
    ModbusData.prototype.setInt32 = function(address, value) {
        if (!this.array) return undefined;
        var dataView = this.newDataView(32);
        dataView.setInt32(0, value, this.littleEndian);
        this.set32Bits(address, dataView);
        return this;
    };
    
    ModbusData.prototype.getUint32 = function(address) {
        if (!this.array) return undefined;
        return this.get32Bits(address).getUint32(0, this.littleEndian);
    };
    
    ModbusData.prototype.setUint32 = function(address, value) {
        if (!this.array) return undefined;
        var dataView = this.newDataView(32);
        dataView.setUint32(0, value, this.littleEndian);
        this.set32Bits(address, dataView);
        return this;
    };
    
    ModbusData.prototype.getFloat32 = function(address) {
        if (!this.array) return undefined;
        return this.get32Bits(address).getFloat32(0, this.littleEndian);
    };
    
    ModbusData.prototype.setFloat32 = function(address, value) {
        if (!this.array) return undefined;
        var dataView = this.newDataView(32);
        dataView.setFloat32(0, value, this.littleEndian);
        this.set32Bits(address, dataView);
        return this;
    };
    
    ModbusData.prototype.getFloat64 = function(address) {
        if (!this.array) return undefined;
        return this.get64Bits(address).getFloat64(0, this.littleEndian);
    };
    
    ModbusData.prototype.setFloat64 = function(address, value) {
        if (!this.array) return undefined;
        var dataView = this.newDataView(64);
        dataView.setFloat64(0, value, this.littleEndian);
        this.set64Bits(address, dataView);
        return this;
    };
    
    ModbusData.prototype.getAsciiString = function(address, byteLength) {
        if (!this.array) return undefined;
        var numRegisters = Math.ceil(byteLength / 2);
        var buffer = new ArrayBuffer(numRegisters * 2);
        var dataView = new DataView(buffer);
        
        for (var i = 0; i < numRegisters; i++) {
            dataView.setInt16(i*2, this.array[address - this.offset + i], this.littleEndian);
        }
        
        var byteArray = new Uint8Array(buffer, 0, byteLength);
        return String.fromCharCode.apply(null, byteArray);
    };
    
    ModbusData.prototype.setAsciiString = function(address, value) {
        if (!this.array) return undefined;
        var byteLength = value.length;
        var numRegisters = Math.ceil(byteLength / 2);
        var buffer = new ArrayBuffer(numRegisters * 2);
        var dataView = new DataView(buffer);
        
        for (var i = 0; i < byteLength; i++) {
            dataView.setUint8(i, value.charCodeAt(i));
        }
        
        for (i = 0; i < numRegisters; i++) {
            this.array[address - this.offset + i] = dataView.getInt16(i*2, this.littleEndian);
        }
    };

    ModbusData.prototype.newDataView = function(bits) {
        var buffer = new ArrayBuffer(bits / 8);
        return new DataView(buffer);
    };
    
    ModbusData.prototype.get16Bits = function(address) {
        var dataView = this.newDataView(16);
        dataView.setInt16(0, this.array[address - this.offset]);
        return dataView;
    };
    
    ModbusData.prototype.set16Bits = function(address, buffer) {
        this.array[address - this.offset] = buffer.getInt16(0);
    };
    
    ModbusData.prototype.get32Bits = function(address) {
        var dataView = this.newDataView(32);
        if (this.swapWords) {
            dataView.setInt16(2, this.array[address - this.offset]);
            dataView.setInt16(0, this.array[address - this.offset + 1]);
        } else {
            dataView.setInt16(0, this.array[address - this.offset]);
            dataView.setInt16(2, this.array[address - this.offset + 1]);
        }
        return dataView;
    };
    
    ModbusData.prototype.set32Bits = function(address, buffer) {
        if (this.swapWords) {
            this.array[address - this.offset] = buffer.getInt16(2);
            this.array[address - this.offset + 1] = buffer.getInt16(0);
        } else {
            this.array[address - this.offset] = buffer.getInt16(0);
            this.array[address - this.offset + 1] = buffer.getInt16(2);
        }
    };
    
    ModbusData.prototype.get64Bits = function(address) {
        var dataView = this.newDataView(64);
        if (this.swapWords) {
            dataView.setInt16(6, this.array[address - this.offset]);
            dataView.setInt16(4, this.array[address - this.offset + 1]);
            dataView.setInt16(2, this.array[address - this.offset + 2]);
            dataView.setInt16(0, this.array[address - this.offset + 3]);
        } else {
            dataView.setInt16(0, this.array[address - this.offset]);
            dataView.setInt16(2, this.array[address - this.offset + 1]);
            dataView.setInt16(4, this.array[address - this.offset + 2]);
            dataView.setInt16(6, this.array[address - this.offset + 3]);
        }
        return dataView;
    };
    
    ModbusData.prototype.set64Bits = function(address, buffer) {
        if (this.swapWords) {
            this.array[address - this.offset] = buffer.getInt16(6);
            this.array[address - this.offset + 1] = buffer.getInt16(4);
            this.array[address - this.offset + 2] = buffer.getInt16(2);
            this.array[address - this.offset + 3] = buffer.getInt16(0);
        } else {
            this.array[address - this.offset] = buffer.getInt16(0);
            this.array[address - this.offset + 1] = buffer.getInt16(2);
            this.array[address - this.offset + 2] = buffer.getInt16(4);
            this.array[address - this.offset + 3] = buffer.getInt16(6);
        }
    };

    return ModbusTools;
}

return ModbusToolsFactory;

});
