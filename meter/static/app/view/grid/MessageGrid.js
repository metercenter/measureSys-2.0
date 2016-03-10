Ext.define('app.view.grid.MessageGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.messagegrid',
	requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.PreviewPlugin',
        'app.model.grid.MessageModel',
        'app.store.MessageStore'
    ],

    disableSelection: true,
    loadMask: true,

    initComponent: function(){

    	 var pluginExpanded = true;

    	 var store = Ext.create('app.store.MessageStore');

        Ext.apply(this, {
            store: store,
            plugins: [{
                ptype: 'preview',
                bodyField: 'excerpt',
                expanded: pluginExpanded,
                pluginId: 'preview'
            }],
            viewConfig: {
                trackOver: false,
                stripeRows: false
            },
            // grid columns
            columns:[{
                // id assigned so we can apply custom css (e.g. .x-grid-cell-topic b { color:#333 })
                // TODO: This poses an issue in subclasses of Grid now because Headers are now Components
                // therefore the id will be registered in the ComponentManager and conflict. Need a way to
                // add additional CSS classes to the rendered cells.
                id: 'topic',
                text: "报警信息及处理办法",
                dataIndex: 'title',
                flex: 1,
                renderer: this.renderTopic,
                sortable: false
            },{
                text: "Author",
                dataIndex: 'username',
                width: 100,
                hidden: true,
                sortable: true
            },{
                text: "报警级别",
                dataIndex: 'replycount',
                width: 70,
                align: 'right',
                sortable: true
            },{
                id: 'last',
                text: "上报时间",
                dataIndex: 'lastpost',
                width: 150,
                renderer: this.renderLast,
                sortable: true
            }, {
              id: 'other',
              text: "其他",
              dataIndex: 'replycount',
              width: 70,
              align: 'right',
              sortable: true
            }
            ],
            // paging bar on the bottom
            bbar: Ext.create('Ext.PagingToolbar', {
                store: store,
                displayInfo: true,
                displayMsg: '显示警报信息{0} - {1} of {2}',
                emptyMsg: "无显示警报信息"
                // items:[
                //     '-', {
                //     text: pluginExpanded ? 'Hide Preview' : 'Show Preview',
                //     pressed: pluginExpanded,
                //     enableToggle: true,
                //     toggleHandler: function(btn, pressed) {
                //         btn.up('grid').getPlugin('preview').toggleExpanded(pressed);
                //         btn.setText(pressed ? 'Hide Preview' : 'Show Preview');
                //     }
                // }]
            })
        });
        this.callParent();
    },

    afterRender: function(){
        this.callParent(arguments);
        this.getStore().loadPage(1);
    },

    renderTopic: function(value, p, model) {
        return Ext.String.format(
            '<b><a href="#?t={2}" target="_blank">警报！！：{0}</a></b> <a href="http://sencha.com/forum/forumdisplay.php?f={3}" target="_blank">流量计：{1} Forum</a>',
            value,
            model.get('forumtitle'),
            model.getId(),
            model.get('forumid')
            // model.get('excerpt')

        );
    },

    renderLast: function(value, p, model) {
        return Ext.String.format('{0}<br/>by {1}', Ext.Date.dateFormat(value, 'M j, Y, g:i a'), model.get('lastposter'));
    }
});