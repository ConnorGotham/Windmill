/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define([
    'angular',
    'require',
    './components/modbusToolsComponent',
    './services/ModbusTools'
    ], function(angular, require, modbusToolsComponent, ModbusToolsFactory) {
'use strict';

return angular.module('maModbusModule', [])
.component('maModbusTools', modbusToolsComponent)
.factory('ma.ModbusTools', ModbusToolsFactory)
.factory('maModbusTools', ModbusToolsFactory);

}); // require
