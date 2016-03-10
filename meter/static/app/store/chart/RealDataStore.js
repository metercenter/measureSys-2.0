Ext.define('app.store.chart.RealDataStore',{
  extend: 'Ext.data.Store',
  alias: 'store.realDataStore',
  fields: ['qmax_level', 'deviation_val','single_qmax_level','single_deviation_val' ],
  autoLoad: true,
  proxy : {
    type : 'ajax',
    url : '/getDeviationVal',
    reader : {
      type : 'json',
      rootProperty : "data"
    }
  }
});