Ext.define('app.store.grid.WarnInformationStore',{
  extend: 'Ext.data.Store',
  alias: 'store.warnInformationStore',
  requires: [
               'app.model.grid.WarnInformationModel'
             ],
  
//  autoLoad : true,
  
  model: 'app.model.grid.WarnInformationModel',
  proxy: {
    type : 'ajax',
    url : '/getWarnInfo',
    reader : {
      type : 'json',
      rootProperty : "data",
      messageProperty : "Msg"
    },
    writer : {
      type : "json",
      encode : true,
      rootProperty : "data",
      allowSingle : false
    }
  }
});