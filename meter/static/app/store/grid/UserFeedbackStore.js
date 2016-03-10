Ext.define('app.store.grid.UserFeedbackStore',{
  extend: 'Ext.data.Store',
  alias: 'store.userFeedbackStore',
  
  requires: [
             'app.model.grid.UserFeedbackModel',
             ],
   model : 'app.model.grid.UserFeedbackModel',
   remoteSort : true,
    pageSize : 10,
    batchActions : false,
    autoLoad : true,
    proxy : {
      type : 'ajax',
      url : '/getUserFeedback',
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
})