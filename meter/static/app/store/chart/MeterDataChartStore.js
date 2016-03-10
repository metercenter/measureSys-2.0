Ext.define('app.store.chart.MeterDataChartStore',{
  extend: 'Ext.data.Store',
  alias: 'store.meterDataChartStore',
  fields: ['data_date', 'data_qb' ],
  autoLoad: true,
  proxy : {
    type : 'ajax',
    url : '/meterDataChart',
    reader : {
      type : 'json',
      rootProperty : "data"
    }
  }
});