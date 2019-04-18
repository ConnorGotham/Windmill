/**
 * Copyright (C) 2015 Infinite Automation Systems, Inc. All rights reserved.
 * http://infiniteautomation.com/
 * @author Jared Wiltshire
 */

(function(root){

var loader;

var scriptTags = document.getElementsByTagName('script');
var scriptSuffix = '/resources/loaderConfig.js';
for (var i = scriptTags.length - 1; i >= 0; i--) {
    var script = scriptTags[i];
    var scriptSrc = script.getAttribute('src');
    if (!scriptSrc) continue;
    
    if (scriptSrc.indexOf(scriptSuffix) >= 0) {
        loader = script.getAttribute('data-loader') || 'RequireJS';
        break;
    }
}

var config = {
    baseUrl : '/resources',
    urlArgs: 'v=' + root.mangoLastUpgrade,
    paths: {
        'mango': 'mango-2.0',
        'mango/mobile': './mango/mobile',
        'jquery': 'jquery/jquery-1.11.2.min',
        'jquery-ui/jquery-ui': 'jquery-ui/jquery-ui.min',
        'bootstrap': 'bootstrap/js/bootstrap.min',
        'moment': 'moment-with-locales.min',
        'moment-timezone': 'moment-timezone-with-data.min',
        'es5-shim': 'es5-shim.min',
        'jstz': 'jstz-1.0.4.min',
        'jquery.mousewheel': 'jquery.mousewheel.min',
        'jquery.select2': 'select2/js/select2.full.min',
        'jquery.notify': 'notify-combined.min',
        'angular': 'angular.min',
        'angular-resource': 'angular-resource.min',
        // cant use as export.css then maps to export.min.css
        //'amcharts/plugins/export/export': 'amcharts/plugins/export/export.min',
        'amcharts/plugins/responsive/responsive': 'amcharts/plugins/responsive/responsive.min',
        'amcharts/plugins/dataloader/dataloader': 'amcharts/plugins/dataloader/dataloader.min',
        'amcharts/plugins/animate/animate': 'amcharts/plugins/responsive/animate.min'
    },
    shim: {
        "bootstrap" : {
            "deps" : ['jquery']
        },
        'amcharts/amcharts': {
            exports: 'AmCharts'
        },
        'amcharts/funnel': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/gauge': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/pie': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/radar': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/serial': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/xy': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/gantt': {
            deps: ['amcharts/serial'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/themes/chalk': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/themes/light': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/themes/dark': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/themes/black': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/themes/patterns': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/plugins/export/export': {
            deps: ['amcharts/amcharts',
                   'amcharts/plugins/export/libs/blob.js/blob',
                   'amcharts/plugins/export/libs/fabric.js/fabric.min',
                   'amcharts/plugins/export/libs/FileSaver.js/FileSaver.min',
                   'amcharts/plugins/export/libs/pdfmake/vfs_fonts',
                   'amcharts/plugins/export/libs/xlsx/xlsx.min']
        },
        'amcharts/plugins/export/libs/pdfmake/vfs_fonts': {
            deps: ['amcharts/plugins/export/libs/pdfmake/pdfmake.min']
        },
        'amcharts/plugins/export/libs/xlsx/xlsx.min': {
            deps: ['shims/amcharts/jszip_shim']
        },
        'amcharts/plugins/dataloader/dataloader': {
            deps: ['amcharts/amcharts']
        },
        'amcharts/plugins/animate/animate': {
            deps: ['amcharts/amcharts']
        },
        'amcharts/plugins/responsive/responsive': {
            deps: ['amcharts/amcharts']
        },
        'amcharts-3.13/exporting/amexport': {
            deps: ['amcharts-3.13/amcharts',
                   'amcharts-3.13/exporting/canvg',
                   'amcharts-3.13/exporting/filesaver',
                   'amcharts-3.13/exporting/jspdf',
                   'amcharts-3.13/exporting/jspdf.plugin.addimage',
                   'amcharts-3.13/exporting/rgbcolor']
        },
        'amcharts-3.13/exporting/filesaver': {
            deps: ['amcharts-3.13/amcharts']
        },
        'amcharts-3.13/exporting/jspdf.plugin.addimage': {
            deps: ['amcharts-3.13/exporting/jspdf']
        },
        'jquery.mousewheel': {"deps" : ['jquery']},
        'jquery.select2': {"deps" : ['jquery']},
        'jquery.notify': {"deps" : ['jquery']},
        'jquery-ui/jquery-ui': {"deps" : ['jquery']},
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-resource': {
            deps: ['angular']
        }
    },
    map: {
        '*': {
            'dgrid': 'dgrid-0.4'
        },
        'mango-2.0': {
            'amcharts': 'amcharts-3.13'
        }
    }
};

if (loader === 'RequireJS') {
    config.paths.dojo = 'amd/dojo';
    config.paths.dijit = 'amd/dijit';
    config.paths.dojox = 'amd/dojox';
    
    if (root.require && typeof root.require.config == 'function') {
    	// RequireJS already loaded, call config function
    	root.require.config(config);
    } else {
        // export config to global scope
    	root.require = config;
    }
}
else if (loader === 'Dojo') {
    config.tlmSiblingOfDojo = false;
    // load jquery before anything else so we can put it in noConflict mode
    config.deps = ['jquery', 'jquery.notify'];
    config.callback = function($) {
        // remove $ from the global scope, jQuery global is still available
        // $ is defined by DWR and is used in Mango legacy scripts
        $.noConflict();
    };
    // reconfigure dojo packages to point relative to baseUrl
    config.packages = [{
		name:'dojo',
		location:'./dojo'
	},{
		name:'dijit',
		location:'./dijit'
	},{
		name:'dojox',
		location:'./dojox'
	}];
    
    config.cacheBust = 'v=' + root.mangoLastUpgrade;

    config.paths['baseUrl'] = '.';
    config.paths['amcharts/amcharts'] = './shims/amcharts/amcharts';
    config.paths['amcharts/funnel'] = './shims/amcharts/funnel';
    config.paths['amcharts/gantt'] = './shims/amcharts/gantt';
    config.paths['amcharts/gauge'] = './shims/amcharts/gauge';
    config.paths['amcharts/pie'] = './shims/amcharts/pie';
    config.paths['amcharts/radar'] = './shims/amcharts/radar';
    config.paths['amcharts/serial'] = './shims/amcharts/serial';
    config.paths['amcharts/xy'] = './shims/amcharts/xy';
    config.paths['amcharts/themes/black'] = './shims/amcharts/themes/black';
    config.paths['amcharts/themes/chalk'] = './shims/amcharts/themes/chalk';
    config.paths['amcharts/themes/dark'] = './shims/amcharts/themes/dark';
    config.paths['amcharts/themes/light'] = './shims/amcharts/themes/light';
    config.paths['amcharts/plugins/export/export'] = './shims/amcharts/plugins/export/export';
    config.paths['amcharts-3.13/exporting/amexport'] = './shims/amcharts/exporting/amexport';
    config.paths['amcharts-3.13/exporting/filesaver'] = './shims/amcharts/exporting/filesaver';
    config.paths['amcharts-3.13/exporting/jspdf.plugin.addimage'] = './shims/amcharts/exporting/jspdf.plugin.addimage';
    
    config.paths['angular'] = './shims/angular';
    config.paths['angular-resource'] = './shims/angular-resource';

    if (typeof root.require == 'function') {
    	// dojo loader already loaded, call config function
    	root.require(config);
    } else {
    	// export dojoConfig to global scope
        root.dojoConfig = config;
    }
}

})(this); // execute anonymous function
