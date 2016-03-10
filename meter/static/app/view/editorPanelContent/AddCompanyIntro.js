Ext.define('app.view.editorPanelContent.AddCompanyIntro', {
  extend : 'Ext.form.Panel',
  alias : 'widget.addCompanyIntro',

  id : 'addCompanyIntro',

  title : '修改公司简介',
  // floating : true,
  // closable : true,
  items : [ {
    xtype : 'fieldset',
    title : '公司介绍',
    defaultType : 'textfield',
    defaults : {
      anchor : '100%'
    },
    style : 'margin:10px 10px 10px 10px;',
    items : [ {
      allowBlank : false,
      fieldLabel : '标题',
      name : 'company_title',
      emptyText : '客户登录名'
    }, {
      allowBlank : false,
      fieldLabel : '内容',
      xtype:'textarea',
      name : 'company_content'
    }, {
      allowBlank : false,
      fieldLabel : '联系人',
      name : 'company_contract'
    }, {
      allowBlank : false,
      fieldLabel : '联系电话',
      name : 'company_tel'
    }, {
      allowBlank : false,
      fieldLabel : '联系地址',
      name : 'company_addr'
//      id: 'pass'
    } ]
  } ],
  buttons : [ {
    text : '修改',
    formBind : true,
    id: 'companyIntro'
    }],

  initComponent : function() {
    var me = this;
    this.callParent();
  }

});