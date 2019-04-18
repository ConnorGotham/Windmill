<%--
    Copyright (C) 2015 Infinite Automation. All rights reserved.
    @author Jared Wiltshire
--%><%@ include file="/WEB-INF/jsp/include/tech.jsp" %><%--
--%><tag:html5>

<jsp:attribute name="styles">
    <link rel="stylesheet" href="/modules/excelReports/web/css/excelReports.css?v=${lastUpgrade}">
</jsp:attribute>

<jsp:attribute name="scripts">
  <m2m2:moduleExists name="mangoApi">
    <script type="text/javascript" src="/modules/excelReports/web/js/excelReports.js?v=${lastUpgrade}"></script>
  </m2m2:moduleExists>
</jsp:attribute>

<jsp:body>
<%-- Let the user know that a required module is missing --%>
<m2m2:moduleDoesNotExist name="mangoUI">
  <h1 style="color:red">
    <fmt:message key="common.moduleDoesNotExist">
      <fmt:param value="mangoUI"/>
    </fmt:message>
  </h1>
</m2m2:moduleDoesNotExist>

<m2m2:moduleExists name="mangoApi">
<div role="tabpanel">
<ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active">
        <a href="#templates" aria-controls="templates" role="tab" data-toggle="tab">
        <fmt:message key="excelreports.templates"/></a>
    </li>
    <li role="presentation">
        <a href="#finished" aria-controls="finished" role="tab" data-toggle="tab">
        <fmt:message key="excelreports.finishedReports"/></a>
    </li>
