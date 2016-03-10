Ext.define('app.view.main.MenuBrowseArea', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menuBrowseArea',
    requires:[
              'app.view.main.Menu',
              'app.view.main.BrowseArea',
              'app.view.grid.WarnInformationTotal',
              'app.controller.main.MenuController'              
             ],
    controller: 'menuController',
    layout: 'border',
    id: 'menuBrowseArea',


    items: [{
    	region: 'north',
    	xtype: 'menubar'
    },
    {
    	region: 'center',
        xtype: 'panel', // TabPanel itself has no title
        activeTab: 0,      // First tab active by default
        layout: 'fit',
        id: 'menuArea',
        items: [{
            title: '企业简介',
            xtype: 'browseArea',
        },{
            title: '报警信息',
            xtype: 'warnInformationTotal',
            hidden: true
        }]

	}]
});