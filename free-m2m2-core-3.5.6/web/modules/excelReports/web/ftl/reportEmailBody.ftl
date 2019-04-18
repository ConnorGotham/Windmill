<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html>
<head>
  <title><@fmt key="header.title"/></title>
  
  <!-- Meta -->
  <meta http-equiv="content-type" content="application/xhtml+xml;charset=utf-8"/>
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <meta name="Copyright" content="&copy; 2019 Infinite Automation Systems Inc. All rights reserved."/>
  
  <!-- Style -->
  <link rel="icon" href="images/favicon.ico"/>
  <link rel="shortcut icon" href="images/favicon.ico"/>
  <style type="text/css">
    .bod {
      margin: 10px;
      padding: 5px;
      background-color: #FFFFFF;
    }
    .bod, td, th {
      font-family: Verdana, Arial, Helvetica, sans-serif;
      font-size: 11px;
      color: #000000;
    }
    .label {
      font-weight: bold;
      text-align: right;
      padding-right: 10px;
    }
    .stats {
      background-color: #F0F0F0;
      vertical-align: top;
      padding-bottom: 5px;
    }
    .rowHeader td {
      font-weight: bold;
      color: #FFFFFF;
      background-color: #F07800;
      text-align: center;
      white-space: nowrap;
      padding: 3px 10px 3px 10px;
    }
    .row td, .rowAlt td {
      color: #000000;
      padding: 3px;
    }
    .row td {
      background-color: #F0F0F0;
    }
    .rowAlt td {
      background-color: #DCDCDC;
    }
    .copyTitle {
      color: #804000;
      font-size: 10px;
    }
  </style>
</head>

<body>
<div class="bod">
  <table class='stats' width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td>
        <table>
          <tr>
            <td colspan="2" style="padding-left: 5px"><h1>${report.name}</h1></td>
          </tr>
          <tr>
          	<td class="label"><@fmt key="users.username"/></td>
          	<td>${username}</td>
          </tr>
          <tr>
            <td class="label"><@fmt key="excelreports.runTimeStart"/></td>
            <td>${reportRunTime}</td>
          </tr>
          <tr>
            <td class="label"><@fmt key="excelreports.runDuration"/></td>
            <td>${reportRunDuration}</td>
          </tr>
          <tr>
            <td class="label"><@fmt key="excelreports.reportRecords"/></td>
            <td>${reportRecordCount}</td>
          </tr>
        </table>
      </td>
      <td valign="top" align="right"><img src="${inline}<@img logo="true"/>" alt="Logo"/></td>
    </tr>
  </table>
  <hr></hr>
  <h2><@fmt key="excelreports.timeSeries"/></h2>
  <#list timeSeries as series>
  <h3><span>${series.namedRange}</span>&nbsp;-&nbsp;${series.startDate} <@fmt key="excelreports.dateRangeTo"/> ${series.endDate}</h3>
	  
  <table cellspacing="1" cellpadding="0" width="100%">
    <tr class="rowHeader">
	  <td><@fmt key="common.name"/></td>
	  <td><@fmt key="common.xid"/></td>
	  <td><@fmt key="dsEdit.deviceName"/></td>
	</tr>
	<#assign row = 1/>
	<#list series.points as point>
    <#assign row = row + 1/>
    <#if row == 2><#assign row = 0/></#if>
	<tr class="row<#if row == 1>Alt</#if>">
	  <td align="center">${point.name}</td>
      <td align="center">${point.xid}</td>
      <td align="center">${point.deviceName}</td>
    </tr>
    </#list>
    </table>
	</#list>
	<table width="100%" cellspacing="0" cellpadding="0" border="0">
	  <tr><td colspan="2">&nbsp;</td></tr>
	  <tr>
	    <td colspan="2" class="copyTitle" align="center"><a href="https://www.infiniteautomation.com">&copy;2006-2019 Infinite Automation Systems Inc., <@fmt key="footer.rightsReserved"/></a></td>
	  </tr>
	</table>
  </body>
</html>