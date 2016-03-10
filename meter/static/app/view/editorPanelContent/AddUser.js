Ext.define('app.view.editorPanelContent.AddUser', {
  extend : 'Ext.form.Panel',
  alias : 'widget.addUser',

  id : 'addUser',

  title : '注册用户',
  // floating : true,
  // closable : true,
  items : [ {
    xtype : 'fieldset',
    title : '用户信息',
    defaultType : 'textfield',
    defaults : {
      anchor : '100%'
    },
    style : 'margin:10px 10px 10px 10px;',
    items : [ {
      allowBlank : false,
      fieldLabel : '用户名',
      name : 'user',
      emptyText : '客户登录名'
    }, {
      allowBlank : false,
      fieldLabel : '密码',
      name : 'pass',
      emptyText : 'password',
      inputType : 'password',
      id: 'pass'
    }, {
      allowBlank : false,
      fieldLabel : '确认密码',
      name : 'pass-cfrm',
      emptyText : 'password',
      inputType : 'password',
      vtype:'password',
      initialPassField: 'pass'
    } ]
  }, {
    xtype : 'fieldset',
    title : '联系信息',
    style : 'margin:10px 10px 10px 10px;',
    defaultType : 'textfield',
    defaults : {
      anchor : '100%'
    },

    items : [ {
      fieldLabel : '客户名称',
      name : 'company'
    }, {
      fieldLabel : '客户电话',
      name : 'phone'
    }, {
      xtype : 'combobox',
//      id : 'user_company',
      fieldLabel : '主管单位',
      displayField : 'user_company',
      name: 'user_company',
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
    } ]
  } ],
  buttons : [ {
    text : '注册',
    formBind : true,
    id: 'registorBtn',
    handler : function() {
//      var f = myForm.getForm();
      
//      Ext.Ajax.request({
//        url : '/register_company',
//        method : 'POST',
//        params : f.getValues(),
//        success : function(response, opts) {
//          Ext.MessageBox.confirm('提示', '客户信息已注册，是否关闭窗口？', callBack);
//          Ext.ComponentQuery.query('#userTree')[0].store.load();
//          function callBack(btn, text) {
//            if (btn != 'no')
//              myForm.hide();
//          }
//        },
//        failure : function() {
//        }
//      });
    }
  } ],

  initComponent : function() {
    var me = this;
    Ext.apply(Ext.form.field.VTypes,{
      password: function(val, field) {
        if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
      },
      passwordText: '密码不匹配！'
    });
    this.callParent();
  }

});