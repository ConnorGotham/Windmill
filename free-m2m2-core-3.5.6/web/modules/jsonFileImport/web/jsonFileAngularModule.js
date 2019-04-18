/**
 * @copyright 2017 {@link http://infiniteautomation.com|Infinite Automation Systems, Inc.} All rights reserved.
 * @author Jared Wiltshire
 */

define(['angular', 'require'], function(angular, require) {
'use strict';

return angular.module('maJsonFileImporter', ['maUiApp'])
.config(['maUiMenuProvider', function(maUiMenuProvider) {
    maUiMenuProvider.registerMenuItems([{
        name: 'ui.settings.system.jsonFileImporter',
        url: '/json-file-importer',
        templateUrl: require.toUrl('./settings.html'),
        menuTr: 'systemSettings.jsonfile.desc',
        menuHidden: true
    }]);
}]);

}); // require
