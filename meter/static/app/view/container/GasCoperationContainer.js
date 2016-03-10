Ext.define('app.view.container.GasCoperationContainer',{
  extend: 'Ext.container.Container',
  alias: 'widget.gasCoperationContainer',
  requires:[
            'app.view.form.MetersStatus',
            'app.view.grid.UserFeedback',
            'app.view.grid.MessageGrid',
            'app.view.grid.WarnInformation',
            'app.view.panel.OutputDiff',
            'app.view.grid.WarnInformationCompany'
          ],
          id: 'gascoperationcontainer',
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
            padding: '10 10',
            xtype:'metersStatus'
          }, {
            xtype:'outputDiff'
        },{
          xtype:'warnInformationCompany'
        }]
});