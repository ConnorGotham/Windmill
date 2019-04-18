/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular',
	'require',
	'./components/snmpPointImport',
	'./components/snmpScan',
    './components/snmpReadWrite',
	'./services/snmpService'],
	function(angular, require, snmpPointImport, snmpScan, snmpReadWrite, snmpService) {
'use strict';

return angular.module('maSNMP', ['maUiApp'])
.component('maSnmpPointImport', snmpPointImport)
.component('maSnmpScan', snmpScan)
.component('maSnmpReadWrite', snmpReadWrite)
.factory('maSNMP', snmpService)
.config(['maUiMenuProvider', function(maUiMenuProvider) {
    maUiMenuProvider.registerMenuItems([{
        name: 'ui.settings.snmp',
        url: '/snmp',
        templateUrl: require.toUrl('./snmpPointImportPage.html'),
        menuTr: 'header.snmpPointImport',
        menuIcon: 'router',
        resolve: {
            cssInject: ['maCssInjector', function(cssInjector) {
                cssInjector.injectLink(require.toUrl('./snmp.css'), 'snmpPageStyles');
            }]
        },
        permission: 'superadmin',
        menuHidden: true,
        showInUtilities: true
    }, {
    	name: 'ui.settings.snmp.scan',
        url: '/scan',
        views: {
        	'@ui.settings': {
        		templateUrl: require.toUrl('./snmpScanPage.html'),
        	}
        },
        menuTr: 'header.snmpScan'
    }]);
}]);

}); // require
