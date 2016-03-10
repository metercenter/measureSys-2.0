Ext.define('app.view.container.CompanyContainer',{
  extend: 'Ext.container.Container',
  alias: 'widget.companyContainer',
  requires:[
            'app.view.introduction.Introduction',
            'app.view.grid.UserFeedback',
            'app.view.grid.MessageGrid',
            'app.view.grid.WarnInformation'
          ],
          id: 'companycontainer',
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
            xtype:'introduction',
            height: 230
          }, {
            xtype:'userFeedback'
        },{
          xtype:'warnInformation'
        }]
});