Ext.define('app.view.grid.PagingTool',{
  extend: 'Ext.toolbar.Paging',
  alias: 'widget.pagingToolBarRefresh',
  doRefresh: function() {
    Ext.ComponentQuery.query('#meterDataGrid')[0].store.load({
      params : {
        user_name : Ext.ComponentQuery.query('#browseArea')[0].userName
      }
    });
  }
});