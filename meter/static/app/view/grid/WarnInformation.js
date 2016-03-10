Ext.define('app.view.grid.WarnInformation',{
  extend: 'Ext.grid.Panel',
  alias: 'widget.warnInformation',
  requires: [
             'Ext.data.*',
             'Ext.grid.*',
             'Ext.util.*',
             'Ext.toolbar.Paging',
             'Ext.ux.ProgressBarPager',
             'app.model.grid.WarnInformationModel',
             'app.store.grid.WarnInformationStore'
         ],
  
  id:'warnInformation',
  title:'重要报警信息',
  padding:'10 10',
  height: 400,
  initComponent: function(){
    var store = Ext.create('store.warnInformationStore');
    Ext.apply(this, {
          store: store,
          columns: [{
              text: '企业名称',
              sortable: true,
//              formatter: 'usMoney',
              dataIndex: 'company',
              width:'12%'
          },{ 
            text: '用户',
            sortable: true,
            dataIndex: 'user_id',
//            flex: 1
            width:'12%'
          },{
              text: '表计信息',
              sortable: true,
              renderer: this.changeRenderer,
              dataIndex: 'meter_info',
              width:'12%'
          },{
              text: '报警信息',
              sortable: true,
              renderer: this.pctChangeRenderer,
              dataIndex: 'warn_info',
              width:'12%'
          },{
            text: '报警级别',
            sortable: true,
            renderer: this.pctChangeRenderer,
            dataIndex: 'warn_level',
            width:'12%'
          },{
              text: '处理方法',
              sortable: true,
              dataIndex: 'solution',
              width:'12%'
//              formatter: 'date("m/d/Y")'
          },{
            text: '报警时间',
            sortable: true,
            dataIndex: 'warn_date',
            width:'12%'
//            formatter: 'date("m/d/Y")'
          },{
            
              text: '其他',
              sortable: true,
              dataIndex: 'other',
              width:'12%'
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