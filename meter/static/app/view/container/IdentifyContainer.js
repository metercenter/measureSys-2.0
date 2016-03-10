Ext.define('app.view.container.IdentifyContainer',{
  extend: 'Ext.container.Container',
  alias: 'widget.identifyContainer',
  requires:[
            'app.view.grid.IdentifyMeter',
            'app.view.form.IdentificationCenter'
          ],
          id: 'identifycontainer',
          scrollable : true,
          scrollFlags: {
            y: true,
            both: true
          },
          layout: {
              type: 'vbox',
              align: 'stretch'
          },
          items: [{
            xtype:'indentificationCenter'
          }, {
            xtype:'identifyMeter'

        }]
  
});