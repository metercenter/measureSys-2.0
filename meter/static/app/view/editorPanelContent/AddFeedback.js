Ext.define('app.view.editorPanelContent.AddFeedback', {
  extend : 'Ext.form.Panel',
  alias : 'widget.addFeedback',

  id : 'addFeedback',

  title : '用户反馈信息',
  // floating : true,
  // closable : true,
  items : [ {
    xtype : 'fieldset',
//    title : '用户信息',
    defaultType : 'textfield',
    defaults : {
      anchor : '100%'
    },
    padding: '10 10',
    style : 'margin:10px 10px 10px 10px;',
    items : [ {
      xtype : 'combobox',
      fieldLabel : '客户名称',
      name: 'user_company',
      displayField : 'user_company',
      editable: false,
      store : {
        fields : [ 'user_id', 'user_company' ],
        proxy : {
          type : 'ajax',
          url : '/get-user-level',
          reader : {
            type : 'json'
          }
        },
        autoLoad : true
      },
      queryMode : 'local'
    }, {
      xtype : 'datefield',
      name : 'report_time',
      allowBlank : false,
      fieldLabel : '反馈时间',
      format : 'Y-m-d'
    }, {
      fieldLabel : '处理时间',
      name : 'solution_deadline'
    }, {
      fieldLabel : '问题描述',
      name : 'problem'
    }, {
      fieldLabel : '处理结果',
      name : 'solution_result'
    } ]
  } ],
  buttons : [ {
    text : '添加',
    formBind : true,
    id: 'addfeedbackrecord',
    handler : function() {

    }
  } ],

  initComponent : function() {
    var me = this;
    this.callParent();
  }

});