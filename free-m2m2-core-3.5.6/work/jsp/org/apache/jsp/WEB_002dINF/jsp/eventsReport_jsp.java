/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: jetty/9.4.12.v20180830
 * Generated at: 2019-04-09 20:24:50 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.serotonin.m2m2.Common;
import com.serotonin.m2m2.vo.comment.UserCommentVO;
import com.serotonin.m2m2.rt.event.type.EventType;
import com.serotonin.m2m2.module.ModuleRegistry;
import com.serotonin.m2m2.module.EventTypeDefinition;
import com.serotonin.m2m2.vo.comment.UserCommentVO;

public final class eventsReport_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(17);
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/taglibs-standard-impl-1.2.5.jar!/META-INF/fmt.tld", Long.valueOf(1425993070000L));
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/taglibs-standard-impl-1.2.5.jar!/META-INF/fn.tld", Long.valueOf(1425993070000L));
    _jspx_dependants.put("file:/C:/free-m2m2-core-3.5.6/lib/spring-webmvc-5.0.10.RELEASE.jar", Long.valueOf(1554492895779L));
    _jspx_dependants.put("/WEB-INF/tags/decl.tagf", Long.valueOf(1554492878082L));
    _jspx_dependants.put("/WEB-INF/tags/page.tag", Long.valueOf(1554492878041L));
    _jspx_dependants.put("/WEB-INF/serotonin.tld", Long.valueOf(1554492876912L));
    _jspx_dependants.put("file:/C:/free-m2m2-core-3.5.6/lib/taglibs-standard-impl-1.2.5.jar", Long.valueOf(1554492893592L));
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/log-1.0.jar!/META-INF/taglib.tld", Long.valueOf(1042475258000L));
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/taglibs-standard-impl-1.2.5.jar!/META-INF/c.tld", Long.valueOf(1425993070000L));
    _jspx_dependants.put("file:/C:/free-m2m2-core-3.5.6/lib/log-1.0.jar", Long.valueOf(1554492896226L));
    _jspx_dependants.put("/WEB-INF/tags/page/header.tag", Long.valueOf(1554492878217L));
    _jspx_dependants.put("jar:file:/C:/free-m2m2-core-3.5.6/lib/spring-webmvc-5.0.10.RELEASE.jar!/META-INF/spring.tld", Long.valueOf(1539603408000L));
    _jspx_dependants.put("/WEB-INF/tags/img.tag", Long.valueOf(1554492878013L));
    _jspx_dependants.put("/WEB-INF/jsp/include/tech.jsp", Long.valueOf(1554492877585L));
    _jspx_dependants.put("/WEB-INF/m2m2.tld", Long.valueOf(1554492876925L));
    _jspx_dependants.put("/WEB-INF/jsp/include/userComment.jsp", Long.valueOf(1554492877566L));
    _jspx_dependants.put("/WEB-INF/tags/page/toolbar.tag", Long.valueOf(1554492878175L));
  }

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = new java.util.HashSet<>();
    _jspx_imports_classes.add("com.serotonin.m2m2.vo.comment.UserCommentVO");
    _jspx_imports_classes.add("com.serotonin.m2m2.Common");
    _jspx_imports_classes.add("com.serotonin.m2m2.module.EventTypeDefinition");
    _jspx_imports_classes.add("com.serotonin.m2m2.rt.event.type.EventType");
    _jspx_imports_classes.add("com.serotonin.m2m2.module.ModuleRegistry");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody;

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

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
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.release();
    _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody.release();
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    final java.lang.String _jspx_method = request.getMethod();
    if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method) && !javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET POST or HEAD");
      return;
    }

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write(_jspx_char_array_0);
      out.write('\n');
      out.write('\n');
      //  tag:page
      org.apache.jsp.tag.web.page_tag _jspx_th_tag_005fpage_005f0 = new org.apache.jsp.tag.web.page_tag();
      _jsp_getInstanceManager().newInstance(_jspx_th_tag_005fpage_005f0);
      try {
        _jspx_th_tag_005fpage_005f0.setJspContext(_jspx_page_context);
        // /WEB-INF/jsp/eventsReport.jsp(12,0) name = showHeader type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
        _jspx_th_tag_005fpage_005f0.setShowHeader((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${param.showHeader}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
        // /WEB-INF/jsp/eventsReport.jsp(12,0) name = showToolbar type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
        _jspx_th_tag_005fpage_005f0.setShowToolbar((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${param.showToolbar}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
        // /WEB-INF/jsp/eventsReport.jsp(12,0) name = dwr type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
        _jspx_th_tag_005fpage_005f0.setDwr("EventsDwr,EventInstanceDwr");
        _jspx_th_tag_005fpage_005f0.setJspBody(new Helper( 0, _jspx_page_context, _jspx_th_tag_005fpage_005f0, null));
        _jspx_th_tag_005fpage_005f0.doTag();
      } finally {
        _jsp_getInstanceManager().destroyInstance(_jspx_th_tag_005fpage_005f0);
      }
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }

  private boolean _jspx_meth_fmt_005fmessage_005f0(javax.servlet.jsp.tagext.JspTag _jspx_parent, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f0 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f0_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f0.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f0.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) _jspx_parent));
      // /WEB-INF/jsp/include/userComment.jsp(45,17) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f0.setKey("notes.enterComment");
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

  private boolean _jspx_meth_fmt_005fmessage_005f1(javax.servlet.jsp.tagext.JspTag _jspx_parent, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f1 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f1_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f1.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f1.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) _jspx_parent));
      // /WEB-INF/jsp/include/userComment.jsp(61,82) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f1.setKey("notes.by");
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

  private boolean _jspx_meth_fmt_005fmessage_005f2(javax.servlet.jsp.tagext.JspTag _jspx_parent, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f2 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f2_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f2.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f2.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) _jspx_parent));
      // /WEB-INF/jsp/include/userComment.jsp(84,27) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f2.setKey("notes.addNote");
      int _jspx_eval_fmt_005fmessage_005f2 = _jspx_th_fmt_005fmessage_005f2.doStartTag();
      if (_jspx_th_fmt_005fmessage_005f2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f2);
      _jspx_th_fmt_005fmessage_005f2_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_fmt_005fmessage_005f2, _jsp_getInstanceManager(), _jspx_th_fmt_005fmessage_005f2_reused);
    }
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f3(javax.servlet.jsp.tagext.JspTag _jspx_parent, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f3 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f3_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f3.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f3.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) _jspx_parent));
      // /WEB-INF/jsp/include/userComment.jsp(91,36) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f3.setKey("notes.save");
      int _jspx_eval_fmt_005fmessage_005f3 = _jspx_th_fmt_005fmessage_005f3.doStartTag();
      if (_jspx_th_fmt_005fmessage_005f3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f3);
      _jspx_th_fmt_005fmessage_005f3_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_fmt_005fmessage_005f3, _jsp_getInstanceManager(), _jspx_th_fmt_005fmessage_005f3_reused);
    }
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f4(javax.servlet.jsp.tagext.JspTag _jspx_parent, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f4 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f4_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f4.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f4.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) _jspx_parent));
      // /WEB-INF/jsp/include/userComment.jsp(92,36) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f4.setKey("notes.cancel");
      int _jspx_eval_fmt_005fmessage_005f4 = _jspx_th_fmt_005fmessage_005f4.doStartTag();
      if (_jspx_th_fmt_005fmessage_005f4.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f4);
      _jspx_th_fmt_005fmessage_005f4_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_fmt_005fmessage_005f4, _jsp_getInstanceManager(), _jspx_th_fmt_005fmessage_005f4_reused);
    }
    return false;
  }

  private boolean _jspx_meth_tag_005fimg_005f0(javax.servlet.jsp.tagext.JspTag _jspx_parent, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  tag:img
    org.apache.jsp.tag.web.img_tag _jspx_th_tag_005fimg_005f0 = new org.apache.jsp.tag.web.img_tag();
    _jsp_getInstanceManager().newInstance(_jspx_th_tag_005fimg_005f0);
    try {
      _jspx_th_tag_005fimg_005f0.setJspContext(_jspx_page_context);
      _jspx_th_tag_005fimg_005f0.setParent(_jspx_parent);
      // /WEB-INF/jsp/include/userComment.jsp(100,32) name = png type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005fimg_005f0.setPng("comment");
      // /WEB-INF/jsp/include/userComment.jsp(100,32) name = title type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = java.lang.String deferredMethod = false methodSignature = null
      _jspx_th_tag_005fimg_005f0.setTitle("notes.note");
      _jspx_th_tag_005fimg_005f0.doTag();
    } finally {
      _jsp_getInstanceManager().destroyInstance(_jspx_th_tag_005fimg_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f5(javax.servlet.jsp.tagext.JspTag _jspx_parent, javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f5 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    boolean _jspx_th_fmt_005fmessage_005f5_reused = false;
    try {
      _jspx_th_fmt_005fmessage_005f5.setPageContext(_jspx_page_context);
      _jspx_th_fmt_005fmessage_005f5.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) _jspx_parent));
      // /WEB-INF/jsp/include/userComment.jsp(102,61) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_fmt_005fmessage_005f5.setKey("notes.timeByUsername");
      int _jspx_eval_fmt_005fmessage_005f5 = _jspx_th_fmt_005fmessage_005f5.doStartTag();
      if (_jspx_th_fmt_005fmessage_005f5.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        throw new javax.servlet.jsp.SkipPageException();
      }
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f5);
      _jspx_th_fmt_005fmessage_005f5_reused = true;
    } finally {
      org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_fmt_005fmessage_005f5, _jsp_getInstanceManager(), _jspx_th_fmt_005fmessage_005f5_reused);
    }
    return false;
  }

  private class Helper
      extends org.apache.jasper.runtime.JspFragmentHelper
  {
    private javax.servlet.jsp.tagext.JspTag _jspx_parent;
    private int[] _jspx_push_body_count;

    public Helper( int discriminator, javax.servlet.jsp.JspContext jspContext, javax.servlet.jsp.tagext.JspTag _jspx_parent, int[] _jspx_push_body_count ) {
      super( discriminator, jspContext, _jspx_parent );
      this._jspx_parent = _jspx_parent;
      this._jspx_push_body_count = _jspx_push_body_count;
    }
    public void invoke0( javax.servlet.jsp.JspWriter out ) 
      throws java.lang.Throwable
    {
      javax.servlet.http.HttpServletRequest request = (javax.servlet.http.HttpServletRequest)_jspx_page_context.getRequest();
      javax.servlet.http.HttpServletResponse response = (javax.servlet.http.HttpServletResponse)_jspx_page_context.getResponse();
      out.write('\n');
      out.write(' ');
      out.write(' ');
      out.write('\n');
      out.write('\n');
      out.write(_jspx_char_array_1);
      if (_jspx_meth_fmt_005fmessage_005f0(_jspx_parent, _jspx_page_context))
        return;
      out.write(_jspx_char_array_2);
      out.print( UserCommentVO.TYPE_EVENT );
      out.write(_jspx_char_array_3);
      out.print( UserCommentVO.TYPE_POINT );
      out.write(_jspx_char_array_4);
      if (_jspx_meth_fmt_005fmessage_005f1(_jspx_parent, _jspx_page_context))
        return;
      out.write(_jspx_char_array_5);
      if (_jspx_meth_fmt_005fmessage_005f2(_jspx_parent, _jspx_page_context))
        return;
      out.write(_jspx_char_array_6);
      if (_jspx_meth_fmt_005fmessage_005f3(_jspx_parent, _jspx_page_context))
        return;
      out.write(_jspx_char_array_7);
      if (_jspx_meth_fmt_005fmessage_005f4(_jspx_parent, _jspx_page_context))
        return;
      out.write(_jspx_char_array_8);
      if (_jspx_meth_tag_005fimg_005f0(_jspx_parent, _jspx_page_context))
        return;
      out.write(_jspx_char_array_9);
      if (_jspx_meth_fmt_005fmessage_005f5(_jspx_parent, _jspx_page_context))
        return;
      out.write(_jspx_char_array_10);
      out.write(_jspx_char_array_11);
      //  c:out
      org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_005fout_005f0 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
      boolean _jspx_th_c_005fout_005f0_reused = false;
      try {
        _jspx_th_c_005fout_005f0.setPageContext(_jspx_page_context);
        _jspx_th_c_005fout_005f0.setParent(new javax.servlet.jsp.tagext.TagAdapter((javax.servlet.jsp.tagext.SimpleTag) _jspx_parent));
        // /WEB-INF/jsp/eventsReport.jsp(32,22) name = value type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
        _jspx_th_c_005fout_005f0.setValue( Common.databaseProxy.getType() );
        int _jspx_eval_c_005fout_005f0 = _jspx_th_c_005fout_005f0.doStartTag();
        if (_jspx_th_c_005fout_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
          throw new javax.servlet.jsp.SkipPageException();
        }
        _005fjspx_005ftagPool_005fc_005fout_0026_005fvalue_005fnobody.reuse(_jspx_th_c_005fout_005f0);
        _jspx_th_c_005fout_005f0_reused = true;
      } finally {
        org.apache.jasper.runtime.JspRuntimeLibrary.releaseTag(_jspx_th_c_005fout_005f0, _jsp_getInstanceManager(), _jspx_th_c_005fout_005f0_reused);
      }
      out.write(_jspx_char_array_12);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${sessionUser.id}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_13);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.EventType.EventTypeNames.DATA_POINT']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_14);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.EventType.EventTypeNames.DATA_SOURCE']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_15);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.EventType.EventTypeNames.SYSTEM']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_16);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.SystemEventType.TYPE_SET_POINT_HANDLER_FAILURE']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_17);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.SystemEventType.TYPE_LICENSE_CHECK']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_18);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.SystemEventType.TYPE_UPGRADE_CHECK']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_19);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.EventType.EventTypeNames.PUBLISHER']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_20);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.EventType.EventTypeNames.AUDIT']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_21);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.AuditEventType.TYPE_DATA_SOURCE']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_22);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.AuditEventType.TYPE_DATA_POINT']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_23);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.AuditEventType.TYPE_POINT_EVENT_DETECTOR']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_24);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.AuditEventType.TYPE_EVENT_HANDLER']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_25);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.UserComment.TYPE_EVENT']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_26);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.SystemEventType.TYPE_SYSTEM_STARTUP']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_27);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.SystemEventType.TYPE_SYSTEM_SHUTDOWN']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_28);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${applicationScope['constants.SystemEventType.TYPE_USER_LOGIN']}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_29);
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${param.level}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write(_jspx_char_array_30);
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "/WEB-INF/snippet/view/eventInstance/eventInstanceTable.jsp", out, false);
      out.write(_jspx_char_array_31);
      return;
    }
    public void invoke( java.io.Writer writer )
      throws javax.servlet.jsp.JspException
    {
      javax.servlet.jsp.JspWriter out = null;
      if( writer != null ) {
        out = this.jspContext.pushBody(writer);
      } else {
        out = this.jspContext.getOut();
      }
      try {
        Object _jspx_saved_JspContext = this.jspContext.getELContext().getContext(javax.servlet.jsp.JspContext.class);
        this.jspContext.getELContext().putContext(javax.servlet.jsp.JspContext.class,this.jspContext);
        switch( this.discriminator ) {
          case 0:
            invoke0( out );
            break;
        }
        jspContext.getELContext().putContext(javax.servlet.jsp.JspContext.class,_jspx_saved_JspContext);
      }
      catch( java.lang.Throwable e ) {
        if (e instanceof javax.servlet.jsp.SkipPageException)
            throw (javax.servlet.jsp.SkipPageException) e;
        throw new javax.servlet.jsp.JspException( e );
      }
      finally {
        if( writer != null ) {
          this.jspContext.popBody();
        }
      }
    }
  }
  static char[] _jspx_char_array_0 = "\n\n\n\n\n\n".toCharArray();
  static char[] _jspx_char_array_1 = "\n\n<script type=\"text/javascript\">\n  dojo.require(\"dijit.Dialog\");\n  \n  var commentTypeId;\n  var commentReferenceId;\n  var saveCommentCallback;\n  \n  /**\n   * Open a comment dialog and allow a user defined callback\n  **/\n  function openCommentDialog(typeId, referenceId,callback) {\n      commentTypeId = typeId;\n      commentReferenceId = referenceId;\n      \n      if(typeof(callback) == 'function')\n    	  saveCommentCallback = callback;\n      else\n    	  saveCommentCallback = saveCommentCB;\n      \n      $set(\"commentText\", \"\");\n      dijit.byId(\"CommentDialog\").show();\n      $(\"commentText\").focus();\n  }\n  \n  function saveComment() {\n      var comment = $get(\"commentText\");\n      MiscDwr.addUserComment(commentTypeId, commentReferenceId, comment, saveCommentCallback);\n  }\n  \n  function saveCommentCB(comment) {\n      if (!comment)\n          alert(\"".toCharArray();
  static char[] _jspx_char_array_2 = "\");\n      else {\n          closeCommentDialog();\n          \n          // Add a row for the comment by cloning the template.\n         \n          var commentsNode;\n          if (commentTypeId == ".toCharArray();
  static char[] _jspx_char_array_3 = ")\n              commentsNode = $(\"eventComments\"+ commentReferenceId);\n          else if (commentTypeId == ".toCharArray();
  static char[] _jspx_char_array_4 = ")\n              commentsNode = $(\"pointComments\"+ commentReferenceId);\n          //Since we are now using this outside of the old format\n          if(commentsNode != null){\n        	  var content = $(\"comment_TEMPLATE_\").cloneNode(true);\n              updateTemplateNode(content, comment.ts);\n	          commentsNode.appendChild(content);\n	          $(\"comment\"+ comment.ts +\"UserTime\").innerHTML = comment.prettyTime +\" ".toCharArray();
  static char[] _jspx_char_array_5 = " \"+ encodeHtml(comment.username);\n	          $(\"comment\"+ comment.ts +\"Text\").innerHTML = encodeHtml(comment.comment);\n          }\n      }\n  }\n  \n  function closeCommentDialog() {\n      dijit.byId(\"CommentDialog\").hide();\n  }\n</script>\n<style type=\"text/css\">\n  .dijitDialog {\n      background : #eee;\n      border : 1px solid #999;\n      -moz-border-radius : 5px;\n      padding : 4px;\n  }\n  .dijitDialogTitleBar { display: none; }\n  #eventsTable .row td { vertical-align: top; }\n  #eventsTable .rowAlt td { vertical-align: top; }\n</style>\n\n<div dojoType=\"dijit.Dialog\" id=\"CommentDialog\" bgColor=\"white\" bgOpacity=\"0.5\" toggle=\"fade\" toggleDuration=\"250\">\n  <span class=\"smallTitle\">".toCharArray();
  static char[] _jspx_char_array_6 = "</span>\n  <table>\n    <tr>\n      <td><textarea rows=\"8\" cols=\"50\" id=\"commentText\"></textarea></td>\n    </tr>\n    <tr>\n      <td align=\"center\">\n        <input type=\"button\" value=\"".toCharArray();
  static char[] _jspx_char_array_7 = "\" onclick=\"saveComment();\"/>\n        <input type=\"button\" value=\"".toCharArray();
  static char[] _jspx_char_array_8 = "\" onclick=\"closeCommentDialog();\"/>\n      </td>\n    </tr>\n  </table>\n</div>\n\n<table style=\"display:none;\">\n  <tr id=\"comment_TEMPLATE_\">\n    <td valign=\"top\" width=\"16\">".toCharArray();
  static char[] _jspx_char_array_9 = "</td>\n    <td valign=\"top\">\n      <span id=\"comment_TEMPLATE_UserTime\" class=\"copyTitle\">".toCharArray();
  static char[] _jspx_char_array_10 = "</span><br/>\n      <span id=\"comment_TEMPLATE_Text\"></span>\n    </td>\n  </tr>\n</table>".toCharArray();
  static char[] _jspx_char_array_11 = "\n  <style>\n    .incrementControl { width: 2em; }\n\n    #eventInstanceTable .dgrid-column-id {text-align: center; width: 12em;}\n    #eventInstanceTable .dgrid-column-alarmLevel {width: 18em !important;} /* Important because all cell contents are actually smaller */\n    #eventInstanceTable .dgrid-column-activeTimestampString {text-align: center; width: 15em;}\n    #eventInstanceTable .dgrid-column-messageString {text-align: left; width: 20em;}\n    #eventInstanceTable .dgrid-column-rtnTimestampString {text-align: center; width: 20em;}\n    #eventInstanceTable .dgrid-column-alarmLevel {text-align: center; width: 9em;}\n    #eventInstanceTable .dgrid-column-totalTimeString {text-align: center; width: 12em;}\n    #eventInstanceTable .dgrid-column-acknowledged {text-align: center; width: 19em !important;}/* Important because all cell contents are actually smaller */\n    \n    \n  </style>\n  <script type=\"text/javascript\" src=\"/resources/stores.js\"></script>\n  <script type=\"text/javascript\" src=\"/resources/view/eventInstance/eventInstanceView.js\"></script>\n\n  <script type=\"text/javascript\">\n  var databaseType = '".toCharArray();
  static char[] _jspx_char_array_12 = "';\n  var eventReportUserId = ".toCharArray();
  static char[] _jspx_char_array_13 = "; //Get the UserId\n  \n  //For use on page to compare Event Types 2\n  var constants_DATA_POINT = '".toCharArray();
  static char[] _jspx_char_array_14 = "';\n  var constants_DATA_SOURCE = '".toCharArray();
  static char[] _jspx_char_array_15 = "';\n  var constants_SYSTEM = '".toCharArray();
  static char[] _jspx_char_array_16 = "';\n  var constants_TYPE_SET_POINT_HANDLER_FAILURE = '".toCharArray();
  static char[] _jspx_char_array_17 = "';\n  var constants_TYPE_LICENSE_CHECK = '".toCharArray();
  static char[] _jspx_char_array_18 = "';\n  var constants_TYPE_UPGRADE_CHECK = '".toCharArray();
  static char[] _jspx_char_array_19 = "';\n  var constants_PUBLISHER = '".toCharArray();
  static char[] _jspx_char_array_20 = "';\n  var constants_AUDIT = '".toCharArray();
  static char[] _jspx_char_array_21 = "';\n  var constants_AUDIT_TYPE_DATA_SOURCE = '".toCharArray();
  static char[] _jspx_char_array_22 = "';\n  var constants_AUDIT_TYPE_DATA_POINT = '".toCharArray();
  static char[] _jspx_char_array_23 = "';\n  var constants_AUDIT_TYPE_POINT_EVENT_DETECTOR = '".toCharArray();
  static char[] _jspx_char_array_24 = "';\n  var constants_AUDIT_TYPE_EVENT_HANDLER = '".toCharArray();
  static char[] _jspx_char_array_25 = "';\n  var constants_USER_COMMENT_TYPE_EVENT = \"".toCharArray();
  static char[] _jspx_char_array_26 = "\";\n  var constants_TYPE_SYSTEM_STARTUP = \"".toCharArray();
  static char[] _jspx_char_array_27 = "\";\n  var constants_TYPE_SYSTEM_SHUTDOWN = \"".toCharArray();
  static char[] _jspx_char_array_28 = "\";\n  var constants_TYPE_USER_LOGIN = \"".toCharArray();
  static char[] _jspx_char_array_29 = "\";\n  \n  //Get from the URL Parameter\n  var alarmLevelUrlParameter = '".toCharArray();
  static char[] _jspx_char_array_30 = "';\n  \n  require([\"dojo/parser\",\"dijit/Calendar\",\"dojo/domReady!\"]);\n\n  </script>\n  \n  <div class=\"mangoContainer\">\n  ".toCharArray();
  static char[] _jspx_char_array_31 = "\n  </div>\n".toCharArray();
}
