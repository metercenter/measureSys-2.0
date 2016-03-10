Ext.define('app.model.grid.IdentifyMeterModel',{
  extend: 'Ext.data.Model',
  alias: 'model.identifyMeterModel',
  
  fields: [
           {name: 'user_id'},
           {name: 'meter_type'},
           {name: 'user_id'},
           {name: 'meter_version'},
           {name: 'meter_index'},
           {name: 'output_range'},
           {name: 'identify_date'},
           {name: 'next_identify_date'},
           {name: 'medium'},
           {name: 'pressure'},
           {name: 'temperature'},
           {name: 'Qmax100'},
           {name: 'Qmax60'},
           {name: 'Qmax40'},
           {name: 'Qmax20'},
           {name: 'Qmax10'}
          ]
});