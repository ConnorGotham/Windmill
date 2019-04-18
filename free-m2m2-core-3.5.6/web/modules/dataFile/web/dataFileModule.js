/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Will Geller
 */

define([
    'angular',
    'require',
    './components/dataFileDataSourceImport/dataFileDataSourceImport',
    './services/dataFileDataSourceService'
    ], function(angular, require, dataFileDataSourceImport, dataFileDataSourceService) {
'use strict';

var dataFileDataSourceModule = angular.module('ma.dataFileDataSourceModule', []);

dataFileDataSourceModule
    .component('maDataFileDataSourceImport', dataFileDataSourceImport)
    .factory('dataFileDataSourceService', dataFileDataSourceService);

return dataFileDataSourceModule;

}); // require
