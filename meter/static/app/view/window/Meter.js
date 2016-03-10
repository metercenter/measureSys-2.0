Ext.define('app.view.window.Meter',{
  extend : 'Ext.form.Panel',
  alias : 'widget.Meter',
  width : 600,
  height : 220,
  floating : true,
  title : '流量计铅封管理',
  closable : true,
  items : [ {
    xtype : 'panel',
    flex : 1,

    bodyStyle : {
      padding : '10px'
    },
    items : [ {
      xtype : 'fieldset',

      defaultType : 'textfield',
//      padding : '10px',

//      minHeight : 150,

      layout : 'column',

      defaults : {
        layout : 'form',
        anchor : '100%',
        xtype : 'container',
        defaultType : 'textfield',
        style : 'width: 50%'
      },

      items : [ {
        items : [{
          fieldLabel : '流量计'
        }, {
          fieldLabel : '现有铅封编号'
        }, {
          fieldLabel : '编号変更'
        },{
          fieldLabel : '变更后编号'
        }]
      }, {
        items : [ {
          fieldLabel : '变更原因'
        }, {
          fieldLabel : '操作人员'
        } ]
      } ]
    } ]
  } ],
  //
  buttons : [ {
    text : '修改',
    formBind : true,
    handler : function() {
      var f = myForm.getForm();
      Ext.Ajax.request({
        url : '/register_company',
        method : 'POST',
        params : f.getValues(),
        success : function(response, opts) {
          Ext.MessageBox.confirm('提示', '客户信息已注册，是否关闭窗口？', callBack);
          Ext.ComponentQuery.query('#userTree')[0].store.load();
          function callBack(btn, text) {
            if (btn != 'no')
              myForm.hide();
          }
        },
        failure : function() {
        }
      });
    }
  } ,{
    text : '保存',
    formBind : true,
    handler : function() {
      var f = myForm.getForm();
      Ext.Ajax.request({
        url : '/register_company',
        method : 'POST',
        params : f.getValues(),
        success : function(response, opts) {
          Ext.MessageBox.confirm('提示', '客户信息已注册，是否关闭窗口？', callBack);
          Ext.ComponentQuery.query('#userTree')[0].store.load();
          function callBack(btn, text) {
            if (btn != 'no')
              myForm.hide();
          }
        },
        failure : function() {
        }
      });
    }
  }]
});