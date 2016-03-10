Ext.define('app.store.tree.SelectPanelStore',{
  extend: 'Ext.data.Store',
  alias: 'store.selectPanelStore',
  
  fields: [
           {name: 'user_id'},
           {name: 'company'}
          ],
  proxy : {
    type : 'ajax',
    url : '/selectPanel',
    reader : {
      type : 'json',
      rootProperty : "data"
    }
  }
});