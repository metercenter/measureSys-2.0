Ext.define('app.view.form.OutputDiffInfo', {
  extend : 'Ext.form.Panel',
  alias : 'widget.outputDiffInfo',
  bodyStyle : {
    padding : '10px'
  },
  id : 'outputDiffInfo',
  items : [ {
    xtype : 'fieldset',

    defaultType : 'textfield',
    padding : '10px',

    layout : 'column',

    defaults : {
      anchor : '100%',
      layout : 'form',
      xtype : 'container',
      defaultType : 'textfield',
      style : 'width: 33%'
    },

    items : [ {
      items : [ {
        fieldLabel : '客户名称',
        name : 'user_company'
      }, {
        fieldLabel : '前一日上游进气总量',
        allowBlank : false,
        name : 'input'
      }, {
        fieldLabel : '前一日工业用户售气量',
        name : 'industry_output'
      }, {
        fieldLabel : '前一日居民用气估量',
        name : 'resident_output'
      }, {
        fieldLabel : '其他气量统计',
        name : 'other_output'
      }, {
        fieldLabel : '前一日输差计算',
        name : 'output_diff'
      }, {
        xtype : 'datefield',
        name : 'output_date',
        allowBlank : false,
        fieldLabel : '记录日期',
        format : 'Y-m-d'
        // margin: '0 5 0 0',
      } ]
    } ]
  } ],
  buttons : [ {
    text : '添加',
    formBind : true,
    id : 'addOutputDiff'
  },{
    text : '修改',
    formBind : true,
    id : 'modifyOutputDiff'
  } ]
});