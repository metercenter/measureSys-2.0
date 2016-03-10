Ext.define('app.view.form.meterData.RealDataForm',{
  extend: 'Ext.form.Panel',
  alias:'widget.realDataForm',
  requires:[
              'app.view.dataChart.RealMeterDataChart'
            ],
  width : 500,
  height : 300,
  title : '实时数据分析-检定数据比对',
  floating : true,
  closable : true,
  layout: 'fit',
  items:[{
    xtype:'realMeterDataChart'
  }]
});