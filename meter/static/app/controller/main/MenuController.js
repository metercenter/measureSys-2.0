Ext.define('app.controller.main.MenuController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.menuController',
    requires:[
              'app.view.main.BrowseArea',
              'app.view.grid.WarnInformationTotal',
              'app.store.meterdata.MeterDataStore'
            ],

	init: function() {
			this.control({
				'#firstpage': {
					activate: {
						//single: true,
						fn: function (panel) {
					          Ext.ComponentQuery.query('#browseArea')[0].setHidden(false);
					          Ext.ComponentQuery.query('#warnInformationTotal')[0].setHidden(true);
						}
					}
				},

				'#warninfo': {
					activate: {
						//single: true,
						fn: function (panel) {
					          Ext.ComponentQuery.query('#browseArea')[0].setHidden(true);
					          Ext.ComponentQuery.query('#warnInformationTotal')[0].setHidden(false);
					          Ext.ComponentQuery.query('#warnInformationTotal')[0].store.load({
					              params : {
					                user_company : Ext.ComponentQuery.query('#userTree')[0].userCompany,
					              }
					            });
					          Ext.ComponentQuery.query('#warnInformationTotal')[0].setTitle("报警信息-"+
					        		  Ext.ComponentQuery.query('#userTree')[0].userCompany);
					          console.log(Ext.ComponentQuery.query('#warnInformationTotal')[0]);
						}
					}
				},
				
				'#datamanage': {
					activate: {
						//single: true,
						fn: function (panel) {

						}
					}
				},
			

				'#usermanage': {
					activate: {
						single: true,
						fn: function (panel) {

						}
					}
				}
		})
	}
});