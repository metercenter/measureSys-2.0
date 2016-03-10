Ext.define('app.model.grid.UserFeedbackModel',{
	extend: 'Ext.data.Model',
	fields: [
       {name: 'user_company'},
       {name: 'report_time'},
       {name: 'solution_deadline'},
       {name: 'problem'},
       {name: 'solution_result'},
       ]
});