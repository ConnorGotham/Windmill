/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular',
	'require',
	'./components/haystackPointImport',
	'./components/haystackHistoryImport',
	'./services/haystackService'],
	function(angular, require, haystackPointImport, haystackHistoryImport, haystackService) {
'use strict';

return angular.module('maHaystack', ['maUiApp'])
.component('maHaystackPointImport', haystackPointImport)
.component('maHaystackHistoryImport', haystackHistoryImport)
.factory('maHaystack', haystackService)
.config(['maUiMenuProvider', function(maUiMenuProvider) {
    maUiMenuProvider.registerMenuItems([{
        name: 'ui.settings.haystackHistoryImport',
        url: '/haystack-history-import',
        templateUrl: require.toUrl('./haystackHistoryImportPage.html'),
        menuTr: 'header.haystackHistoryImport',
        menuIcon: 'label_outline',
        permission: 'superadmin',
        menuHidden: true,
        showInUtilities: true
    }, {
        name: 'ui.settings.haystackPointImport',
        url: '/haystack-point-import',
        templateUrl: require.toUrl('./haystackPointImportPage.html'),
        menuTr: 'header.haystackPointImport',
        menuIcon: 'label_outline',
        permission: 'superadmin',
        menuHidden: true,
        showInUtilities: true
    }]);
}]);

}); // require
