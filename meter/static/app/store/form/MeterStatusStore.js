Ext.define('app.store.form.MeterStatusStore',{
  extend: 'Ext.data.Store',
  alias:'store.meterStatusStore',
  
  fields: [
            {name: 'all_node_num'},
            {name: 'valid_node_num'}
          ],
    proxy : {
      type : 'ajax',
      url : '/retrieveNodeNum',
      reader : {
        type : 'json',
        rootProperty : "data"
      }
    }
});