Ext.define('app.view.grid.MeterData', {
  extend : 'Ext.grid.Panel',
  alias : 'widget.meterData',

  requires : [ 'Ext.data.*', 
               'Ext.grid.*', 
               'Ext.util.*', 
               'Ext.toolbar.Paging',
               'Ext.ux.ProgressBarPager', 
               'app.model.grid.MeterDataModel',
               'app.store.meterdata.MeterDataStore',
               'Ext.grid.RowNumberer' ,
               'app.view.form.meterData.RealDataForm',
               'app.view.grid.PagingTool'
               ],

  title: '实时数据',
  padding: '10 10',
  id: 'meterDataGrid',
  stripeRows: true,
  height: 400,
  listeners: {
    'itemdblclick': function(record, item, index, e, eOpts ){
//      alert('nihao');
      var myform = Ext.create('widget.realDataForm');
      Ext.ComponentQuery.query('#realDataChartPanel')[0].myDataStore.load({
        params:{
          meter_eui : item.data.meter_eui,
          data_qm : item.data.data_qm,
        }
      });
      myform.show();
    }
  },
  initComponent : function() {
    var me = this;
//    me.
    var store = Ext.create('store.meterDataStore', {
      
    });
    Ext.apply(this, {
      store : store,
      columns : [ {
        text : '数据编号',
        width : '10%',
        sortable : false,
        dataIndex : 'data_id'
      }, 
      {
        text : '接收时间',
        width : '10%',
        sortable : true,
        dataIndex : 'data_date'
      }, {
        text : '标况总累计(Nm3)',
        width : '10%',
        sortable : true,
        dataIndex : 'data_vb'
      }, {
        text : '工况总累计(m3)',
        width : '10%',
        sortable : true,
        id: 'data_vm',
        dataIndex : 'data_vm'
      }, {
        text : '压力(bar)',
        width : '7%',
        sortable : true,
        id: 'data_p',
        dataIndex : 'data_p'
      }, {
        text : '温度(℃)',
        width : '7%',
        sortable : true,
        id: 'data_t',
        dataIndex : 'data_t'
      }, {
        text : '标况瞬时流量(Nm3/h)',
        width : '13%',
        sortable : true,
        dataIndex : 'data_qb'
      }, {
        text : '工况瞬时流量(m3/h)',
        width : '13%',
        sortable : true,
        id: 'data_qm',
        dataIndex : 'data_qm'
      }, {
        text : '电量(Month)',
        width : '8%',
        sortable : true,
        id: 'data_battery',
        dataIndex : 'data_battery'
      },
      {
        xtype: 'widgetcolumn',
        id:'data_analyze',
        width: '10%',
        widget: {
            xtype: 'button',
            text: '数据分析',
            handler:  function(btn, item){
              var rec = btn.getWidgetRecord();
//              console.log(rec.data);
              var myform = Ext.create('widget.realDataForm');
              Ext.ComponentQuery.query('#realDataChartPanel')[0].myDataStore.load({
                params:{
                  meter_eui : rec.data.meter_eui,
                  data_qm : rec.data.data_qm,
                }
              });
              myform.show();
            }
        }
    }],
      bbar : {
        xtype : 'pagingToolBarRefresh',
        id: 'meterDataBar',
        pageSize : 10,
        store : store,
        displayInfo : true,
        plugins : new Ext.ux.ProgressBarPager()
      }
    });
    
    this.callParent();
    Ext.ComponentQuery.query('#meterDataBar')[0].items.items[8].addListener("click",function(){
      me.store.proxy.extraParams={ user_name : Ext.ComponentQuery.query('#browseArea')[0].userName};
    });
    Ext.ComponentQuery.query('#meterDataBar')[0].items.items[7].addListener("click",function(){
      me.store.proxy.extraParams={ user_name : Ext.ComponentQuery.query('#browseArea')[0].userName};
    });
  }
  
//  afterRender: function(){
//    this.callParent(arguments);
//    alert('nihao2');
//    console.log(this.getStore());
//    this.getStore().proxy.extraParams={ user_name : Ext.ComponentQuery.query('#browseArea')[0].userName};
//  }

});