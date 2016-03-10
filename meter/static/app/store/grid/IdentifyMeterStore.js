Ext.define('app.store.grid.IdentifyMeterStore', {
  extend: 'Ext.data.Store',
  alias: 'store.identifyMeterStore',
  
  requires: [
             'app.model.grid.IdentifyMeterModel',
             ],
   model : 'app.model.grid.IdentifyMeterModel',
   remoteSort : true,
    pageSize : 10,
    batchActions : false,
    autoLoad : true,
    proxy : {
      type : 'ajax',
      url : '/getIdentifyMeter',
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