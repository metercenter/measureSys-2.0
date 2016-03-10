Ext.define('app.view.main.OperationArea',{
	extend: 'Ext.container.Container',
	alias: 'widget.operationArea',

    requires: ['app.view.introduction.Introduction',
               'app.view.container.MeterContainer',
               'app.view.dataChart.DataChart',
               'app.view.grid.MessageGrid',
               'app.view.grid.UserFeedback',
               'app.view.diagram.UserTopology',
               'app.view.container.Container',
               'app.view.container.ChartContainer',
               'app.view.container.CompanyContainer',
               'app.view.container.GasCoperationContainer',
               'app.view.container.IdentifyContainer'
              ],

	layout: 'border',
	
	items:[{
        region: 'south',
        title: '操作台',
        collapsible: true,
        collapsed: true,
        split: true,
        height: 80,
        items:[{
            id: 'addUserBtn',
            xtype: 'button',
//            icon: null,
//            glyph: 72,
//            scale: 'medium',
            style : 'margin:10px 5px 10px 30px;',
            text: '添加客户'
        },{
          id: 'addMeterBtn',
//          padding : '15 15', 
          xtype: 'button',
//          icon: null,
//          glyph: 72,
//          scale: 'medium',
          style : 'margin:10px 5px 10px 30px;',
          text: '添加流量计'
        },{
//        padding : '15 15', 
          xtype: 'button',
//        icon: null,
//        glyph: 72,
//        scale: 'medium',
          id: 'exportData',
          style : 'margin:10px 5px 10px 30px;',
          text: '导出数据'
        },{
//        padding : '15 15', 
          xtype: 'button',
//        icon: null,
//        glyph: 72,
//        scale: 'medium',
          id:'feedbackBtn',
          style : 'margin:10px 5px 10px 30px;',
          text: '添加用户反馈信息'
        },{
          id: 'addIntroducationBtn',
//        padding : '15 15', 
          xtype: 'button',
//        icon: null,
//        glyph: 72,
//        scale: 'medium',
//          id: 'changeCompanyIntro',
        style : 'margin:10px 5px 10px 30px;',
        text: '修改公司介绍'
        }]
    }, {
    	region: 'center',
        xtype: 'panel', // TabPanel itself has no title
//        activeTab: 0,      // First tab active by default
        id: 'operationarea',
        title: '功能',
        autoScroll: true,
        items: [{
            title: '企业简介',
            xtype: 'companyContainer',
            hidden: true
        },{
            title: '流量计数据信息',
            xtype: 'meterContainer',
            hidden: true
        },{
            title: '报警信息总览',
            xtype: 'messagegrid',
            hidden: true
        }, {
            title: '部署管理及统计信息',
            xtype: 'chartContainer',
            hidden: true
        }, {
            title: '流量计检定',
            xtype: 'identifyContainer',
            hidden: true
        },{
            title: '燃气公司',
            xtype: 'gasCoperationContainer',
            hidden: true
        }]

	}]

});