</ul>
<div class="tab-content">
    <div role="tabpanel" class="tab-pane fade in active clearfix" id="templates">
      <div id="reports" class="section border padded">
          <div class="clearfix">
            <div class="right-links">
                <img title="<fmt:message key="common.help"/>" class="mango-help" data-help-id="excelreports-template-list"
                  src="/modules/excelReports/web/images/help.png?v=${lastUpgrade}" height="24" width="24"><!--
                --><img title="<fmt:message key="excelreports.newReport"/>" class="editor-new"
                  src="/modules/excelReports/web/images/excel_add.png?v=${lastUpgrade}" height="24" width="24">
            </div>
            <h1 class="no-top-margin"><fmt:message key="header.excelreports"/></h1>
          </div>
          <div id="report-templates-grid"></div>
      </div>
      <div id="report-setup" class="section border padded" style="display: none">
          <div class="clearfix">
            <div class="right-links">
                <img title="<fmt:message key="common.help"/>" class="mango-help" data-help-id="excelreports-template-setup"
                    src="/modules/excelReports/web/images/help.png?v=${lastUpgrade}" height="24" width="24"><!--
                --><img title="<fmt:message key="common.delete"/>" class="editor-delete"
                  src="/modules/excelReports/web/images/cancel.png?v=${lastUpgrade}" height="24" width="24"><!--
                --><img title="<fmt:message key="excelreports.runNow"/>" class="run-template"
                  src="/modules/excelReports/web/images/run.png?v=${lastUpgrade}" height="24" width="24"><!--
                --><img title="<fmt:message key="excelreports.configureAndRunReport"/>" class="run-template-specific"
                  src="/modules/excelReports/web/images/run_gear.png?v=${lastUpgrade}" height="24" width="24"><!--
                --><img title="<fmt:message key="common.save"/>" class="editor-save"
                  src="/modules/excelReports/web/images/diskette.png?v=${lastUpgrade}" height="24" width="24"><!--
                --><img title="<fmt:message key="common.copy"/>" class="editor-copy"
                  src="/modules/excelReports/web/images/copy.png?v=${lastUpgrade}" height="24" width="24"><!--
                --><img title="<fmt:message key="common.cancel"/>" class="editor-cancel"
                  src="/modules/excelReports/web/images/close.png?v=${lastUpgrade}" height="24" width="24">
            </div>
            <div class="float-left">
                <img src="/modules/excelReports/web/images/excel.png?v=${lastUpgrade}" height="24" width="24">
            </div>
            <h2 class="no-top-margin"><fmt:message key="excelreports.reportSetup"/></h2>
          </div>
          <div class="mango-row">
              <label for="report-name"><fmt:message key="excelreports.reportName"/></label>
              <input id="report-name" name="name" type="text">
          </div>
          <div class="mango-row">
              <label for="report-xid"><fmt:message key="common.xid"/></label>
              <input id="report-xid" name="xid" type="text">
          </div>
          <div id="template-uploader" class="mango-row">
              <label><fmt:message key="excelreports.template"/></label>
              <div class="upload-progress" style="display: none">
                  <div class="upload-progress-text"></div>
                  <div class="upload-progress-inner"></div>
              </div>
              <span data-editor-property="filename">
                <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.ms-excel.sheet.macroEnabled.12">
                <a href="#" title="<fmt:message key="excelreports.downloadTemplate" />"></a>
                <img src="/modules/excelReports/web/images/cancel.png?v=${lastUpgrade}" class="ptr remove-template" height="16" width="16"
                    title="<fmt:message key="excelreports.removeTemplate" />">
                <span id="template-file-missing" style="color:red; display:none;"><fmt:message key="excelreports.validate.templateDNE"/></span>
              </span>
          </div>
          <div class="mango-row">
              <label for="report-prevent-purge"><fmt:message key="excelreports.preventPurge"/></label>
              <input id="report-prevent-purge" type="checkbox" name="preventPurge">
          </div>
          <div class="mango-row">
              <label for="report-edit-permission"><fmt:message key="excelreports.templateEditPermission"/></label>
              <input id="report-edit-permission" type="text" name="editPermission">
              <img id="editPermissionsViewer" class="ptr" 
                src="/images/bullet_down.png?v=${lastUpgrade}" 
                title="<fmt:message key="users.permissions" />" 
                alt="<fmt:message key="users.permissions" />"
              />
          </div>
          <div class="mango-row">
              <label for="report-read-permission"><fmt:message key="excelreports.reportReadPermission"/></label>
              <input id="report-read-permission" type="text" name="reportReadPermission">
              <img id="reportReadPermissionsViewer" class="ptr" 
                src="/images/bullet_down.png?v=${lastUpgrade}" 
                title="<fmt:message key="users.permissions" />" 
                alt="<fmt:message key="users.permissions" />"
              />
          </div>
          
          <div id="time-series">
              <h3><fmt:message key="excelreports.timePeriods"/></h3>
              <div id="time-series-list" data-editor-property="timeSeries"></div>
              <button id="add-time-series"><fmt:message key="excelreports.addTimePeriod"/></button>
          </div>
          
          <div id="post-processing">
              <h3><fmt:message key="excelreports.postProcessingScript"/></h3>
              <div id="postProcessingScript" data-editor-property="postProcessingScript" style="font-family: Courier New !important; position: relative; height:400px; width:700px"></div>
          </div>
          
          <div id="schedule">
              <h3><fmt:message key="excelreports.schedule"/></h3>
              <div class="mango-row">
                  <label for="report-schedule"><fmt:message key="excelreports.scheduleThisTemplate"/></label>
                  <input id="report-schedule" type="checkbox" name="schedule">
              </div>
              <div id="schedule-rows" style="display:none">
                <div class="mango-row">
                    <label for="report-schedule-cron"><fmt:message key="excelreports.cronExpression"/></label>
                    <div class="label-clear">
                    <input id="report-schedule-cron" type="text" name="scheduleCron">
                      <jsp:include page="/WEB-INF/snippet/view/misc/cronPicker.jsp"/>
                    </div>
                </div>
              </div>
          </div>
          
          <div id="email">
              <h3><fmt:message key="excelreports.email"/></h3>
              <div class="mango-row email-row">
                  <label for="report-email"><fmt:message key="excelreports.emailReport"/></label>
                  <input id="report-email" type="checkbox" name="email">
              </div>
              <div id="email-rows" style="display:none">
                <div class="mango-row">
                    <label for="report-email-template-filename"><fmt:message key="excelreports.emailTemplate"/></label>
                    <div id="report-email-template-filename"></div>
                </div>
                <div class="mango-row">
                    <label for="report-zip-data"><fmt:message key="excelreports.zipData"/></label>
                    <input id="report-zip-data" type="checkbox" name="zipData">
                </div>
                <div class="mango-row">
                    <label><fmt:message key="excelreports.emailRecipients"/></label>
                    <div class="label-clear">
                      <div id="recipients-grid" data-editor-property="recipients"></div>
                      <select id="add-recipient">
                          <option value="" disabled selected><fmt:message key="mailingLists.addRecipient"/></option>
                          <option value="ADDRESS"><fmt:message key="mailingLists.addAddress"/></option>
                          <option value="MAILING_LIST"><fmt:message key="mailingLists.addMailingList"/></option>
                          <option value="USER"><fmt:message key="mailingLists.addUser"/></option>
                      </select>
                    </div>
                </div>
                <div id="email-model">
                    <h3><fmt:message key="excelreports.emailModelScript"/></h3>
                    <div id="emailModelScript" data-editor-property="emailModelScript" style="font-family: Courier New !important; position: relative; height:400px; width:700px"></div>
                </div>
              </div>
          </div>
      </div>
    </div>
    <div role="tabpanel" class="tab-pane fade" id="finished">
      <div class="clearfix">
        <button class="delete-failed"><fmt:message key="excelreports.deleteAllFailed"/></button>
        <button class="delete-selected"><fmt:message key="common.deleteSelected"/></button>
        <img title="<fmt:message key="common.help"/>" class="mango-help" data-help-id="excelreports-report-list"
                    src="/modules/excelReports/web/images/help.png?v=${lastUpgrade}" height="24" width="24">
      </div>
      <div id="finished-reports-grid"></div>
    </div>
