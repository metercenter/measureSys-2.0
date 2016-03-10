Ext.define('app.view.editorPanelContent.AddMeter', {
  extend : 'Ext.form.Panel',
  alias : 'widget.addMeter',
  id : 'addMeter',
  hidden : true,
  autoScroll :true,
  title : '流量计信息',
  items : [ {
    xtype : 'fieldset',
    title : '流量计基本信息',
    style : 'margin:10px 10px 10px 10px;',
    defaultType : 'textfield',
    defaults : {
      anchor : '100%'
    },
    // padding: '10 10 10 10',
    items : [ {
      allowBlank : false,
      fieldLabel : '用户/流量计名称',
      name : 'meter_name',
      emptyText : '用户或流量名称'
    }, {
      allowBlank : false,
      fieldLabel : '流量计标示',
      name : 'meter_eui',
      emptyText : 'EUI64编号'
    }, {
      xtype : 'combobox',
      name : 'meter_type',
      fieldLabel : '流量计品牌',
      displayField : 'meter_type_name',
      editable: false,
      store : {
        fields : [ 'meter_type', 'meter_type_name' ],
        proxy : {
          type : 'ajax',
          url : '/getMeterType',
          reader : {
            type : 'json'
          }
        },
        autoLoad : true
      },
      queryMode : 'local'
    }, {
      xtype : 'combobox',
      fieldLabel : '隶属客户',
      name: 'user_company',
      displayField : 'user_company',
      editable: false,
      store : {
        fields : [ 'user_id', 'user_company' ],
        proxy : {
          type : 'ajax',
          url : '/get-usermeter-level',
          reader : {
            type : 'json'
          }
        },
        autoLoad : true
      },
      queryMode : 'local'
    } ]
  }, {
    xtype : 'fieldset',
    title : '相关参考值',

    defaultType : 'textfield',
    defaults : {
      anchor : '100%'
    },
    style : 'margin:10px 10px 10px 10px;',
    items : [{
      xtype : 'combobox',
//      name : 'meter_type',
      fieldLabel : '修正仪',
      displayField : 'meter_type_name',
      editable: false,
      store : {
        fields : [ 'meter_type', 'meter_type_name' ],
        proxy : {
          type : 'ajax',
          url : '/getMeterType',
          reader : {
            type : 'json'
          }
        },
        autoLoad : true
      },
      queryMode : 'local'
    }, {
      fieldLabel : '流量计型号',
//      name : 'meter_index',
      emptyText : '型号'
    }, {
      fieldLabel : '流量计铅封编号',
//      name : 'meter_index',
      emptyText : '型号'
    }, {
      fieldLabel : '压力范围',
//      name : 'meter_index',
      emptyText : '0.8-5'
    }, {
      fieldLabel : '温度范围',
//      name : 'meter_index',
      emptyText : '-10-60'
    }, {
      fieldLabel : '流量范围',
//      name : 'meter_index',
      emptyText : '32-650'
    }, {
      fieldLabel : '检定有效期',
//      name : 'meter_index',
      emptyText : '型号'
    }, {
      fieldLabel : '通讯方式',
//      name : 'meter_index',
      emptyText : '型号'
    } ]
  } ],
  buttons : [ {
    text : '登记',
    formBind : true,
    id: 'registorMeterBtn'
  } ],
  initComponent : function() {
    this.callParent();
  }

});