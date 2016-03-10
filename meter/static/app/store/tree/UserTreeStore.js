Ext.define('app.store.tree.UserTreeStore', {
  extend : 'Ext.data.TreeStore',
  alias : 'store.userTreeStore',
  //    autoLoad : true,
  //    model: 'ExtMVCOne.model.Tree',
  
  proxy : {
    type : 'ajax',
    url : '/get-user-group',
    reader : {
      type : 'json',
      rootProperty : 'children'
    }
  },

  root : {
    text : '当前用户',
    expanded : true
  },
  rootVisible : false

});