/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular', 'require'], function(angular, require) {
'use strict';

ModbusToolsController.$inject = ['ma.ModbusTools'];
function ModbusToolsController(ModbusTools) {
    this.modbusTools = new ModbusTools({
        connection: {
            type: 'MODBUS_IP',
            port: 502,
            timeout: 500,
            retries: 0,
            transport: 'TCP',
            encapsulated: false
        },
        oneBased: true,
        swapWords: false,
        littleEndian: false
    });
}

ModbusToolsController.prototype.$onChanges = function(changes) {
    if (changes.oneBased) this.modbusTools.oneBased = this.oneBased;
    if (changes.swapWords) this.modbusTools.swapWords = this.swapWords;
    if (changes.littleEndian) this.modbusTools.littleEndian = this.littleEndian;
    
    if (changes.type) this.modbusTools.connection.type = this.type;
    
    if (changes.host) this.modbusTools.connection.host = this.host;
    if (changes.port) this.modbusTools.connection.port = this.port;
    if (changes.timeout) this.modbusTools.connection.timeout = this.timeout;
    if (changes.retries) this.modbusTools.connection.retries = this.retries;
    if (changes.transport) this.modbusTools.connection.transport = this.transport;
    if (changes.encapsulated) this.modbusTools.connection.encapsulated = this.encapsulated;

    if (changes.commPortId) this.modbusTools.connection.commPortId = this.commPortId;
    if (changes.serialPort) this.modbusTools.connection.serialPort = this.serialPort;
    if (changes.baudRate) this.modbusTools.connection.baudRate = this.baudRate;
    if (changes.dataBits) this.modbusTools.connection.dataBits = this.dataBits;
    if (changes.parity) this.modbusTools.connection.parity = this.parity;
    if (changes.stopBits) this.modbusTools.connection.stopBits = this.stopBits;
};

ModbusToolsController.prototype.$onInit = function() {
    this.onInit({$tools: this.modbusTools});
};

return {
    controller: ModbusToolsController,
    bindings: {
        onInit: '&',
        
        oneBased: '<?',
        swapWords: '<?',
        littleEndian: '<?',

        type: '<?',
        
        host: '<?',
        port: '<?',
        timeout: '<?',
        retries: '<?',
        transport: '<?',
        encapsulated: '<?',
        
        commPortId: '<?',
        baudRate: '<?',
        dataBits: '<?',
        parity: '<?',
        stopBits: '<?'
    }
};

}); // define
