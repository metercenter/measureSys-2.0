Ext.define('app.store.introduction.IntroductionStore', {
    extend: 'Ext.data.Store',
    alias: 'store.introductionStore',
    model: 'app.model.introduction.IntroductionModel',
    batchActions : false,
//    autoLoad : true,
    proxy : {
      type : 'ajax',
      url : '/getCompanyInfo',
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