</div>
</div>

<div class="modal fade" id="run-modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"><fmt:message key="excelreports.configureReport"/></h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><fmt:message key="common.close"/></button>
                <button type="button" class="btn btn-primary"><fmt:message key="common.run"/></button>
            </div>
        </div>
    </div>
</div>

<!-- Templates here, saves generating them manually using jquery -->
<div id="dom-templates" style="display: none">
  <div class="time-series">
    <div class="right-links">
        <img title="Delete" src="/modules/excelReports/web/images/cancel.png?v=${lastUpgrade}" style="height: 24px; width: 24px;">
    </div>
    <div class="mango-row">
        <label for="time-series-name"><fmt:message key="common.name"/></label>
        <input id="time-series-name" name="name" type="text">
    </div>
    <div class="mango-row date-controls">
        <label><fmt:message key="excelreports.timePeriod"/></label>
        <div class="label-clear" id="time-series-dateRangeType">
          <form>
            <input type="radio" name="dateRangeType" value="NOT_SPECIFIED" id="date-range-not-specified">
            <label for="date-range-not-specified"><fmt:message key="excelreports.notSpecified"/></label>
            <input type="radio" name="dateRangeType" value="RELATIVE" id="date-range-relative">
            <label for="date-range-relative"><fmt:message key="excelreports.relative"/></label>
            <input type="radio" name="dateRangeType" value="SPECIFIC" id="date-range-specific">
            <label for="date-range-specific"><fmt:message key="excelreports.specific"/></label>
          </form>
          <div class="relative-date-controls">
            <select name="relativeDateType" id="time-series-relativeDateType">
                <option value="PAST"><fmt:message key="common.past"/></option>
                <option value="PREVIOUS"><fmt:message key="common.previous"/></option>
                <option value="CURRENT"><fmt:message key="excelreports.current"/></option>
                <option value="AGO"><fmt:message key="excelreports.ago"/></option>
            </select>
            <input type="number" min="1" name="periodCount" id="time-series-periodCount">
            <select name="periodType" id="time-series-periodType">
                <option value="SECONDS"><fmt:message key="dateAndTime.seconds"/></option>
                <option value="MINUTES"><fmt:message key="dateAndTime.minutes"/></option>
                <option value="HOURS" selected><fmt:message key="dateAndTime.hours"/></option>
                <option value="DAYS"><fmt:message key="dateAndTime.days"/></option>
                <option value="WEEKS"><fmt:message key="dateAndTime.weeks"/></option>
                <option value="MONTHS"><fmt:message key="dateAndTime.months"/></option>
                <option value="YEARS"><fmt:message key="dateAndTime.years"/></option>
            </select>
          </div>
          <div class="specific-date-controls">
              <div class="mango-row-simple">
                <label for="date-range-specific-from"><fmt:message key="common.dateRangeFrom"/></label>
                <input class="datetimepicker" type="text" name="startTimestamp" id="time-series-startTimestamp" data-editor-date-format="epoch">
              </div>
              <div class="mango-row-simple">
                <label for="date-range-specific-to"><fmt:message key="common.dateRangeTo"/></label>
                <input class="datetimepicker" type="text" name="finishTimestamp" id="date-range-finishTimestamp" data-editor-date-format="epoch">
              </div>
          </div>
        </div>
    </div>

    <div class="mango-row rollup-controls">
        <label for="rollup"><fmt:message key="common.rollup"/></label>
        <div class="label-clear">
            <select name="rollup" id="date-range-rollup">
                <option value="NONE" selected><fmt:message key="common.none"/></option>
                <option value="AVERAGE"><fmt:message key="common.stats.avg"/></option>
                <option value="ACCUMULATOR"><fmt:message key="common.accumulator"/></option>
                <option value="COUNT"><fmt:message key="common.stats.count"/></option>
                <option value="DELTA"><fmt:message key="common.stats.delta"/></option>
                <option value="MINIMUM"><fmt:message key="common.stats.min"/></option>
                <option value="MAXIMUM"><fmt:message key="common.stats.max"/></option>
                <option value="INTEGRAL"><fmt:message key="common.stats.integral"/></option>
                <option value="SUM"><fmt:message key="common.stats.sum"/></option>
				<option value="START"><fmt:message key="common.stats.start"/></option>
                <option value="FIRST"><fmt:message key="common.first"/></option>
                <option value="LAST"><fmt:message key="common.last"/></option>
            </select>
            <span data-editor-property="rollupPeriod">
                <input name="periods" type="number" min="1" value="1" id="date-range-rollupPeriods">
                <select name="type" id="date-range-rollupPeriodType">
                    <option value="SECONDS"><fmt:message key="dateAndTime.seconds"/></option>
                    <option value="MINUTES"><fmt:message key="dateAndTime.minutes"/></option>
                    <option value="HOURS" selected><fmt:message key="dateAndTime.hours"/></option>
                    <option value="DAYS"><fmt:message key="dateAndTime.days"/></option>
                    <option value="WEEKS"><fmt:message key="dateAndTime.weeks"/></option>
                    <option value="MONTHS"><fmt:message key="dateAndTime.months"/></option>
                    <option value="YEARS"><fmt:message key="dateAndTime.years"/></option>
                </select>
            </span>
        </div>
    </div>
    <div class="mango-row">
        <label><fmt:message key="excelreports.timeValuesLocation"/></label>
        <div class="named-range-picker"></div>
    </div>
    <div class="mango-row">
        <label><fmt:message key="excelreports.addPoint"/></label>
        <div class="label-clear">
            <div class="point-picker"></div><div class="search-by-picker"></div>
            <!-- Hidden for now until we fix bug that ties all drop downs to same store -->
            <input type="checkbox" class="add-to-all" id="add-to-all" style="display:none">
            <label for="add-to-all" style="display:none"><fmt:message key="excelreports.addToAll"/></label>
        </div>
    </div>
    <div id="time-series-points">
      <div class="point-grid"></div>
    </div>
  </div>
</div>

</m2m2:moduleExists>

<%-- Let the user know that a required module is missing --%>
<m2m2:moduleDoesNotExist name="mangoApi">
  <h1 style="color:red">
    <fmt:message key="common.moduleDoesNotExist">
      <fmt:param value="mangoApi"/>
    </fmt:message>
  </h1>
</m2m2:moduleDoesNotExist>

<%-- Configure the ACE editor inputs --%>
<script src="/resources/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/theme-tomorrow_night_bright.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/mode-javascript.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/worker-javascript.js" type="text/javascript" charset="utf-8"></script>
<script>
	ace.config.set("basePath", "/resources/ace");
	var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
    var postProcessingScriptEditor = ace.edit("postProcessingScript");
    postProcessingScriptEditor.setTheme("ace/theme/tomorrow_night_bright");
    postProcessingScriptEditor.getSession().setMode(new JavaScriptMode());
    var emailModelScriptEditor = ace.edit("emailModelScript");
    emailModelScriptEditor.setTheme("ace/theme/tomorrow_night_bright");
    emailModelScriptEditor.getSession().setMode(new JavaScriptMode());
</script>

</jsp:body>
</tag:html5>
