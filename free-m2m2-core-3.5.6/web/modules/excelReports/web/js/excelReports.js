/**
 * Copyright (C) 2015 Infinite Automation Systems, Inc. All rights reserved.
 * http://infiniteautomation.com/
 * @author Jared Wiltshire
 */

require.config({
    map: {'*': {'mango': 'mango-2.0'}}
});

require(['jquery',
         'mango/api',
         'dojo/_base/declare',
         'dijit/form/FilteringSelect',
         'dijit/form/ComboBox',
         'dijit/form/ValidationTextBox',
         'dijit/form/CheckBox',
         'dijit/registry',
         'dgrid/OnDemandGrid',
         'dgrid/OnDemandList',
         'dgrid/extensions/DijitRegistry',
         'dgrid/Selection',
         'dgrid/Editor',
         'dstore/Memory',
         'dstore/RequestMemory',
         'dstore/Trackable',
         'dstore/legacy/DstoreAdapter',
         'dstore/RequestFixed',
         'dstore/Rest',
         'dstore/SimpleQuery',
         'moment-timezone',
         'view/GridAndEditor',
         'view/ItemEditor',
         'view/CronPicker',
         'view/BaseUIComponent',
         'infinite/AutoIdStore',
         'jquery.notify',
         'jquery.fileupload',
         'jquery-ui/jquery.datetimepicker'],
function($, MangoAPI, declare, FilteringSelect, ComboBox, ValidationTextBox, CheckBox, registry,
        OnDemandGrid, OnDemandList, DijitRegistry, Selection, Editor,
        Memory, RequestMemory, Trackable, DstoreAdapter, Request, Rest, SimpleQuery,
        moment, GridAndEditor, ItemEditor, CronPicker, BaseUIComponent, AutoIdStore) {
'use strict';

var tr;
var mangoAPI = MangoAPI.defaultApi;
var translationNamespaces = ['common', 'excelreports', 'mailingLists', 'filter'];
var templateEditor;
var user;
var finishedReportsComponent;

var Grid = declare([OnDemandGrid, DijitRegistry]);
var EditGrid = declare([OnDemandGrid, DijitRegistry, Editor]);
var SelectableEditGrid = declare([OnDemandGrid, DijitRegistry, Selection, Editor]);
var List = declare([OnDemandList, DijitRegistry]);
var SelectableGrid = declare([OnDemandGrid, DijitRegistry, Selection]);
var TrackedMemory = declare([Memory, Trackable]);
var TrackedAuto = declare([AutoIdStore, Trackable]);
var TrackedRest = declare([Rest, SimpleQuery, Trackable]);

var defaultTemplate = {
    timeSeries: [{
        dateRangeType: 'RELATIVE',
        periodCount: 1,
        periodType: 'MONTHS',
        rollup: 'NONE',
        rollupPeriod: {
            periods: 1,
            type: 'HOURS'
        },
        points: [],
        startTimestamp: moment().subtract(1, 'months').valueOf(),
        finishTimestamp: moment().valueOf()
    }],
    recipients: [],
    filename: '',
    allNamedRanges: [],
    scheduleCron: '0 0 0 1 * ?',
    schedule: true,
    email: false,
    postProcessingScript: "",
    emailModelScript: ""
};

var initiatorId = mangoAPI.generateInitiatorId();

var finishedReportsStore = new TrackedRest({
    target: '/rest/v1/excel-reports',
    headers: {
        initiatorId: initiatorId,
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'Content-Type': 'application/json'
    }
});

var reportTemplatesStore = new TrackedRest({
    target: '/rest/v1/excel-report-templates',
    headers: {
        initiatorId: initiatorId,
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'Content-Type': 'application/json'
    },
});

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

mangoAPI.registerForDaoNotifications('/rest/v1/websocket/excel-reports', finishedReportsStore, initiatorId);
mangoAPI.registerForDaoNotifications('/rest/v1/websocket/excel-report-templates', reportTemplatesStore, initiatorId);

var namedRangeStore = new TrackedMemory({
    data: [],
    idProperty: 'name'
});
var adaptedNamedRangeStore = new DstoreAdapter(namedRangeStore);

var mailingListStore = new DstoreAdapter(new TrackedRest({
    target: '/rest/v1/mailing-lists',
    idProperty: 'xid'
}));

var userStore = new DstoreAdapter(new TrackedRest({
    target: '/rest/v1/users',
    idProperty: 'username'
}));

var timeSeriesStore = new TrackedAuto({data: []});
var recipientsStore = new TrackedAuto({data: []});

var pointSummaryStore = new Request({
    target: '/rest/v1/data-point-summaries',
    idProperty: 'xid'
});

var sortedPointSummaryStore = pointSummaryStore.sort([
    { property: 'deviceName', descending: false},
    { property: 'name', descending: false}
]);

var emailTemplateStore = new DstoreAdapter(new RequestMemory({
    target: '/rest/v1/excel-report-templates/email-templates',
    idProperty: 'name'
}));

$.when(mangoAPI.getCurrentUser(),
        mangoAPI.setupGlobalize.apply(mangoAPI, translationNamespaces),
        mangoAPI.setDefaultTimezone('user'))
.done(function(_user, Globalize) {
    user = _user;
    tr = Globalize.tr.bind(Globalize);
    $(document).ready(function() {
        require(['bootstrap'], setupPage);
    });
}).fail(MangoAPI.logError);

function setupPage() {
    // add a dojo dijit style class to body
    $('body').addClass('claro');
    
    $(document).on('keydown keyup', function (event) {
        if (event.keyCode === 17) {
            if (event.type === 'keyup') {
                $('.ctrl-active').removeClass('ctrl-active');
            } else {
                $('.dgrid-selected').addClass('ctrl-active');
            }
        }
    });
    
    var finishedReportsGrid = new SelectableEditGrid({
        collection: finishedReportsStore,
        loadingMessage: tr('common.loading'),
        noDataMessage: tr('excelreports.noInstances'),
        renderRow: function(item, options) {
            // add a css class to each row corresponding to the type
            // so we can show and hide columns in CSS file depending on type
            var row = SelectableEditGrid.prototype.renderRow.apply(this, arguments);
            var cssClass= 'state-';
            switch(item.state) {
            case 'FAILED':
                var error = tr('excelreports.failureReason', item.errorMessage);
                cssClass += 'failed';
                var $tr = $('<tr>').addClass('error-message').appendTo($(row).find('table'));
                $('<td>', {colspan: 9}).text(error).appendTo($tr);
                break;
            case 'QUEUED': cssClass += 'queued'; break;
            case 'FINISHED': cssClass += 'finished'; break;
            case 'REPORT_STATE_EMAIL_FAILED': cssClass += 'email-failed'; break;
            case 'RUNNING': cssClass += 'running'; break;
            }
            $(row).addClass(cssClass);
            return row;
        },
        _showEditor: function(cmp, column, cellElement, value) {
            var result = SelectableEditGrid.prototype._showEditor.apply(this, arguments);
            if (column.field === 'readPermission') {
                var $cell = $(cellElement);
                var title = tr('common.choosePermissions');
                var $img = $('<img>', {
                    src: '/images/bullet_down.png',
                    title: title,
                    alt: title
                }).addClass('ptr').appendTo($cell);
                $img.on('click',
                        { inputNode: $cell.find('input') },
                        finishedReportsComponent.showPermissionList.bind(finishedReportsComponent));
            }
            return result;
        },
        columns: {
            xid: tr('common.xid'),
            name: tr('excelreports.reportName'),
            state: {
                label: tr('common.state'),
                get: function(item) {
                    switch(item.state) {
                    case 'FAILED': return tr('excelreports.reportState.failed');
                    case 'QUEUED': return tr('excelreports.reportState.queued');
                    case 'FINISHED': return tr('excelreports.reportState.finished');
                    case 'REPORT_STATE_EMAIL_FAILED': return tr('excelreports.reportState.emailFailed');
                    case 'RUNNING': return tr('excelreports.reportState.running');
                    }
                    return item.state;
                }
            },
            username: tr('excelreports.owner'),
            reportRunTimestamp: {
                label: tr('excelreports.runTimeStart'),
                get: function(item) {
                    return moment(item.reportRunTimestamp).format('LL LTS z');
                }
            },
            reportRunDuration: {
                label: tr('common.duration'),
                get: function(item) {
                    return moment.duration(item.reportRunDuration).humanize();
                }
            },
            preventPurge: {
                label: tr('excelreports.preventPurge'),
                editor: 'checkbox',
                autoSave: true,
                canEdit: function(object, value) {
                    return object.username === user.username || user.admin;
                }
            },
            readPermission: {
                label: tr('excelreports.reportReadPermission'),
                editor: 'text',
                autoSave: true,
                canEdit: function(object, value) {
                    return object.username === user.username || user.admin;
                }
            },
            controls: {
                label: '',
                sortable: false,
                renderCell: GridAndEditor.createButtons([
                    { src: 'download.png', title: tr('common.download'), 'data-action': 'download', onclick: finishedButtonClick, permissionProp: 'readPermission', disabled: finishedButtonDisabled},
                    { src: 'eye_open.png', title: tr('common.view'), 'data-action': 'view', onclick: finishedButtonClick, permissionProp: 'readPermission', disabled: finishedButtonDisabled },
                    { src: 'cancel.png', title: tr('common.delete'), 'data-action': 'delete', onclick: finishedButtonClick }
                ], '/modules/excelReports/web/images/', 24, user)
            }
        },
        sort: [{property: 'reportRunTimestamp', descending: true}]
    }, 'finished-reports-grid');
    finishedReportsGrid.startup();
    
    finishedReportsComponent = new BaseUIComponent({
        $scope: $(finishedReportsGrid.domNode)
    });
    
    finishedReportsGrid.on('dgrid-select', function(event) {
        replaceHistory('?report=' + event.rows[0].data.id);
    });
    
    finishedReportsGrid.on('dgrid-error', finishedReportsComponent.dstoreErrorHandler.bind(finishedReportsComponent));
    
    var reportTemplatesGrid = new SelectableGrid({
        collection: reportTemplatesStore,
        loadingMessage: tr('common.loading'),
        noDataMessage: tr('excelreports.noTemplates'),
        selectionMode: 'single',
        columns: {
            name: tr('excelreports.reportName'),
            username: tr('excelreports.owner'),
            controls: {
                label: '',
                sortable: false,
                renderCell: GridAndEditor.createButtons([
                    {
                        src: 'copy.png',
                        title: tr('common.copy'),
                        'data-action': 'copy',
                        onclick: templateButtonClick,
                        permissionProp: 'editPermission'
                    },
                    {
                        src: 'cancel.png',
                        title: tr('common.delete'),
                        'data-action': 'delete',
                        onclick: templateButtonClick,
                        permissionProp: 'editPermission'
                    },
                    {
                        src: 'run.png',
                        title: tr('excelreports.runNow'),
                        'data-action': 'run',
                        onclick: templateButtonClick,
                        permissionProp: 'editPermission',
                        disabled: function(object, user, permission) {
                            if (GridAndEditor.buttonDisabled.apply(null, arguments)) return true;
                            for (var i = 0; i < object.timeSeries.length; i++) {
                                if (object.timeSeries[i].dateRangeType === 'NOT_SPECIFIED') {
                                    return true;
                                }
                            }
                            return false;
                        }
                    },
                    {
                        src: 'run_gear.png',
                        title: tr('excelreports.configureAndRunReport'),
                        'data-action': 'run-specific',
                        onclick: templateButtonClick,
                        permissionProp: 'editPermission'
                    }
                ], '/modules/excelReports/web/images/', 24, user)
            }
        },
        sort: [{property: 'name', descending: true}]
    }, 'report-templates-grid');
    reportTemplatesGrid.startup();
    
    var progressBar = $('.upload-progress');
    progressBar.setProgress = function(progress) {
        this.find('.upload-progress-text').text(tr('excelreports.uploading', progress.toFixed(2) + '%'));
        this.find('.upload-progress-inner').css('width', progress + '%');
    };
    
    var $templateLink = $('#template-uploader a');
    var $removeTemplateImg = $('#template-uploader img.remove-template');
    $removeTemplateImg.click(function() {
        setNamedRanges([]);
        templateEditor.setItemModified();
        $templateLink.hide();
        $(this).hide();
        $templateLink.attr('href', '#');
        $templateLink.text('');
        $templateLink.data('filename', null);
        $('#template-uploader input[type=file]').show();
        $("#template-file-missing").hide();
    });
    
    $('#template-uploader input[type=file]').fileupload({
        url: '/rest/v2/excel-report-templates/upload',
        dataType: 'json',
        change: function(e, data) {
            templateEditor.setItemModified();
            $(this).hide();
            progressBar.setProgress(0);
            progressBar.show();
        },
        done: function (e, data) {
            progressBar.hide();
            $(this).hide();
            
            var file = data.result[0];
            setNamedRanges(file.namedRanges);
            
            $templateLink.attr('href', file.url);
            $templateLink.text(file.name);
            $templateLink.show();
            $templateLink.data('filename', file.name);
            $removeTemplateImg.show();
            $("#template-file-missing").hide();
        },
        error: function(e, data) {
            progressBar.hide();
            
            var message = (e.responseJSON && e.responseJSON.message) || data;
            
            // $(this) doesn't work
            $('#template-uploader input[type=file]').show()
                .notify(message, {style: 'mango-error',  position: 'right'});
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            progressBar.setProgress(progress);
        }
    });
    
    var cronPatternRows = $('#schedule-rows');
    $('#report-schedule').on('change.set-property', function(event) {
        if ($(this).prop('checked')) {
            cronPatternRows.show();
        } else {
            cronPatternRows.hide();
        }
    });
    
    var emailRows = $('#email-rows');
    $('#report-email').on('change.set-property', function(event) {
        if ($(this).prop('checked')) {
            emailRows.show();
            recipientsGrid.resize();
        } else {
            emailRows.hide();
        }
    });
    
    var recipientsGrid = new EditGrid({
        collection: recipientsStore,
        loadingMessage: tr('common.loading'),
        noDataMessage: tr('excelreports.noRecipientsToList'),
        renderRow: function(item, options) {
            // add a css class to each row corresponding to the type
            // so we can show and hide columns in CSS file depending on type
            var row = EditGrid.prototype.renderRow.apply(this, arguments);
            var cssClass= 'recipient-type-';
            switch(item.type) {
            case 'ADDRESS': cssClass += 'address'; break;
            case 'MAILING_LIST': cssClass += 'mailing-list'; break;
            case 'USER': cssClass += 'user'; break;
            }
            $(row).addClass(cssClass);
            return row;
        },
        columns: {
            type: {
                label: tr('common.type'),
                get: function(item) {
                    switch(item.type) {
                    case 'ADDRESS': return tr('mailingLists.emailAddress');
                    case 'MAILING_LIST': return tr('mailingLists.mailingList');
                    case 'USER': return tr('common.user');
                    }
                    return '';
                }
            },
            xid: {
                // this is the label for the address and username columns too
                label: tr('mailingLists.recipient'),
                sortable: false,
                editor: FilteringSelect,
                editorArgs: {
                    store: mailingListStore,
                    placeholder: tr('mailingLists.chooseMailingList'),
                    required: true,
                    pageSize: 20,
                    queryExpr: '*${0}*',
                    autoComplete: false,
                },
                canEdit: function(object, value) {
                    return object.type === 'MAILING_LIST';
                },
                autoSave: true
            },
            address: {
                label: '', // this label is hidden
                sortable: false,
                editor: ValidationTextBox,
                editorArgs: {
                    placeholder: tr('mailingLists.enterAddress'),
                    required: true
                },
                canEdit: function(object, value) {
                    return object.type === 'ADDRESS';
                },
                autoSave: true
            },
            username: {
                label: '', // this label is hidden
                sortable: false,
                editor: FilteringSelect,
                editorArgs: {
                    store: userStore,
                    placeholder: tr('mailingLists.chooseUser'),
                    required: true,
                    pageSize: 20,
                    queryExpr: '*${0}*',
                    autoComplete: false,
                    searchAttr: 'username'
                },
                canEdit: function(object, value) {
                    return object.type === 'USER';
                },
                autoSave: true
            },
            controls: {
                label: '',
                sortable: false,
                renderCell: GridAndEditor.createButtons([{
                    src: 'cancel.png',
                    title: tr('common.delete'),
                    onclick: function(event) {
                        var item = $(event.target).data('item');
                        recipientsStore.remove(item.autoId);
                    }
                }], '/modules/excelReports/web/images/', 16)
            }
        }
    }, 'recipients-grid');
    recipientsGrid.startup();
    
    $('#add-recipient').change(function(event) {
        var type = $(this).val();
        recipientsStore.add({type: type}).then(function(item) {
            var property;
            switch(item.type) {
            case 'ADDRESS': property = 'address'; break;
            case 'MAILING_LIST': property = 'xid'; break;
            case 'USER': property = 'username'; break;
            }
            var cell = recipientsGrid.cell(item, property);
            recipientsGrid.edit(cell);
        });
        $(this).val('');
    });
    
    var timeSeriesList = new List({
        collection: timeSeriesStore,
        loadingMessage: tr('common.loading'),
        noDataMessage: tr('excelreports.noTimePeriods'),
        renderRow: renderTimeSeries,
        insertRow: function(object) {
            var row = List.prototype.insertRow.apply(this, arguments);
            
            // dgrids need to be resized after they inserted in DOM
            // cant do resize inside renderRow()
            BaseUIComponent.dgridResize($(row));
            
            return row;
        },
        removeRow: function(row) {
            // ensure no memory leaks
            $(row).find('.dijit, .dgrid').each(function(i, node) {
                var dojoObject = registry.byNode(node);
                if (dojoObject)
                    dojoObject.destroyRecursive();
            });
            return List.prototype.removeRow.apply(this, arguments);
        },
        sort: [{property: 'autoId', descending: false}]
    }, 'time-series-list');
    timeSeriesList.startup();
    
    templateEditor = new GridAndEditor({
        store: reportTemplatesStore,
        $scope: $('#templates'),
        $editor: $('#report-setup'),
        grid: reportTemplatesGrid,
        documentReady: function() {
            // override this method so we can call store.get() on the item before opening it for editing
            // this ensures the named ranges are available
            ItemEditor.prototype.documentReady.apply(this, arguments);
            
            var self = this;
            
            this.grid.on('dgrid-select', function(event) {
                if (event.grid.disableEvent) return;

                self.confirmDiscard().done(function() {
                    var selectedTemplate = event.rows[0].data;

                    self.store.get(selectedTemplate.id).then(function(fullTemplate) {
                        self.editItem(fullTemplate);
                    });
                }).fail(function() {
                    event.grid.clearSelection();

                    // no built in way to inhibit event firing?
                    event.grid.disableEvent = true;
                    event.grid.select(self.currentItem);
                    event.grid.disableEvent = false;
                });
            });
        },
        setProperty: function(item, property, $element, value) {
            switch(property) {
            case 'filename':
                var $fileInput = $element.find('input');
                var fileNamePath = value.split('/').map(p => encodeURIComponent(p));
                
                $templateLink.text(value);
                $templateLink.data('filename', value);
                $templateLink.attr('href', '/rest/v2/file-stores/' + encodeURIComponent(item.fileStoreName || 'EXCEL_REPORT_TEMPLATES') +
                        '/' + fileNamePath.join('/'));
                $templateLink.attr('download', fileNamePath[fileNamePath.length - 1]);
                
                if (!value) {
                    $templateLink.hide();
                    $removeTemplateImg.hide();
                    $fileInput.show();
                } else {
                    $fileInput.hide();
                    $templateLink.show();
                    $removeTemplateImg.show();
                }
                return;
            case 'allNamedRanges':
                if (value == null && item.fileStoreName && item.filename) {
                    return mangoAPI.ajax({
                        method: 'POST',
                        url: '/rest/v2/excel-report-templates/load-named-ranges',
                        data: JSON.stringify(item),
                        contentType: 'application/json',
                    }).then(data => {
                        setNamedRanges(data.allNamedRanges);
                    }, error => {
                        setNamedRanges(null);
                    });
                } else {
                    setNamedRanges(value);
                }
                return;
            case 'emailModelScript':
                emailModelScriptEditor.setValue(value, -1);
                return;
            case 'postProcessingScript':
                postProcessingScriptEditor.setValue(value, -1);
                return;
            }
            GridAndEditor.prototype.setProperty.apply(this, arguments);
        },
        getProperty: function(item, property, $element) {
            switch(property) {
            case 'filename':
                return $templateLink.data('filename');
            case 'emailModelScript':
                return emailModelScriptEditor.getValue();
            case 'postProcessingScript':
                return postProcessingScriptEditor.getValue();
            }
            return GridAndEditor.prototype.getProperty.apply(this, arguments);
        },
        createNewItem: function() {
            // The inputs for most properties are cleared automatically by calling $(input).val('')
            // defaultTemplate contains the defaults to fill the inputs/dgrids when a new template
            // is created
            var item = $.extend(true, {}, defaultTemplate);
            item.timeSeries[0].name = tr('excelreports.timePeriodName', 1);
            return item;
        }
    });
    
    $(templateEditor).on('editorShown', function(event, item) {
        //Only show once a report has an id, i.e. is saved
        if(typeof item.id != 'undefined')
            replaceHistory('?template=' + item.id);
        else
            replaceHistory('');
    });
    
    //Setup Permissions View
    $('#editPermissionsViewer').on('click', {inputNode: templateEditor.$editor.find('input[name=editPermission]')}, templateEditor.showPermissionList.bind(templateEditor));    
    $('#reportReadPermissionsViewer').on('click', {inputNode: templateEditor.$editor.find('input[name=reportReadPermission]')}, templateEditor.showPermissionList.bind(templateEditor));    
    
    $('#add-time-series').click(function() {
        var points = [];
        // defaults for new time series
        var newTimeSeries = $.extend(true, {}, defaultTemplate.timeSeries[0]);
        newTimeSeries.name = tr('excelreports.timePeriodName', timeSeriesStore.data.length + 1);
        timeSeriesStore.add(newTimeSeries);
    });
    
    $('.run-template').click(function() {
        var item = templateEditor.currentItem;
        if (item) runTemplate(item);
    });
    
    $('.run-template-specific').click(function() {
        var item = templateEditor.currentItem;
        if (item) showRunDialog(item);
    });
    
    $('#finished .delete-failed').click(function() {
        var confirmed = finishedReportsComponent.confirm(tr('common.confirmDelete'),
                tr('excelreports.confirmDeleteFailedReports'));
        $.when(confirmed).then(function() {
            finishedReportsStore.filter({state: 'FAILED'}).forEach(function(item) {
                finishedReportsStore.remove(item.id)
                    .then(null, templateEditor.dstoreErrorHandler.bind(templateEditor));
            });
        });
    });
    
    $('#finished .delete-selected').click(function() {
        var confirmed = finishedReportsComponent.confirm(tr('common.confirmDelete'),
                tr('common.confirmDeleteSelected'));
        $.when(confirmed).then(function() {
            var selection = finishedReportsGrid.selection;
            for (var id in selection) {
                if (selection[id]) {
                    finishedReportsStore.remove(id)
                        .then(null, templateEditor.dstoreErrorHandler.bind(templateEditor));
                }
            }
        });
    });
    
    var emailTemplateFilename = new FilteringSelect({
        store: emailTemplateStore,
        placeholder: tr('mailingLists.chooseEmailTemplate'),
        pageSize: 20,
        queryExpr: '*${0}*',
        autoComplete: false,
        searchAttr: 'name',
        required: true
    }, 'report-email-template-filename');
    $(emailTemplateFilename.domNode).attr('data-editor-property', 'emailTemplateFilename');
    
    setupRunDialog();
    
    var cronPicker = new CronPicker({
        $input: $('#report-schedule-cron'),
        $picker: $('.cron-picker')
    });
    

    var urlTemplateId = MangoAPI.urlParameter('template');
    var urlReportId;
    
    if (urlTemplateId) {
        reportTemplatesStore.get(urlTemplateId).then(function(item) {
            templateEditor.editItem(item);
        });
    } else if ((urlReportId = MangoAPI.urlParameter('report'))) {
        finishedReportsGrid.select(urlReportId);
        $('.nav-tabs a[href="#finished"]').tab('show');
    }
} // setupPage()

/**
 * Convert array of named range strings into an array of
 * objects with a name property and set the data on the namedRangeStore
 */
function setNamedRanges(namedRangesArray) {
    var namedRanges = [];
    if (namedRangesArray) {
        for (var i = 0; i < namedRangesArray.length; i++) {
            namedRanges.push({name: namedRangesArray[i]});
        }
    }
    namedRangeStore.setData(namedRanges);
}

function templateButtonClick(event) {
    var $img = $(event.target);
    var item = $img.data('item');
    switch ($img.data('action')) {
    case 'delete':
        templateEditor.deleteItemClick(event);
        return;
    case 'copy':
        templateEditor.copyItemClick(event);
        return;
    case 'run':
        runTemplate(item);
        return;
    case 'run-specific':
        showRunDialog(item);
        return;
    }
}

function finishedButtonDisabled(object, user, permission, button, defaultValue) {
    if (defaultValue) return true;
    if (!(object.state === 'FINISHED' || object.state === 'EMAIL_FAILED')) {
        return true;
    }else{
        return false;
    }
}

function finishedButtonClick(event) {
    var $img = $(event.target);
    var item = $img.data('item');
    switch ($img.data('action')) {
    case 'view':
        window.open('/rest/v1/excel-reports/view/' + encodeURIComponent(item.xid), '_blank');
        return;
    case 'download':
        window.location = '/rest/v1/excel-reports/download/' + encodeURIComponent(item.xid);
        return;
    case 'delete':
        var itemDesc = item.name + ' [xid=' + item.xid + ']'; 
        var confirmed = finishedReportsComponent.confirm(tr('common.confirmDelete'),
                tr('common.confirmDeleteLong', itemDesc));
        $.when(confirmed).then(function() {
            finishedReportsStore.remove(item.id)
                .then(null, templateEditor.dstoreErrorHandler.bind(templateEditor));
        });
        return;
    }
}

var $runModal;
var dateControlsStore = new TrackedAuto({data: []});
var dateControlsList;

function setupRunDialog() {
    $runModal = $('#run-modal');
    var $content = $runModal.find('.modal-body');
    
    dateControlsList = new List({
        collection: dateControlsStore,
        loadingMessage: tr('common.loading'),
        noDataMessage: tr('excelreports.noTimePeriods'),
        renderRow: renderDateControls,
        sort: [{property: 'autoId', descending: false}]
    });
    dateControlsList.startup();
    $(dateControlsList.domNode).attr('data-editor-property', 'timeSeries');
    $(dateControlsList.domNode).attr('id', 'date-controls-list');
    
    $content.append(cloneAndUpdateIds($('.email-row'), 'run'));
    $content.append(dateControlsList.domNode);
    
    $runModal.find('.btn-primary').click(function() {
        var item = $runModal.data('item');
        templateEditor.getInputs(item, $content);
        runTemplate(item, true).then(function() {
            $runModal.modal('hide');
        });
    });
}

function renderDateControls(object, options) {
    var id = object.autoId;
    var $dateControls = cloneAndUpdateIds($('#dom-templates .date-controls'), 'run-' + id);
    var $rollupControls = cloneAndUpdateIds($('#dom-templates .rollup-controls'), 'run-' + id);
    
    var inputId = $dateControls.find('input[value="NOT_SPECIFIED"]').remove().attr('id');
    $dateControls.find('label[for="' + inputId + '"]').remove();
    
    var $div = $('<div>', {'class': 'mango-row'});
    $('<label>').text(tr('common.name')).appendTo($div);
    $('<span>', {'data-editor-property': 'name'}).appendTo($div);
    
    var $row = $('<div>');
    $row.append($div);
    $row.append($dateControls);
    $row.append($rollupControls);
    
    renderRow(object, $row);
    
    if (object.dateRangeType === 'NOT_SPECIFIED') {
        object.dateRangeType = 'SPECIFIC';
    }
    
    templateEditor.setInputs(object, $row);
    return $row[0];
}

function showRunDialog(item) {
    item = $.extend(true, {}, item);
    $runModal.data('item', item);
    
    var $content = $runModal.find('.modal-body');

    var $emailRow = $content.find('.email-row');
    if (item.recipients.length) {
        $emailRow.show();
    } else {
        $emailRow.hide();
    }
    
    templateEditor.setInputs(item, $content);
    
    $runModal.modal('show');
}

function runTemplate(item, sendContent) {
    var request;
    if (sendContent) {
        request = {
            method: 'POST',
            url: '/rest/v1/excel-reports/run',
            contentType: "application/json",
            data: JSON.stringify(item),
            headers: {
                initiatorId: initiatorId
            }
        };
    } else {
        request = {
            method: 'POST',
            url: '/rest/v1/excel-reports/run/' + encodeURIComponent(item.xid),
            headers: {
                initiatorId: initiatorId
            }
        };
    }
    
    return mangoAPI.ajax(request).then(function(report) {
        var idProp = finishedReportsStore.idProperty;
        finishedReportsStore.emit('add', {target: report, id: report[idProp]});
        templateEditor.showSuccess(tr('common.success'));
    }, templateEditor.showError);
}

function cloneAndUpdateIds($target, id) {
    var $result = $target.clone();
    $result.find('[id]').each(function(i, element) {
        var currentId = $(element).attr('id');
        $(element).attr('id', currentId + '-' + id);
    });
    $result.find('[for]').each(function(i, element) {
        var currentFor = $(element).attr('for');
        $(element).attr('for', currentFor + '-' + id);
    });
    return $result;
}

function renderTimeSeries(object, options) {
    var id = object.autoId;
    var $timeSeries = cloneAndUpdateIds($('#dom-templates .time-series'), id);
    
    $timeSeries.find('.right-links img').click(function() {
        timeSeriesStore.remove(object.autoId);
    });
    
    var namedRangePicker = createNamedRangePicker();
    var $namedRangePicker = $(namedRangePicker.domNode)
        .attr('data-editor-property', 'namedRange');
    $timeSeries.find('.named-range-picker').replaceWith($namedRangePicker);
    
    var pointPicker = createPointPicker();
    $timeSeries.find('.point-picker').replaceWith(pointPicker.domNode);
    
    var searchByPicker = createSearchByPicker(pointPicker, 'search-by-picker-' + id);
    $timeSeries.find('.search-by-picker').replaceWith(searchByPicker.domNode);
    
    
    var pointsStore = new TrackedAuto();
    pointsStore.on('add, update, delete', templateEditor.setItemModified.bind(templateEditor));
    
    var $addToAllCheckbox = $timeSeries.find('.add-to-all');
    $addToAllCheckbox.on('change', function(event) {
        event.stopImmediatePropagation();
    });
    
    pointPicker.on('change', function(xid) {
        var item = this.item;
        if (!item) return;
        
        var newPointItem = {
            dataPointDeviceName: item.deviceName,
            dataPointName: item.name,
            dataPointXid: item.xid,
            namedRange: ''
        };
        
        if ($addToAllCheckbox.is(':checked')) {
            $('.time-series-points').each(function(i, node) {
                var grid = registry.byNode(node);
                grid.collection.add(newPointItem);
            });
        } else {
            pointsStore.add(newPointItem);
        }
        
        this.loadAndOpenDropDown();
        if (this.userEnteredText) {
            this.set('displayedValue', this.userEnteredText);
            this._startSearch(this.userEnteredText);
        }
    });
    
    pointPicker.on('keyup', function() {
        this.userEnteredText = this.get('displayedValue');
    });
    
    var pointGrid = new EditGrid({
        collection: pointsStore,
        loadingMessage: tr('common.loading'),
        noDataMessage: tr('excelreports.noPoints'),
        columns: {
            dataPointDeviceName: tr('common.deviceName'),
            dataPointName: tr('common.pointName'),
            dataPointXid: tr('common.xid'),
            namedRange: {
                label: tr('excelreports.namedRange'),
                editor: ComboBox,
                editorArgs: {
                    store: adaptedNamedRangeStore,
                    placeholder: tr('excelreports.chooseLocation'),
                    required: false,
                    pageSize: 20,
                    queryExpr: '*${0}*',
                    autoComplete: false,
                },
                autoSave: true
            },
            controls: {
                label: '',
                sortable: false,
                renderCell: GridAndEditor.createButtons([
                    { src: 'cancel.png', title: tr('common.delete'), onclick: function() {
                        var id = $(this).data('item').autoId;
                        pointsStore.remove(id);
                    }},
                ], '/modules/excelReports/web/images/', 16)
            }
        }
    });
    pointGrid.startup();
    $(pointGrid.domNode).attr('data-editor-property', 'points');
    $(pointGrid.domNode).addClass('time-series-points');
    $timeSeries.find('.point-grid').replaceWith(pointGrid.domNode);
    
    $timeSeries.find(':input').on('change keydown', function(event) {
        templateEditor.setItemModified(event);
    });
    
    namedRangePicker.on('change', function(value) {
        object.namedRange = value;
        templateEditor.setItemModified();
    });
    
    renderRow(object, $timeSeries);
    templateEditor.setInputs(object, $timeSeries);
    
    return $timeSeries[0];
}

function renderRow(object, $row) {
    if (object.dateRangeType !== 'SPECIFIC') {
        object.startTimestamp = defaultTemplate.timeSeries[0].startTimestamp;
        object.finishTimestamp = defaultTemplate.timeSeries[0].finishTimestamp;
    }
    
    var $relativeDateControls = $row.find('.relative-date-controls');
    var $specificDateControls = $row.find('.specific-date-controls');
    $row.find('input[name=dateRangeType]')
    .on('change.set-property', function(event) {
        var $radio = $(event.target);
        if (!$radio.prop('checked')) return;
        
        switch($radio.val()) {
        case 'RELATIVE':
            $specificDateControls.hide();
            $relativeDateControls.show();
            break;
        case 'SPECIFIC':
            $relativeDateControls.hide();
            $specificDateControls.show();
            break;
        case 'NOT_SPECIFIED':
            $relativeDateControls.hide();
            $specificDateControls.hide();
            break;
        }
    });
    
    $relativeDateControls.find('[name=relativeDateType]').on('change', function(event){
        //Disable the periodCount input and set to 1
        var $periodCount = $relativeDateControls.find('[name=periodCount]');

        if($(this).val() === 'CURRENT'){
            $periodCount.prop('disabled', true);
            $periodCount.val(1);
        }else{
            $periodCount.prop('disabled', false);
        }
    });
    
    $specificDateControls.find('input').datetimepicker({
        format: 'lll z',
        formatTime: 'LT',
        formatDate: 'l'
    });
    
    $row.find('[name=rollup]').on('change.set-property', function(event) {
        var $rollupOptions = $row.find('[name=periods], [name=type]');
        if ($(event.target).val() === 'NONE') {
            $rollupOptions.hide();
        } else {
            $rollupOptions.show();
        }
    });
    
    
    
    $row.find(':input').on('change', function(event) {
        templateEditor.getInputs(object, $row);
    });
}

function createNamedRangePicker(id) {
    var picker = new ComboBox({
        store: adaptedNamedRangeStore,
        placeholder: tr('excelreports.chooseLocation'),
        required: false,
        pageSize: 20,
        queryExpr: '*${0}*',
        autoComplete: false,
    }, id);
    picker.startup();
    return picker;
}

function createPointPicker(id) {
    var picker = new FilteringSelect({
        store: new DstoreAdapter(sortedPointSummaryStore),
        placeholder: tr('excelreports.choosePoint'),
        pageSize: 20,
        queryExpr: '*${0}*',
        queryAttr: 'name',
        autoComplete: false,
        labelFunc: function(item, store) {
            if (this.searchAttr === 'xid') {
                return item.xid;
            } else if (this.searchAttr === 'deviceName') {
                return item.deviceName + ' - ' + item.name;
            } else {
                return item.deviceName + ' - ' + item[this.searchAttr];
            }
        },
        // override set('item', obj) so displayedValue comes from labelFunc()
        _setItemAttr: function(item, priorityChange, displayedValue) {
            FilteringSelect.prototype._setItemAttr.apply(this, [item, priorityChange, this.labelFunc(item)]);
        },
        required: false
    }, id);
    picker.startup();
    return picker;
}

function createSearchByPicker(pointPicker, id){
    // picker to change search by attribute
    var searchByPicker = new FilteringSelect({
        store: new DstoreAdapter(new Memory({
                data: [{
                    id: 'name',
                    name: tr('common.name')
                },{
                    id: 'xid',
                    name: tr('common.xid')
                },{
                    id: 'deviceName',
                    name: tr('filter.byDeviceName')
                }]
        })),
        placeholder: tr('filter.by'),
        pageSize: 20,
        queryExpr: '*${0}*',
        autoComplete: false,
        value: 'name'
    }, id);
    
    searchByPicker.on('change', function(event) {
        var attr = this.value;
        
        pointPicker.set('searchAttr', attr);
        
        if (attr === 'xid') {
            sortedPointSummaryStore = pointSummaryStore.sort('xid');
        } else if (this.searchAttr === 'deviceName') {
            sortedStore = pointSummaryStore.sort([
                { property: 'deviceName' },
                { property: 'name' }
            ]);
        } else {
            sortedPointSummaryStore = pointSummaryStore.sort([
                { property: 'deviceName' },
                { property: attr }
            ]);
        }
        pointPicker.set('store', new DstoreAdapter(sortedPointSummaryStore));
        pointPicker.reset();
    });
    searchByPicker.startup();
    //Dirty little hack to disable the input from user's typing
    var nodes = $(searchByPicker.domNode).find('.dijitInputInner');
    if(nodes.length > 0)
        nodes[0].disabled=true;
    return searchByPicker;
}

function replaceHistory(path) {
    if (!window.history || !window.history.replaceState)
        return;
    window.history.replaceState(null, null, window.location.pathname + path);
}
});
