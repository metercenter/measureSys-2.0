Ext.define('app.view.panel.OutputDiff',{
  extend: 'Ext.panel.Panel',
  alias: 'widget.outputDiff',
  requires: [
               'app.view.dataChart.DataChart',
               'app.view.form.OutputDiffInfo'
             ],
  
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  
  title:'输差信息一览',
  padding: '10 10',
  
  items: [{
    xtype: 'outputDiffInfo',
      flex: 1
  },{
    flex:2,
    xtype: 'dataChart'
  }]
    
});