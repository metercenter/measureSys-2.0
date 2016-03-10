Ext.define('app.view.container.Container',{
	extend: 'Ext.container.Container',
	alias: 'widget.writecontainer',
	requires:[
		'app.view.container.WriteStore',
		'app.view.container.WriteForm',
		'app.view.container.WriteGrid'
	],
	layout: {
	    type: 'vbox',
	    align: 'stretch'
	},
	items: [{
		    itemId: 'form',
		    xtype: 'writerform',
		    manageHeight: false,
		    margin: '0 0 10 0',
		    listeners: {
		        // create: function(form, data){
		        //     store.insert(0, data);
		        // }
		    }
		}, {
		    itemId: 'grid',
		    xtype: 'writergrid',
		    title: 'User List',
		    flex: 1,
		    // store: store,
		    listeners: {
		        selectionchange: function(selModel, selected) {
		            main.child('#form').setActiveRecord(selected[0] || null);
		        }
		    }
	}],
	initComponent: function(){
		// var store = Ext.create('app.view.container.WriteStore');
		

		this.callParent();
	}
	

});