(window.webpackJsonpexcelReports=window.webpackJsonpexcelReports||[]).push([[1],{19:function(e,t){e.exports='<div class="help-doc-container" ng-init="baseURL = \'/modules/Excel Reports/web/help/images/\'">\n    <h1 ma-tr="header.excelreports"></h1>\n\n    <p>\n        Use the <code>Excel Reports</code> module for managing and configuring custom reports with Excel templates.  \n    </p>\n\n    <h2 id="report-template-list">Report Template List</h2>\n\n    <p>\n        To add a new report template, click the <code>New Template</code> button. To edit an existing template, \n        click the template\'s row in the "Report templates" list. A template Owner is the user who created the template.\n    </p>\n\n    <h3 id="copy-report">Copy Report</h3>\n\n    <p>\n        Copy a report by clicking the <code>Settings</code> icon on desired template, then click <code>Copy Template</code>. \n        This will load in the settings from the previous template and allow you to save the new copy. \n        The copy must be saved before it becomes a new template.\n    </p>\n\n    <h3 id="delete-report">Delete Report</h3>\n\n    <p>\n        Delete a report by clicking the <code>Settings</code> icon on desired template, then click <code>Delete Template</code>. You\n        can also click the <code>Trash icon</code> in the form once a template is selected.\n    </p>\n\n    <h3 id="run-report">Run Report</h3>\n\n    <p>\n        Run a report by clicking the <code>Settings</code> icon on desired template, then click <code>Run Template</code>. This\n         will immediately schedule a new report. The status of the new report will be shown in the Finished / in-progress reports \n         table. The report will be run in the background and when finished be available for viewing.\n    </p>\n\n    <h3 id="run-with-specific-dates">Run Report</h3>\n\n    <p>\n        Run a report with specific dates by clicking the <code>Settings</code> icon on desired template, then click <code>Configure and Run Template</code>.\n         This will pop up a window to enter date ranges prior to scheduling the new report. The status of the new report will be shown in the \n         Finished / in-progress reports tab.\n    </p>\n\n    <h2 id="excel-report-template-setup">Excel Report Template Setup</h2>\n\n    <h3>Editing Report Template</h3>\n\n    <p>\n        The template\'s <code>name</code> is used to visually reference the template. It is recommended that a unique name be used for each report, but it is not required. \n        The report template\'s name will be used as the name for all generated reports.\n    </p>\n\n    <p>\n        Choose <code>file</code> is the Excel file that will be used to determine the available named ranges that will be filled in with data by Mango.\n    </p>\n\n    <p>\n        <code>Prevent purge</code> setting will prevent any generated reports from being purged.\n    </p>\n\n    <p>\n        <code>Edit permission</code> is a list of user groups that define which users can edit this template.\n    </p>\n\n    <p>\n        <code>Report read permission</code> is a list of user groups that define who can view any generated reports.\n    </p>\n\n    <h4><b>Time Periods</b></h4>\n\n    <p>\n        Time periods are groups of points linked to time ranges and rollups. Each time range will generate statistics and extract \n        point values over this time range using the rollup (if provided).\n    </p>\n\n    <p>\n        The <code>Time Period</code> is used to determine what values to select for the report. The range can be relative or absolute. In most \n        cases a relative range is appropriate. Relative date ranges can be either based upon "previous" data or "past" data. A <code>Past</code> \n        range includes the given time period ending now. A <code>Previous</code> range also includes the given time period, but its end time is\n        quantized to correspond to the period type. For example, if the period type is "Hour(s)" and number of periods is 1, and\n        the report runs at 18:05, the time span that will be used is from 17:00 (inclusive) to 18:00 (exclusive). If the number \n        of periods were, say, 3, the time span would be from 15:00 to 18:00. Similarly, "Month(s)" starts the time span at midnight\n        on the first day of the previous month and ends it on the last day of the previous month (when the number of periods is 1).\n        Other period types work the same. A week starts on Monday at midnight in accordance with ISO standards. A <code>Current</code> range \n        quantizes the time to the start of the selected period type until the moment the report is run. An <code>Ago</code> range quantizes the\n        time to the start of the selected period which is that many periods ago and quantizes the to the end of that period. So \n        for example you can query on the entire month that was 2 months ago, so if today is in January 2 months ago would be the \n        entire month of November last year.\n    </p>\n\n    <p>\n        The <code>Rollup</code> is a way to group point data into discrete intervals. This is useful for many purposes including reducing the\n         amount of data that the report will generate\n    </p>\n\n    <p>\n        <code>Location for time values</code> is the named range into which the timestamps will be placed. This range must be a group\n         of contiguous cells (ie. part of a column or row). Mango will expand or reduce this named range to fit all the data for the \n         report. This is not required and if not present no timestamps will be inserted into the spreadsheet.\n    </p>\n\n    <p>\n        When you <code>Add a point</code> the point will appear in the table for that time range. After adding the point the named range \n        must be set. This range must be a contiguous set of cells (ie. part of a row or column). It is worth noting that additional ranges \n        can be created based on the assigned range. For example assiging the range: \'last_month_voltage\' to a point in a Time Series will \n        make the statistics for that point available in any ranges defined like \'last_month_voltage.average\' or \'last_month_voltage.sum\' \n        See the Excel Template File setup help for more information.\n    </p>\n\n    <p>\n        <code>Name</code> each time period is given a name to help identify it on the Run now popup.\n    </p>\n\n    <h3>Report Scheduling</h3>\n\n    <p>\n        Reports can be <code>scheduled</code> to run automatically. Enter a custom Cron expression or use the Cron builder tool to generate the \n        appropriate pattern. Scheduled reports for disabled users do not run.\n    </p>\n\n    <h3>Report Emailing</h3>\n\n    <p>\n        Reports can be emailed and will contain the generated Excel file (optionally compressed).\n    </p>\n\n    <p>\n        Select the <code>Email recipients</code> to which to send the report email. Recipients can be mailing lists, system users,\n        or free-form email addresses.\n    </p>\n\n    <h3>Email Templates</h3>\n\n    <p>\n        Email templates are user defined Freemarker templates. These templates can be customized by using the provided template as an\n         example. Any templates placed in the module\'s web/ftl directory will show up in the Template drop down list.\n    </p>\n\n    <h2>Creating Excel Templates</h2>\n\n    <h3>Named Ranges</h3>\n\n    <p>\n        Named ranges are a way to link a cell or group of cells to a name. This module supports named ranges that are either individual\n        cells, column groups or row groups. Mango data can only be filled in horizontally or vertically.\n    </p>\n\n    <p>\n        To create a named range simply select the cells desired and enter a name into the \'Name box\' at the left end of the formula bar.\n    </p>\n\n    <p>\n        When configuring a template in Mango all named ranges will be available to link to a data point.\n    </p>\n\n    <p>\n        If a cell in a named range or that a named range expands to already contains a value, that value will only be modified if there\n        is a value for the point or its rollup at the time corresponding to the cell. Named ranges need not begin on the same row as\n        their time reference. The nth item in the time reference corresponds to n cells advanced in the named range regardless of d\n        irection or starting position. \n    </p>\n\n    <h3>Mango Data Availables</h3>\n\n    <p>\n        Mango can insert various types of data into an Excel named range. Some are single cell while others require a column or row.\n    </p>\n\n    <h4><b>Single Cell Data</b></h4>\n\n    <p>\n        Single cell data can be assigned into cells by creating a named range with a .{data_name} postfix. For example to insert the \n        XID for a data point one would use the named range <code>voltage.xid</code>. Then via the Mango template configuration page one \n        can link a data point to a named range of <code>voltage</code>. This will allow any named range that starts with <code>voltage</code>\n        prefix to be filled in the the available single cell data. The following are a lists of available single cell data:\n    </p>\n\n    <p><b>For any point:</b></p>\n\n    <ul>\n        <li><b>xid</b> - The XID of the linked point</li>\n        <li><b>name</b> - The name of the linked point</li>\n        <li><b>deviceName</b> - The device name of the linked point</li>\n        <li><b>tags.tagKey</b> - The tags are accessible by replacing "tagKey" with the appropriate key</li>\n    </ul>\n\n    <p><b>For Numeric point:</b></p>\n\n    <ul>\n        <li><b>firstValue</b> - The first value of the time period</li>\n        <li><b>firstTime</b> - The date of the first value of the time period</li>\n        <li><b>lastValue</b> - The last value of the time period</li>\n        <li><b>lastTime</b> - The date of the last value of the time period</li>\n        <li><b>minimumValue</b> - The statistical minimum value of the time period</li>\n        <li><b>minimumTime</b> - The date of the statistical minimum value of the time period</li>\n        <li><b>maximumValue</b> - The statistical maximum value of the time period</li>\n        <li><b>maximumTime</b> - The date of the statistical maximum value of the time period</li>\n        <li><b>average</b> - The statistical average value of the time period</li>\n        <li><b>integral</b> - The statistical integral value of the time period</li>\n        <li><b>sum</b> - The statistical sum of the time period</li>\n        <li><b>count</b> - The count of samples within the time period</li>\n        <li><b>delta</b> - The statistical delta of the values in the time period</li>\n    </ul>\n\n    <p><b>For Binary and Multistate Points:</b></p>\n\n    <p>\n        Note that there are also a Multiple Cell area for the Starts and Runtimes list.\n    </p>\n\n    <ul>\n        <li><b>firstValue</b> - The first value of the time period</li>\n        <li><b>firstTime</b> - The date of the first value of the time period</li>\n        <li><b>lastValue</b> - The last value of the time period</li>\n        <li><b>lastTime</b> - The date of the last value of the time period</li>\n        <li><b>count</b> - The count of samples within the time period</li>\n    </ul>\n\n    <p><b>For Alphanumeric Points:</b></p>\n    <ul>\n        <li><b>firstValue</b> - The first value of the time period</li>\n        <li><b>firstTime</b> - The date of the first value of the time period</li>\n        <li><b>lastValue</b> - The last value of the time period</li>\n        <li><b>lastTime</b> - The date of the last value of the time period</li>\n        <li><b>count</b> - The count of samples within the time period</li>\n        <li><b>changes</b> - The number of changes within the time period</li>\n    </ul>\n\n    <h4><b>Multiple Cell Data</b></h4>\n    <p>\n        Multiple cell data can be assigned into cells by creating a named range of multiple cells in a column or row. Mango will \n        overwrite any data in the range and also expand the range to fit the report data. This means that no cells below a column\n         range or to the right of a row range should be used in your template as they may be overwritten. Mango will copy the cell \n         style when it fills down.\n    </p>\n\n    <p><b>Point Timestamps</b></p>\n\n    <p>\n        The point timestamps can optionally be written into a named range. Point timestamp named range should be group of cells in\n         a column or row. The named range is assigned to a Time Series on the template configuration page.\n    </p>\n\n    <p><b>Point Values</b></p>\n\n    <p>\n        Point values can optionally be assigned to a column or row named range.\n    </p>\n\n    <p><b>Binary and Multistate Points</b></p>\n\n    <p>A table of starts and runtimes can be filled in for these points, the available ranges are:</p>\n\n    <ul>\n        <li><b>starts</b> - The number of times this state happened in the period</li>\n        <li><b>runtime</b> - The total duration of this state in the period</li>\n        <li><b>proportion</b> - The proportion to the total time that was spent in this state</li>\n        <li><b>startsAndRuntimeValue</b> - The value of the state</li>\n    </ul>\n\n    <h3>Referenced Formula Expansion</h3>\n\n    <p>Mango will search for and expand any ranges that contain formulas that reference ranges that are assigned to the template.</p>\n\n    <h3>Events</h3>\n\n    <p>\n        Basic support for events is provided. To include events for all data points in the report you can define named ranges that will \n        be populated by any matching events within the Series start and finish times. If you choose to define any of the listed named \n        ranges a query will be done on the Events table which will incur some performance hit. A list of the optional range names is here:\n    </p>\n\n    <ul>\n        <li><b>eventsDeviceName</b> - The device name for the point in the event. (String)</li>\n        <li><b>eventsPointName</b> - The name for the point in the event. (String)</li>\n        <li><b>eventsLevel</b> - Level of event. (String)</li>\n        <li><b>eventsTime</b> - Time of event creation. (Date)</li>\n        <li><b>eventsMessage</b> - Message for the event. (String)</li>\n        <li><b>eventsStatus</b> - Status of the event. (String)</li>\n        <li><b>eventsAcknowledged</b> - Has the event been acknowledged. (Boolean)</li>\n        <li><b>eventsDuration</b> - Duration that the event was active. (Integer milliseconds)</li>\n    </ul>\n    \n    <h3>Post processing script</h3>\n    \n    <p>\n      The post processing script is optional and uses Mango JavaScript to allow modifying the report file or performing any other actions \n      deemed useful after a report is run.  The script will run with the permissions of the Report Template\'s owner.\n      The ExcelReportUtility is available in the post processing script of an Excel report. It enables one to read or write values to\n      cells, and to write values into named ranges. One can "print(ExcelReportUtility);" from the post processing script entry to see\n      a list of functions available. They are, \n    </p>\n    \n    <ul>\n      <li>String getString(int sheet, int column, int row) - get a String representation of the value of the cell</li>\n      <li>String getString(String sheetName, int column, int row) - get a String representation of the value of the cell</li>\n      <li>void setString(int sheet, int column, int row, String value) - set a cell to string type and with a string value</li>\n      <li>void setString(String sheet, int column, int row, String value) - set a cell to string type and with a string value</li>\n      <li>void setNumeric(int sheet, int column, int row, double value) - set a cell to numeric type and with a double value</li>\n      <li>void setNumeric(String sheet, int column, int row, double value) - set a cell to numeric type and with a double value</li>\n      <li>void setDate(int sheet, int column, int row, long value) - set a cell to date type and with a long value</li>\n      <li>void setDate(String sheet, int column, int row, long value) - set a cell to date type and with a long value</li>\n      <li>void openNamedRange(String namedRange, boolean append) - open a named range, optionally begin at its last cell</li>\n      <li>void writeStringToNamedRange(String namedRange, value) - write a string value into the next cell of the named range</li>\n      <li>void writeNumericToNamedRange(String namedRange, value) - write a numeric value into the next cell of the named range</li>\n    </ul>\n    \n    <h3>Email model script</h3>\n    \n    <p>\n      The model that will be passed to the email template processor is passed to the email model script, as with email event handlers, \n      under the variable name \'model\'. This means the script can add anything to the model via model.put(key, value) and then \n      refer to that in the email template.\n    </p>\n\n    <h3>Hints</h3>\n\n    <p>\n        Use named ranges whenever possible. This will ensure that any references are retained when the data in inserted and the range\n         expands or retracts. For example the following formula <code>$A$3*$B$4</code> can be expressed by <code>a_range*b_range</code>. It is also recommended to \n         use named ranges for Chart data and time ranges.\n    </p>\n\n    <h2>Excel Report Instances</h2>\n\n    <p>\n        The finished report list is a sortable list of all reports that have been run. The table is color coded based on the state of\n         the report. Clicking a row in the table will select the report, to select multiple rows use the shift or control keys while \n         clicking rows.\n    </p>\n    \n    <p>\n        The <code>Delete all failed</code> button will remove all failed reports from the system. The <code>Delete selected</code> button will delete any \n        selected reports.\n    </p>\n\n    <ul>\n        <li><b>Export ID (XID)</b> - is the export id for the report</li>\n        <li><b>Report Name</b> - is the name of the report and will be the same as the Template Name</li>\n        <li><b>State</b> - will be one of Running, Finished, Failed, Email Failed, or Queued. If the state is a failed report then clicking on the TBD icon.</li>\n        <li><b>Owner</b> - the user who generated the report</li>\n        <li><b>Run time start</b> - the time at which the report was run</li>\n        <li><b>Duration</b> - the total time it took to run the report</li>\n        <li><b>Prevent purge</b> - a settable checkbox that when set will prevent the report from being purged.</li>\n        <li><b>Report read permission</b> - the permissions for users who can view the report</li>\n        <li>downloads the report</li>\n        <li>views the report in HTML</li>\n        <li>deletes the report instance</li>\n    </ul>\n</div>'}}]);