Ext.define('app.store.tree.SelectMeterStore',{
  extend: 'Ext.data.Store',
  alias: 'store.selectMeterStore',
  
//  "meter_id": each.meter_id,
//  "user_id": each.user_id,
//  "meter_name": each.meter_name,
//  "meter_type": meterTypeName(each.meter_type),
//  "meter_index": each.meter_index,
//  "meter_eui": each.meter_eui,              
//  "user_meterdata": each.user_meterdata,
//  "user_revise": each.user_revise,              
//  "user_reviseid": each.user_reviseid,
//  "meter_qm":each.meter_qm,
//  "meter_qb":each.meter_qb,
  
  fields: [
           {name: 'meter_name'},
           {name: 'meter_index'},
           {name: 'meter_eui'},
           {name: 'user_meterdata'},
           {name: 'meter_type'}
          ],
  proxy : {
    type : 'ajax',
    url : '/get-meter',
    reader : {
      type : 'json',
      rootProperty : "data"
    }
  }
});