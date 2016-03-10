var headerBackgroundColor = "url(/static/resources/images/headerbackground.png) repeat-x", headerHeight = 67, headerColorInactive = "#BCBCBC", headerColorActive = "#FFFFFF", footerHeight = 24;

var headerLogo = new Ext.Component({
  autoEl : {
   tag : "img",
   src : "/static/resources/images/logo.png",
   alt : "Cisco",
   id : "header-logo",
   width: "50px",
   height: "40px",
   style : {
     margin: "10px",
     background : "none",
     float: "left"
    }
  }
 });

var headerTitle = new Ext.Component({
  id : "header-title",
  autoEl : {
   tag : "h1",
   html : '计量管理系统'
  }
 });



var headerLogout = new Ext.Component({
  id : "header-logout",
  autoEl : {
    tag : "h4",
    html : '退出',
    onclick :"window.location = '/logout'"
   }
 });

var headerRefresh = new Ext.Component({
  id : "header-refresh",
  autoEl : {
    tag : "h4",
    html : '刷新',
    onclick :"window.location = '/main'"
   }
 });


var headerPanel = new Ext.Panel({
  id : "header",
  region : "north",
  height : headerHeight,
  border : false,
  items : [headerLogo, headerTitle,  headerLogout, headerRefresh],
  bodyStyle : {
   background : headerBackgroundColor,
   width : "100%"
  }
 });


Ext.define('app.view.main.Main', {
    extend: 'Ext.container.Container',
    layout: 'border',
    requires:['app.view.main.MenuBrowseArea'],
    id : "titlePage",
    viewModel: {
      data: {
        companyName: '金昇'
      }
    },
    items: [
    headerPanel
    , {
        region: 'center',
        xtype: 'menuBrowseArea'
    }, {
        region:'south',
        xtype : 'component',
        id: "South",
        height: 8
    }]

});
