Ext.define('app.store.chart.OutputChartStore',{
  extend: 'Ext.data.Store',
  alias: 'store.outputChartStore',
//  autoLoad: true,
  fields: ['output_date', 'output_diff' ],
//  data: [
//      { month: 'Jan', data1: 20 },
//      { month: 'Feb', data1: 20 },
//      { month: 'Mar', data1: 19 },
//      { month: 'Apr', data1: 18 },
//      { month: 'May', data1: 18 },
//      { month: 'Jun', data1: 17 },
//      { month: 'Jul', data1: 16 },
//      { month: 'Aug', data1: 16 },
//      { month: 'Sep', data1: 16 },
//      { month: 'Oct', data1: 16 },
//      { month: 'Nov', data1: 15 },
//      { month: 'Dec', data1: 15 }
//  ]
  proxy : {
    type : 'ajax',
    url : '/outputDiffChart',
    reader : {
      type : 'json',
      rootProperty : "data"
    }
  }
});