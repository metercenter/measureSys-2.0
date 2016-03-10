Ext.define('app.view.container.ChartContainer',{
  extend: 'Ext.container.Container',
  alias: 'widget.chartContainer',
  requires:[
    'app.view.diagram.UserTopology',
    'app.view.dataChart.MeterDataChart'
//    'app.view.dataChart.DataChart'
  ],
  id: 'chartcontainer',
  companyName : 'niaho',
  layout: {
      type: 'vbox',
      align: 'stretch'
  },
  items: [{
      xtype:'drawPic',
      height: 200
    }, {
      xtype:'meterDataChart'
  }]
//  initComponent: function(){
//    this.callParent();
//  }
});