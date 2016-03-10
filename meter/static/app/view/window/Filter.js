Ext.define('app.view.window.Filter', {
  extend : 'Ext.form.Panel',
  alias : 'widget.filter',
  width : 600,
  height : 220,
  floating : true,
  title : '过滤器管理',
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
          fieldLabel : '规格型号'
        }, {
          fieldLabel : '滤芯精度'
        }, {
          fieldLabel : '维护时间'
        },{
          fieldLabel : '维护人员'
        }]
      }, {
        items : [ {
          fieldLabel : '处理能力'
        }, {
          fieldLabel : '更换时间'
        }, {
          fieldLabel : '工作内容'
        }, {
          fieldLabel : '图片上传'
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