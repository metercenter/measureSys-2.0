Ext.define('app.view.window.Tap', {
  extend : 'Ext.form.Panel',
  alias : 'widget.tap',
  width : 800,
  height : 220,
  floating : true,
  title : '阀门管理',
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
        style : 'width: 33%'
      },

      items : [ {
        title:'当前状态',
        items : [{
          fieldLabel : '1#'
        }, {
          fieldLabel : '2#'
        }]
      }, {
        items : [ {
          fieldLabel : '3#'
        }, {
          fieldLabel : '4#'
        }]
      } , {
        items : [ {
          fieldLabel : '5#'
        }, {
          fieldLabel : '6#'
        }]
      } ]
    } ]
  } ],
  //
  buttons : [ {
    text : '注册',
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
  } ]
});