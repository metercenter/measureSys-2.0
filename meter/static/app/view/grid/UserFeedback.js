Ext.define('app.view.grid.UserFeedback',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.userFeedback',

	requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
        'app.model.grid.UserFeedbackModel',
        'app.store.grid.UserFeedbackStore'
    ],
    title: '用户反馈信息',
    id: 'userfeedbackgrid',
    padding: '10 10',
    height: 300,
    initComponent: function(){
      var store = Ext.create('store.userFeedbackStore');
    	Ext.apply(this, {
            store: store,
            columns: [{ 
                text: '客户',
                sortable: true,
                dataIndex: 'user_company',
//                flex: 1
                width: '20%'
            },{
                text: '反馈时间',
                sortable: true,
                dataIndex: 'report_time',
                width: '20%'
            },{
                text: '处理时限',
                sortable: true,
                dataIndex: 'solution_deadline',
                width: '20%'
            },{
                text: '问题描述',
                sortable: true,
                dataIndex: 'problem',
                width: '20%'
            },{
                text: '处理结果',
                sortable: true,
                dataIndex: 'solution_result',
                width: '20%'
//                formatter: 'date("m/d/Y")'
            }],

            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
		
		this.callParent();
    }
});