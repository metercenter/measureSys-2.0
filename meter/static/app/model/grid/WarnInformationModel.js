Ext.define('app.model.grid.WarnInformationModel',{
  extend: 'Ext.data.Model',
  alias: 'model.warnInformationModel',
  
  fields: [{
    name : 'user_id'
  }, {
    name: 'company'
  }, {
    name: 'user_name'
  }, {
    name: 'meter_info'
  }, {
    name: 'warn_info' 
  }, {
    name: 'warn_level'
  }, {
    name: 'solution'
  }, {
    name: 'other'
  }, {
    name: 'warn_date'
  }]

});