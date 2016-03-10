Ext.define('app.store.form.OutputDiff',{
  extend:'Ext.data.Store',
  alias: 'store.outputDiff',
  fields: [
           {name: 'user_id'},
           {name: 'company'},
           {name: 'input'},
           {name: 'industry_output' },
           {name: 'resident_output'},
           {name: 'other_output'}
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