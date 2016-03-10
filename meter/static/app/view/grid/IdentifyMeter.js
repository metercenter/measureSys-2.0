Ext.define('app.view.grid.IdentifyMeter', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.identifyMeter',
  requires: [
              'Ext.data.*',
              'Ext.grid.*',
              'Ext.util.*',
              'Ext.toolbar.Paging',
              'Ext.ux.ProgressBarPager',
              'app.model.grid.IdentifyMeterModel',
              'app.store.grid.IdentifyMeterStore'
             ],
  
  title: '检定信息总览',
  padding: '10 10',
  id: 'identificationMeterGrid',
  initComponent: function(){
    var store = Ext.create('store.identifyMeterStore');
    Ext.apply(this, {
          store: store,
          height: 400,
          columns: [{ 
              text: '用户',
              sortable: true,
              dataIndex: 'user_company',
              width: 75
          },{
              text: '流量计品牌',
              sortable: true,
              dataIndex: 'meter_type',
              width: 75
          },{
              text: '型号',
              sortable: true,
              renderer: this.changeRenderer,
              dataIndex: 'meter_version',
              width: 80
          },{
              text: '序列号',
              sortable: true,
              renderer: this.pctChangeRenderer,
              dataIndex: 'meter_index',
              width: 100
          },{
              text: '流量范围',
              sortable: true,
              dataIndex: 'output_range',
              width: 115
          },{
            
              text: '检定日期',
              sortable: true,
              dataIndex: 'identify_date',
              width: 115
          },{
            
              text: '下次检定日期',
              sortable: true,
              dataIndex: 'next_identify_date',
              width: 115
          },{
          
              text: '介质',
              sortable: true,
              dataIndex: 'medium',
              width: 115
          },{
        
              text: '压力',
              sortable: true,
              dataIndex: 'pressure',
              width: 115
          },{
      
              text: '温度',
              sortable: true,
              dataIndex: 'temperature',
              width: 115
          },{
            
            text: '检定点100%Qmax偏差',
            sortable: true,
            dataIndex: 'Qmax100',
            width: 115
          },{
            
            text: '检定点60%Qmax偏差',
            sortable: true,
            dataIndex: 'Qmax60',
            width: 115
          },{
            
            text: '检定点40%Qmax偏差',
            sortable: true,
            dataIndex: 'Qmax40',
            width: 115
          },{
            
            text: '检定点20%Qmax偏差',
            sortable: true,
            dataIndex: 'Qmax20',
            width: 115
          },{
            
            text: '检定点10%Qmax偏差',
            sortable: true,
            dataIndex: 'Qmax10',
            width: 115
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