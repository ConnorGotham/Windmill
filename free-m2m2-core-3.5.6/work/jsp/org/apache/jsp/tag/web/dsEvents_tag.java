/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: jetty/9.4.12.v20180830
 * Generated at: 2019-04-05 20:19:04 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.tag.web;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class dsEvents_tag
    extends javax.servlet.jsp.tagext.SimpleTagSupport
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(14);
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/taglibs-standard-impl-1.2.5.jar!/META-INF/fmt.tld", Long.valueOf(1425993070000L));
    _jspx_dependants.put("/WEB-INF/tags/help.tag", Long.valueOf(1554492877701L));
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/taglibs-standard-impl-1.2.5.jar!/META-INF/fn.tld", Long.valueOf(1425993070000L));
    _jspx_dependants.put("file:/C:/free-m2m2-core-3.5.6/lib/spring-webmvc-5.0.10.RELEASE.jar", Long.valueOf(1554492895779L));
    _jspx_dependants.put("/WEB-INF/tags/decl.tagf", Long.valueOf(1554492878082L));
    _jspx_dependants.put("/WEB-INF/serotonin.tld", Long.valueOf(1554492876912L));
    _jspx_dependants.put("file:/C:/free-m2m2-core-3.5.6/lib/taglibs-standard-impl-1.2.5.jar", Long.valueOf(1554492893592L));
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/log-1.0.jar!/META-INF/taglib.tld", Long.valueOf(1042475258000L));
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/taglibs-standard-impl-1.2.5.jar!/META-INF/c.tld", Long.valueOf(1425993070000L));
    _jspx_dependants.put("file:/C:/free-m2m2-core-3.5.6/lib/log-1.0.jar", Long.valueOf(1554492896226L));
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/spring-webmvc-5.0.10.RELEASE.jar!/META-INF/spring.tld", Long.valueOf(1539603408000L));
    _jspx_dependants.put("/WEB-INF/tags/img.tag", Long.valueOf(1554492878013L));
    _jspx_dependants.put("/WEB-INF/m2m2.tld", Long.valueOf(1554492876925L));
    _jspx_dependants.put("/WEB-INF/tags/alarmLevelOptions.tag", Long.valueOf(1554492877912L));
  }

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = null;
  }

  private javax.servlet.jsp.JspContext jspContext;
  private java.io.Writer _jspx_sout;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fchoose;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fwhen_0026_005ftest;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fotherwise;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fforEach_0026_005fvar_005fitems;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fm2m2_005ftranslate_0026_005fmessage_005fnobody;

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public void setJspContext(javax.servlet.jsp.JspContext ctx) {
    super.setJspContext(ctx);
    java.util.ArrayList _jspx_nested = null;
    java.util.ArrayList _jspx_at_begin = null;
    java.util.ArrayList _jspx_at_end = null;
    this.jspContext = new org.apache.jasper.runtime.JspContextWrapper(this, ctx, _jspx_nested, _jspx_at_begin, _jspx_at_end, null);
  }

  public javax.servlet.jsp.JspContext getJspContext() {
    return this.jspContext;
  }

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    return _jsp_instancemanager;
  }

  private void _jspInit(javax.servlet.ServletConfig config) {
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(config);
    _005fjspx_005ftagPool_005fc_005fchoose = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(config);
    _005fjspx_005ftagPool_005fc_005fwhen_0026_005ftest = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(config);
    _005fjspx_005ftagPool_005fc_005fotherwise = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(config);
    _005fjspx_005ftagPool_005fc_005fforEach_0026_005fvar_005fitems = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(config);
    _005fjspx_005ftagPool_005fm2m2_005ftranslate_0026_005fmessage_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(config);
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(config.getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(config);
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.release();
    _005fjspx_005ftagPool_005fc_005fchoose.release();
    _005fjspx_005ftagPool_005fc_005fwhen_0026_005ftest.release();
    _005fjspx_005ftagPool_005fc_005fotherwise.release();
    _005fjspx_005ftagPool_005fc_005fforEach_0026_005fvar_005fitems.release();
    _005fjspx_005ftagPool_005fm2m2_005ftranslate_0026_005fmessage_005fnobody.release();
  }

  public void doTag() throws javax.servlet.jsp.JspException, java.io.IOException {
    javax.servlet.jsp.PageContext _jspx_page_context = (javax.servlet.jsp.PageContext)jspContext;
    javax.servlet.http.HttpServletRequest request = (javax.servlet.http.HttpServletRequest) _jspx_page_context.getRequest();
    javax.servlet.http.HttpServletResponse response = (javax.servlet.http.HttpServletResponse) _jspx_page_context.getResponse();
    javax.servlet.http.HttpSession session = _jspx_page_context.getSession();
    javax.servlet.ServletContext application = _jspx_page_context.getServletContext();
    javax.servlet.ServletConfig config = _jspx_page_context.getServletConfig();
    javax.servlet.jsp.JspWriter out = jspContext.getOut();
    _jspInit(config);
    jspContext.getELContext().putContext(javax.servlet.jsp.JspContext.class,jspContext);

    try {
      out.write(_jspx_char_array_0);
      if (_jspx_meth_tag_005fimg_005f0(_jspx_page_context))
        return;
      out.write(_jspx_char_array_1);
      if (_jspx_meth_fmt_005fmessage_005f0(_jspx_page_context))
        return;
      out.write(_jspx_char_array_1);
      if (_jspx_meth_tag_005fhelp_005f0(_jspx_page_context))
        return;
      out.write(_jspx_char_array_2);
      if (_jspx_meth_c_005fchoose_005f0(_jspx_page_context))
        return;
      out.write(_jspx_char_array_12);
    } catch( java.lang.Throwable t ) {
      if( t instanceof javax.servlet.jsp.SkipPageException )
          throw (javax.servlet.jsp.SkipPageException) t;
      if( t instanceof java.io.IOException )
          throw (java.io.IOException) t;
      if( t instanceof java.lang.IllegalStateException )
          throw (java.lang.IllegalStateException) t;
      if( t instanceof javax.servlet.jsp.JspException )
          throw (javax.servlet.jsp.JspException) t;
      throw new javax.servlet.jsp.JspException(t);
    } finally {
      jspContext.getELContext().putContext(javax.servlet.jsp.JspContext.class,super.getJspContext());
      ((org.apache.jasper.runtime.JspContextWrapper) jspContext).syncEndTagFile();
      _jspDestroy();
    }
  }

  private boolean _jspx_meth_tag_005fimg_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  tag:img
    org.apache.jsp.tag.web.img_tag _jspx_th_tag_005fimg_005f0 = new org.apache.jsp.tag.web.img_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_tag_005fimg_005f0);
    try {
      _jspx_th_tag_005fimg_005f0.setJspContext(_jspx_page_context);
      _jspx_th_tag_005fimg_005f0.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) this ));      // /WEB-INF/tags/dsEvents.tag(8,4) name = png type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005fimg_005f0.setPng("flag_white");
      _jspx_th_tag_005fimg_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_tag_005fimg_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f0 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f0_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f0.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f0.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) this ));      // /WEB-INF/tags/dsEvents.tag(9,4) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f0.setKey("dsEdit.events.alarmLevels");
      int _jspx_eval_fmt_005fmessage_005f0 = _jspx_th_fmt_005fmessage_005f0.doStartTag();
      if (_jspx_th_fmt_005fmessage_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f0);
      _jspx_th_fmt_005fmessage_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_fmt_005fmessage_005f0, _jsp_getInstanceManager(), _jspx_th_fmt_005fmessage_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_tag_005fhelp_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  tag:help
    org.apache.jsp.tag.web.help_tag _jspx_th_tag_005fhelp_005f0 = new org.apache.jsp.tag.web.help_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_tag_005fhelp_005f0);
    try {
      _jspx_th_tag_005fhelp_005f0.setJspContext(_jspx_page_context);
      _jspx_th_tag_005fhelp_005f0.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) this ));      // /WEB-INF/tags/dsEvents.tag(10,4) name = id type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005fhelp_005f0.setId("alarms");
      _jspx_th_tag_005fhelp_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_tag_005fhelp_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_c_005fchoose_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:choose
    org.apache.taglibs.standard.tag.common.core.ChooseTag _jspx_th_c_005fchoose_005f0 = (org.apache.taglibs.standard.tag.common.core.ChooseTag) _005fjspx_005ftagPool_005fc_005fchoose.get(org.apache.taglibs.standard.tag.common.core.ChooseTag.class);
    boolean _jspx_th_c_005fchoose_005f0_reused = false;
    try {
      _jspx_th_c_005fchoose_005f0.setPageContext(_jspx_page_context);
      _jspx_th_c_005fchoose_005f0.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) this ));      int _jspx_eval_c_005fchoose_005f0 = _jspx_th_c_005fchoose_005f0.doStartTag();
      if (_jspx_eval_c_005fchoose_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          out.write(_jspx_char_array_1);
          if (_jspx_meth_c_005fwhen_005f0(_jspx_th_c_005fchoose_005f0, _jspx_page_context))
            return true;
          out.write(_jspx_char_array_1);
          if (_jspx_meth_c_005fotherwise_005f0(_jspx_th_c_005fchoose_005f0, _jspx_page_context))
            return true;
          out.write('\n');
          out.write(' ');
          out.write(' ');
          int evalDoAfterBody = _jspx_th_c_005fchoose_005f0.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_c_005fchoose_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005fc_005fchoose.reuse(_jspx_th_c_005fchoose_005f0);
      _jspx_th_c_005fchoose_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fchoose_005f0, _jsp_getInstanceManager(), _jspx_th_c_005fchoose_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_c_005fwhen_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_005fchoose_005f0, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:when
    org.apache.taglibs.standard.tag.rt.core.WhenTag _jspx_th_c_005fwhen_005f0 = (org.apache.taglibs.standard.tag.rt.core.WhenTag) _005fjspx_005ftagPool_005fc_005fwhen_0026_005ftest.get(org.apache.taglibs.standard.tag.rt.core.WhenTag.class);
    boolean _jspx_th_c_005fwhen_005f0_reused = false;
    try {
      _jspx_th_c_005fwhen_005f0.setPageContext(_jspx_page_context);
      _jspx_th_c_005fwhen_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_005fchoose_005f0);
      // /WEB-INF/tags/dsEvents.tag(15,4) name = test type = boolean reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fwhen_005f0.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${empty dataSource.eventTypes}", boolean.class, (javax.servlet.jsp.PageContext)this.getJspContext(), null)).booleanValue());
      int _jspx_eval_c_005fwhen_005f0 = _jspx_th_c_005fwhen_005f0.doStartTag();
      if (_jspx_eval_c_005fwhen_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          out.write(_jspx_char_array_3);
          if (_jspx_meth_fmt_005fmessage_005f1(_jspx_th_c_005fwhen_005f0, _jspx_page_context))
            return true;
          out.write(_jspx_char_array_4);
          int evalDoAfterBody = _jspx_th_c_005fwhen_005f0.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_c_005fwhen_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005fc_005fwhen_0026_005ftest.reuse(_jspx_th_c_005fwhen_005f0);
      _jspx_th_c_005fwhen_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fwhen_005f0, _jsp_getInstanceManager(), _jspx_th_c_005fwhen_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_c_005fwhen_005f0, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f1 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f1_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f1.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_005fwhen_005f0);
      // /WEB-INF/tags/dsEvents.tag(16,17) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f1.setKey("dsEdit.events.noEvents");
      int _jspx_eval_fmt_005fmessage_005f1 = _jspx_th_fmt_005fmessage_005f1.doStartTag();
      if (_jspx_th_fmt_005fmessage_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f1);
      _jspx_th_fmt_005fmessage_005f1_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_fmt_005fmessage_005f1, _jsp_getInstanceManager(), _jspx_th_fmt_005fmessage_005f1_reused);
    }
    return false;
  }

  private boolean _jspx_meth_c_005fotherwise_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_005fchoose_005f0, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:otherwise
    org.apache.taglibs.standard.tag.common.core.OtherwiseTag _jspx_th_c_005fotherwise_005f0 = (org.apache.taglibs.standard.tag.common.core.OtherwiseTag) _005fjspx_005ftagPool_005fc_005fotherwise.get(org.apache.taglibs.standard.tag.common.core.OtherwiseTag.class);
    boolean _jspx_th_c_005fotherwise_005f0_reused = false;
    try {
      _jspx_th_c_005fotherwise_005f0.setPageContext(_jspx_page_context);
      _jspx_th_c_005fotherwise_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_005fchoose_005f0);
      int _jspx_eval_c_005fotherwise_005f0 = _jspx_th_c_005fotherwise_005f0.doStartTag();
      if (_jspx_eval_c_005fotherwise_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          out.write(_jspx_char_array_5);
          if (_jspx_meth_c_005fforEach_005f0(_jspx_th_c_005fotherwise_005f0, _jspx_page_context))
            return true;
          out.write(_jspx_char_array_1);
          int evalDoAfterBody = _jspx_th_c_005fotherwise_005f0.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_c_005fotherwise_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005fc_005fotherwise.reuse(_jspx_th_c_005fotherwise_005f0);
      _jspx_th_c_005fotherwise_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fotherwise_005f0, _jsp_getInstanceManager(), _jspx_th_c_005fotherwise_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_c_005fforEach_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_005fotherwise_005f0, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:forEach
    org.apache.taglibs.standard.tag.rt.core.ForEachTag _jspx_th_c_005fforEach_005f0 = (org.apache.taglibs.standard.tag.rt.core.ForEachTag) _005fjspx_005ftagPool_005fc_005fforEach_0026_005fvar_005fitems.get(org.apache.taglibs.standard.tag.rt.core.ForEachTag.class);
    boolean _jspx_th_c_005fforEach_005f0_reused = false;
    try {
      _jspx_th_c_005fforEach_005f0.setPageContext(_jspx_page_context);
      _jspx_th_c_005fforEach_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_005fotherwise_005f0);
      // /WEB-INF/tags/dsEvents.tag(19,6) name = items type = javax.el.ValueExpression reqTime = true required = false fragment = false deferredValue = true expectedTypeName = java.lang.Object deferredMethod = false methodSignature = null
      _jspx_th_c_005fforEach_005f0.setItems(new org.apache.jasper.el.JspValueExpression("/WEB-INF/tags/dsEvents.tag(19,6) '${dataSource.eventTypes}'",_jsp_getExpressionFactory().createValueExpression(this.getJspContext().getELContext(),"${dataSource.eventTypes}",java.lang.Object.class)).getValue(this.getJspContext().getELContext()));
      // /WEB-INF/tags/dsEvents.tag(19,6) name = var type = java.lang.String reqTime = false required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fforEach_005f0.setVar("type");
      int[] _jspx_push_body_count_c_005fforEach_005f0 = new int[] { 0 };
      try {
        int _jspx_eval_c_005fforEach_005f0 = _jspx_th_c_005fforEach_005f0.doStartTag();
        if (_jspx_eval_c_005fforEach_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
          do {
            out.write(_jspx_char_array_6);
            if (_jspx_meth_m2m2_005ftranslate_005f0(_jspx_th_c_005fforEach_005f0, _jspx_page_context, _jspx_push_body_count_c_005fforEach_005f0))
              return true;
            out.write(_jspx_char_array_7);
            if (_jspx_meth_tag_005falarmLevelOptions_005f0(_jspx_th_c_005fforEach_005f0, _jspx_page_context, _jspx_push_body_count_c_005fforEach_005f0))
              return true;
            out.write(_jspx_char_array_8);
            if (_jspx_meth_tag_005fimg_005f1(_jspx_th_c_005fforEach_005f0, _jspx_page_context, _jspx_push_body_count_c_005fforEach_005f0))
              return true;
            out.write(_jspx_char_array_9);
            out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${type.alarmLevel}", java.lang.String.class, (javax.servlet.jsp.PageContext)this.getJspContext(), null));
            out.write(_jspx_char_array_10);
            out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${type.typeRef2}", java.lang.String.class, (javax.servlet.jsp.PageContext)this.getJspContext(), null));
            out.write(_jspx_char_array_11);
            int evalDoAfterBody = _jspx_th_c_005fforEach_005f0.doAfterBody();
            if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
              break;
          } while (true);
        }
        if (_jspx_th_c_005fforEach_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
          throw new javax.servlet.jsp.SkipPageException();
        }
      } catch (java.lang.Throwable _jspx_exception) {
        while (_jspx_push_body_count_c_005fforEach_005f0[0]-- > 0)
          out = _jspx_page_context.popBody();
        _jspx_th_c_005fforEach_005f0.doCatch(_jspx_exception);
      } finally {
        _jspx_th_c_005fforEach_005f0.doFinally();
      }
      _005fjspx_005ftagPool_005fc_005fforEach_0026_005fvar_005fitems.reuse(_jspx_th_c_005fforEach_005f0);
      _jspx_th_c_005fforEach_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fforEach_005f0, _jsp_getInstanceManager(), _jspx_th_c_005fforEach_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_m2m2_005ftranslate_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_005fforEach_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_c_005fforEach_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  m2m2:translate
    com.serotonin.m2m2.web.taglib.TranslateTag _jspx_th_m2m2_005ftranslate_005f0 = (com.serotonin.m2m2.web.taglib.TranslateTag) _005fjspx_005ftagPool_005fm2m2_005ftranslate_0026_005fmessage_005fnobody.get(com.serotonin.m2m2.web.taglib.TranslateTag.class);
    boolean _jspx_th_m2m2_005ftranslate_005f0_reused = false;
    try {
      _jspx_th_m2m2_005ftranslate_005f0.setPageContext(_jspx_page_context);
      _jspx_th_m2m2_005ftranslate_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_005fforEach_005f0);
      // /WEB-INF/tags/dsEvents.tag(21,17) name = message type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_m2m2_005ftranslate_005f0.setMessage((com.serotonin.m2m2.i18n.TranslatableMessage) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${type.description}", com.serotonin.m2m2.i18n.TranslatableMessage.class, (javax.servlet.jsp.PageContext)this.getJspContext(), null));
      int _jspx_eval_m2m2_005ftranslate_005f0 = _jspx_th_m2m2_005ftranslate_005f0.doStartTag();
      if (_jspx_th_m2m2_005ftranslate_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005fm2m2_005ftranslate_0026_005fmessage_005fnobody.reuse(_jspx_th_m2m2_005ftranslate_005f0);
      _jspx_th_m2m2_005ftranslate_005f0_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_m2m2_005ftranslate_005f0, _jsp_getInstanceManager(), _jspx_th_m2m2_005ftranslate_005f0_reused);
    }
    return false;
  }

  private boolean _jspx_meth_tag_005falarmLevelOptions_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_005fforEach_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_c_005fforEach_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  tag:alarmLevelOptions
    org.apache.jsp.tag.web.alarmLevelOptions_tag _jspx_th_tag_005falarmLevelOptions_005f0 = new org.apache.jsp.tag.web.alarmLevelOptions_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_tag_005falarmLevelOptions_005f0);
    try {
      _jspx_th_tag_005falarmLevelOptions_005f0.setJspContext(_jspx_page_context);
      _jspx_th_tag_005falarmLevelOptions_005f0.setParent(_jspx_th_c_005fforEach_005f0);
      // /WEB-INF/tags/dsEvents.tag(23,12) name = id type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005falarmLevelOptions_005f0.setId((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("alarmLevel${type.typeRef2}", java.lang.String.class, (javax.servlet.jsp.PageContext)this.getJspContext(), null));
      // /WEB-INF/tags/dsEvents.tag(23,12) name = onchange type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005falarmLevelOptions_005f0.setOnchange((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("alarmLevelChanged(${type.typeRef2})", java.lang.String.class, (javax.servlet.jsp.PageContext)this.getJspContext(), null));
      // /WEB-INF/tags/dsEvents.tag(23,12) name = value type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005falarmLevelOptions_005f0.setValue((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${type.alarmLevel}", java.lang.String.class, (javax.servlet.jsp.PageContext)this.getJspContext(), null));
      _jspx_th_tag_005falarmLevelOptions_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_tag_005falarmLevelOptions_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_tag_005fimg_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_c_005fforEach_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_c_005fforEach_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  tag:img
    org.apache.jsp.tag.web.img_tag _jspx_th_tag_005fimg_005f1 = new org.apache.jsp.tag.web.img_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_tag_005fimg_005f1);
    try {
      _jspx_th_tag_005fimg_005f1.setJspContext(_jspx_page_context);
      _jspx_th_tag_005fimg_005f1.setParent(_jspx_th_c_005fforEach_005f0);
      // /WEB-INF/tags/dsEvents.tag(24,12) name = id type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005fimg_005f1.setId((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("alarmLevelImg${type.typeRef2}", java.lang.String.class, (javax.servlet.jsp.PageContext)this.getJspContext(), null));
      // /WEB-INF/tags/dsEvents.tag(24,12) name = png type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005fimg_005f1.setPng("flag_grey");
      // /WEB-INF/tags/dsEvents.tag(24,12) name = style type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005fimg_005f1.setStyle("display:none;");
      _jspx_th_tag_005fimg_005f1.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_tag_005fimg_005f1);
    }
    return false;
  }
  static char[] _jspx_char_array_0 = "<table width=\"100%\">\n  <tr><td class=\"smallTitle\">\n    ".toCharArray();
  static char[] _jspx_char_array_1 = "\n    ".toCharArray();
  static char[] _jspx_char_array_2 = "\n  </td></tr>\n</table>\n<table cellspacing=\"1\">\n  ".toCharArray();
  static char[] _jspx_char_array_3 = "\n      <tr><td><b>".toCharArray();
  static char[] _jspx_char_array_4 = "</b></td></tr>\n    ".toCharArray();
  static char[] _jspx_char_array_5 = "\n      ".toCharArray();
  static char[] _jspx_char_array_6 = "\n        <tr>\n          <td><b>".toCharArray();
  static char[] _jspx_char_array_7 = "</b></td>\n          <td>\n            ".toCharArray();
  static char[] _jspx_char_array_8 = "\n            ".toCharArray();
  static char[] _jspx_char_array_9 = "\n            <script type=\"text/javascript\">setAlarmLevelImg(".toCharArray();
  static char[] _jspx_char_array_10 = ", 'alarmLevelImg".toCharArray();
  static char[] _jspx_char_array_11 = "');</script>\n          </td>\n        </tr>\n      ".toCharArray();
  static char[] _jspx_char_array_12 = "\n</table>".toCharArray();
}
