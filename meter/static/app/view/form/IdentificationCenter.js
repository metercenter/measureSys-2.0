Ext.define('app.view.form.IdentificationCenter', {
  extend : 'Ext.form.Panel',
  alias : 'widget.indentificationCenter',
  layout : {
    type : 'vbox',
    align : 'stretch'
  },
  id: 'addIdentificationMeter',
  items : [ {
    layout : {
      type : 'hbox',
      align : 'stretch'
    },
    items : [ {
      xtype : 'panel',
      title : '基本信息',
      flex : 1,
      bodyStyle : {
        padding : '10px'
      },
      items : [ {
        xtype : 'fieldset',

        defaultType : 'textfield',
        defaults : {
          anchor : '100%'
        },
        padding : '10px',
        items : [ {
          allowBlank : false,
          xtype : 'combobox',
          name : 'user_id',
          fieldLabel : '燃气公司',
          displayField : 'gas_company',
          valueField: 'user_id',
          editable: false,
          store : {
            fields : [ 'user_id', 'gas_company' ],
            proxy : {
              type : 'ajax',
              url : '/getIndComp',
              reader : {
                type : 'json'
              }
            },
            autoLoad : true
          },
          listeners:{
              scope: this,
              'select': function(combo, rec, idx){
                 var user_val = combo.getValue();
                 var meter_obj = Ext.getCmp('user_combo');        
                 meter_obj.clearValue();
                 meter_obj.store.load({
                   params : {
                     user_id :user_val
                   },
                   callback : function(records, options, success) {
                     meter_obj.setDisabled(false);
                   }
                 });
            }
          },             
          queryMode : 'local'
      }, {
          allowBlank : false,
          xtype : 'combobox',
          id: 'user_combo',
          name : 'user_id',
          fieldLabel : '燃气用户',
          displayField : 'user_company',
          valueField: 'user_id',
          editable: false,
          store : {
            fields : [ 'user_id', 'user_company' ],
            proxy : {
              type : 'ajax',
              url : '/getIndUser',
              reader : {
                type : 'json'
              }
            },
            autoLoad : true
          },
          listeners:{
              scope: this,
              'select': function(combo, rec, idx){
                 var user_val = combo.getValue();
                 var meter_obj = Ext.getCmp('meter_combo');        
                 meter_obj.clearValue();
                 meter_obj.store.load({
                   params : {
                     user_id :user_val
                   },
                   callback : function(records, options, success) {
                	   meter_obj.setDisabled(false);
                   }
                 });
          	}
          },             
          queryMode : 'local'
      }, {
          xtype : 'combobox',
          name : 'meter_eui',
          fieldLabel : '流量计EUI',
          displayField : 'meter_eui',
          disabled: true,
          editable: false,
          id: 'meter_combo',
          store : {
            fields : [ 'meter_eui'],
            proxy : {
              type : 'ajax',
              url : '/getIndMeter',
              reader : {
                type : 'json'
              }
            }
          },
          queryMode : 'local'
        }, {
            xtype : 'combobox',
            name : 'meter_type',
            fieldLabel : '流量计品牌',
            displayField : 'meter_type_name',
            valueField: 'meter_type',
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
          allowBlank : false,
          fieldLabel : '型号',
          name : 'meter_version',
          emptyText : '类型编号'
        }, {
          allowBlank : false,
          fieldLabel : '序列号',
          name : 'meter_index',
          emptyText : ''
        

        }, {
          xtype : 'datefield',
          allowBlank : false,
          format : 'Y-m-d',
          fieldLabel : '检定日期',
          editable: false,
          name : 'identify_date'
        }, {
            xtype : 'datefield',
            allowBlank : false,
            format : 'Y-m-d',
            fieldLabel : '下次检定日期',
            editable: false,
            name : 'next_identify_date'
        } ]
      } ]
    }, {
      xtype : 'panel',
      title : '检定数据',
      flex : 1,
      bodyStyle : {
        padding : '10px'
      },
      items : [ {
        xtype : 'fieldset',
        defaultType : 'textfield',
        defaults : {
          anchor : '100%'
        },
        padding : '10px',
        items : [ {
          // fieldLabel : '流量范围',
          // name : 'output_range'
          xtype : 'fieldcontainer',
          fieldLabel : '流量范围',
          layout : {
            type : 'hbox',
            align : 'center'
          },
          items : [ {
            xtype : 'textfield',
            flex:1,
            name: 'outputMin'
          }, {
            xtype : 'displayfield',
            value : '~'
          }, {
            xtype : 'textfield',
            flex:1,
            name: 'outputMax'
          }, {
            xtype : 'displayfield',
            value : '(m3/h)'
          } ]
        }, {
          xtype : 'fieldcontainer',
          fieldLabel : '压力范围',
          layout : {
            type : 'hbox',
            align : 'center'
          },
          items : [ {
            xtype : 'textfield',
            flex:1,
            name: 'pressureMin'
          }, {
            xtype : 'displayfield',
            value : '~'
          }, {
            xtype : 'textfield',
            flex:1,
            name: 'pressureMax'
          }, {
            xtype : 'displayfield',
            value : '(bar)'
          } ]

        // disabled: true
        }, {
          xtype : 'fieldcontainer',
          fieldLabel : '温度范围',
          layout : {
            type : 'hbox',
            align : 'center'
          },
          items : [ {
            xtype : 'textfield',
            name: 'temperatureMin',
            flex: 1
          }, {
            xtype : 'displayfield',
            value : '~'
          }, {
            xtype : 'textfield',
            name: 'temperatureMax',
            flex:1
          }, {
            xtype : 'displayfield',
            value : '(℃)'
          } ]
        },{
          allowBlank : false,
          fieldLabel : '介质',
          name : 'medium'
        }, {
          xtype : 'fieldcontainer',
          fieldLabel : '检定点100%Qmax偏差',
          labelWidth : 150,
          layout : {
            type : 'hbox',
            align : 'center'
          },
          items:[{
            xtype : 'textfield',
            allowBlank : false,
            name : 'Qmax100',
            flex:1,
            emptyText : '-1~1'
          }, {
            xtype : 'displayfield',
            value : '(%)'
          }]
        }, {
          xtype : 'fieldcontainer',
          fieldLabel : '检定点60%Qmax偏差',
          labelWidth : 150,
          layout : {
            type : 'hbox',
            align : 'center'
          },
          items:[{
            xtype : 'textfield',
            allowBlank : false,
            name : 'Qmax60',
            flex:1,
            emptyText : '-1~1'
          }, {
            xtype : 'displayfield',
            value : '(%)'
          }]  
        }, {
          xtype : 'fieldcontainer',
          fieldLabel : '检定点40%Qmax偏差',
          labelWidth : 150,
          layout : {
            type : 'hbox',
            align : 'center'
          },
          items:[{
            xtype : 'textfield',
            allowBlank : false,
            name : 'Qmax40',
            flex:1,
            emptyText : '-1~1'
          }, {
            xtype : 'displayfield',
            value : '(%)'
          }]    
        }, {
          xtype : 'fieldcontainer',
          fieldLabel : '检定点20%Qmax偏差',
          labelWidth : 150,
          layout : {
            type : 'hbox',
            align : 'center'
          },
          items:[{
            xtype : 'textfield',
            allowBlank : false,
            name : 'Qmax20',
            flex:1,
            emptyText : '-1~1'
          }, {
            xtype : 'displayfield',
            value : '(%)'
          }]    
        }, {
          xtype : 'fieldcontainer',
          fieldLabel : '检定点10%Qmax偏差',
          labelWidth : 150,
          layout : {
            type : 'hbox',
            align : 'center'
          },
          items:[{
            xtype : 'textfield',
            allowBlank : false,
            name : 'Qmax10',
            flex:1,
            emptyText : '-1~1'
          }, {
            xtype : 'displayfield',
            value : '(%)'
          }]     
        } ]
      } ]
    } ]
  }, {
    buttons : [ {
      text : '新增录入',
      formBind : true,
      id: 'identificationMeterBtn'
    } ]
  } ]
});