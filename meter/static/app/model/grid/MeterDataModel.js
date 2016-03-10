Ext.define('app.model.grid.MeterDataModel', {
  extend : 'Ext.data.Model',
  alias : 'model.meterDataModel',
  fields : [ {
    name : 'data_id'
  }, {
    name : 'meter_eui'
  }, {
    name : 'data_date'
  }, {
    name : 'data_vb'
  }, {
    name : 'data_vm'
  }, {
    name : 'data_p'
  }, {
    name : 'data_t'
  }, {
    name : 'data_qb'
  }, {
    name : 'data_qm'
  }, {
    name : 'data_battery'
  } ]
});