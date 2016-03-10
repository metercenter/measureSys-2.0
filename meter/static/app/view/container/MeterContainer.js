Ext.define('app.view.container.MeterContainer', {
  extend: 'Ext.container.Container',
  alias: 'widget.meterContainer',
  
  requires: [
             'app.view.form.meter.MeterBasicInfo',
             'app.view.grid.MeterData'
             ],
   layout: {
     type: 'vbox',
     align: 'stretch'
   },
   scrollable : true,
   scrollFlags: {
     y: true,
     both: true
   },
   id : 'metercontainer',
   items: [{
     xtype: 'meterBasicInfo'
   },{
     xtype:'meterData'
   }]
});