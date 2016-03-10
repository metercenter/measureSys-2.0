Ext.define('app.view.main.BrowseArea', {
    extend: 'Ext.container.Container',
    alias: 'widget.browseArea',
    requires:[
              'app.view.main.OperationArea',
              'app.view.main.Menu',
              'app.view.main.ChangableEditorPanel',
              'app.controller.main.BrowseAreaController',
              'app.view.tree.UserTree'
             ],
    controller: 'browseAreaController',
    layout: 'border',
    id: 'browseArea',

    userName: '金昇公司',

    items: [{
    	region: 'north',
    },
    {
        region: 'west',
//        collapsible: true,
        xtype: 'userTree',
        split: true,
        title: '客户',
        width: 210,
        margin: '0 0 0 0'
    }, {
        region: 'east',
        collapsible: true,
        split: true,
        xtype: 'changableEditorPanel',
        width: 350
    }, {
        region: 'center',
        xtype: 'operationArea'
    }]
});