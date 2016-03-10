Ext.define('app.view.main.Menu',{
	extend: 'Ext.tab.Panel',
	alias: 'widget.menubar',
    // controllers: ['main.MenuController']
    controller: 'menuController',
	// flex:1,
    initComponent: function(){
    	var me = this;
    	me.items = [
    	  {title: '首页', id: 'firstpage'},
    	  {title: '报警信息', id: 'warninfo'},
    	  {title: '数据分析', id: 'datamanage'},
    	  {title: '用户管理', id: 'usermanage'}
    	];
    	me.callParent(arguments);
    }

});