Ext.define('app.store.MessageStore',{
	extend: 'Ext.data.Store',
	alias: 'store.messageStore',
	model: 'app.model.grid.MessageModel',

	pageSize: 50,
    remoteSort: true,
    sorters: [{
        property: 'lastpost',
        direction: 'DESC'
    }]

});