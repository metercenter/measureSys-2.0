Ext.define('app.view.tree.UserTree', {
    extend:'Ext.tree.Panel',
    alias:'widget.userTree',
    requires:[
      'app.store.tree.UserTreeStore',
      'app.store.tree.SelectPanelStore',
      'app.store.tree.SelectMeterStore',
      'app.store.meterdata.MeterDataStore'
    ],
    id: 'userTree',
    autoScroll:true,
    scroll:'vertical',
    useArrows:true,
    stateful:false,
    border:true,
    rootVisible:true,
    userCompany: '金昇公司',
    config:{
      deplacementDepart:null
    },
    viewConfig:{
      loadMask:false,
      plugins:{
          ptype:'treeviewdragdrop',
          expandDelay:100
       }
    },
    listeners: {
      itemclick: function(view, record, item, index, e, eOpts) {
        var selectStore = Ext.create('store.selectPanelStore');
//        Ext.ComponentQuery.query('#meterFieldset')[0].setDisabled(true);
        this.userCompany = record.data.text;
        selectStore.load({
          params : {
            user_name : record.data.text
          },
          callback : function(records, options, success) {
            Ext.ComponentQuery.query('#operationarea')[0].setTitle ( record.data.text+'---数据信息');
            Ext.ComponentQuery.query('#userTree')[0].selectPanel(records[0].data.user_id, records[0].data.user_company);
          }
        });
      }
    },

  initComponent: function() {
        var store = Ext.create('store.userTreeStore');
        Ext.apply(this, {
            store: store
        });
        this.rootVisible = false;
        var selectStore = Ext.create('store.selectPanelStore');
        
        selectStore.load({
          callback : function(records, options, success) {
            Ext.ComponentQuery.query('#operationarea')[0].setTitle ( records[0].data.user_company+'---数据信息');
            Ext.ComponentQuery.query('#userTree')[0].selectPanel(records[0].data.user_id, records[0].data.user_company);
            Ext.ComponentQuery.query('#titlePage')[0].viewModel.set('companyName', records[0].data.user_company);
            Ext.ComponentQuery.query('#userTree')[0].userCompany = records[0].data.user_company;
          }
        });
        this.callParent(arguments);
    },
    
    selectPanel: function (user_id, company) {
      console.log("lskdjflksdj");
      var len = user_id.length;
      var timer;
      
      
      if(len == 2){
        Ext.ComponentQuery.query('#companycontainer')[0].setHidden(false);
        Ext.ComponentQuery.query('#warnInformation')[0].store.load({
          params : {
            user_company : company,
            warn_level: '一级警报'
          }
        });
      }else{
        Ext.ComponentQuery.query('#companycontainer')[0].setHidden(true);
      }
      
      if(len == 4 && company != '检定中心'){
        Ext.ComponentQuery.query('#gascoperationcontainer')[0].setHidden(false);
        Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().setValues({
          user_company: company
        });
        Ext.ComponentQuery.query('#dataChart')[0].surface.removeAll();
        Ext.ComponentQuery.query('#dataChart')[0].store.load({
          params : {
            user_company : company
          }
        });
        Ext.ComponentQuery.query('#warnInformationCompany')[0].store.load({
          params : {
            user_company : company,
            warn_level: '一级警报'
          }
        });
        Ext.Ajax.request({
          url : '/retrieveNodeNum',
          method : 'GET',
          params: {user_company: company},
          success : function(response, opts) {
            result = Ext.decode(response.responseText);
            if (result.status == 'SUCCESS'){
              Ext.ComponentQuery.query('#meterStatus')[0].getForm().setValues({
                all_node_num : result.data[0].all_node_num,
                valid_node_num : result.data[0].valid_node_num
              })
            } else {
              Ext.MessageBox.alert('提醒',result.data);
            }
          },
          failure : function() {
          }
        });
        Ext.Ajax.request({
          url : '/retrieveIndustryOutput',
          method : 'GET',
          params: {user_company: company},
          success : function(response, opts) {
            result = Ext.decode(response.responseText);
            if (result.status == 'SUCCESS'){
              Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().setValues({
                industry_output : result.data[0].industry_output,
              })
            } else {
              Ext.MessageBox.alert('提醒',result.data);
            }
          },
          failure : function() {
          }
        });
      }else{
        Ext.ComponentQuery.query('#gascoperationcontainer')[0].setHidden(true);
      }
      if (len == 4 && company == '检定中心') {
        Ext.ComponentQuery.query('#identifycontainer')[0].setHidden(false);
      }else{
        Ext.ComponentQuery.query('#identifycontainer')[0].setHidden(true);
      }
      if(len == 8){
        Ext.ComponentQuery.query('#chartcontainer')[0].setHidden(false);
//        console.log(Ext.ComponentQuery.query('#meterDataChart')[0]);
        Ext.ComponentQuery.query('#chartcontainer')[0].companyName = company;
        console.log(Ext.ComponentQuery.query('#meterDataChart')[0].items.items[0].items[0]);
        Ext.ComponentQuery.query('#meterDataChart')[0].myDataStore.load({
          params : {
            user_company : company
          }
        });
      }else{
        Ext.ComponentQuery.query('#chartcontainer')[0].setHidden(true);
      }
      
      
      if(len > 8){
//          timer = setInterval(function() {
//          Ext.ComponentQuery.query('#meterDataGrid')[0].store.load({
//            params : {
//              user_name : company
//            }
//          });
//       }, 6000);
        Ext.ComponentQuery.query('#metercontainer')[0].setHidden(false);
        var selectMeterStore = Ext.create('store.selectMeterStore');
        console.log(Ext.ComponentQuery.query('#dataarea'));
        Ext.ComponentQuery.query('#browseArea')[0].userName = company;
        selectMeterStore.load({
          params : {
            user_id : user_id
          },
          callback : function(records, options, success) {
            console.log(records);
            Ext.ComponentQuery.query('#meterbasicInfo')[0].getForm().setValues({
              meter_name:records[0].data.meter_name,
              meter_version: records[0].data.meter_index,
              meter_type: records[0].data.meter_type,
              meter_eui: records[0].data.meter_eui,
              outputMin: records[0].data.outputMin,
              outputMax: records[0].data.outputMax,
              pressureMin: records[0].data.pressureMin,
              pressureMax: records[0].data.pressureMax,
              temperatureMin: records[0].data.temperatureMin,
              temperatureMax: records[0].data.temperatureMax,
              valid_time: records[0].data.valid_time,
              meter_version: records[0].data.meter_version,
              meter_index: records[0].data.meter_index
            });
            console.log(Ext.ComponentQuery.query('#data_battery'));
            if (records[0].data.meter_type == '卓度'){
               Ext.ComponentQuery.query('#data_battery')[0].setText ('电量(V)');
               Ext.ComponentQuery.query('#data_vm')[0].hide();
               Ext.ComponentQuery.query('#data_p')[0].hide();
               Ext.ComponentQuery.query('#data_t')[0].hide();
               Ext.ComponentQuery.query('#data_qm')[0].hide();
               Ext.ComponentQuery.query('#data_analyze')[0].hide();
            }else{
              Ext.ComponentQuery.query('#data_battery')[0].setText ('电量(Month)');
              Ext.ComponentQuery.query('#data_vm')[0].show();
              Ext.ComponentQuery.query('#data_p')[0].show();
              Ext.ComponentQuery.query('#data_t')[0].show();
              Ext.ComponentQuery.query('#data_qm')[0].show();
              Ext.ComponentQuery.query('#data_analyze')[0].show();
            }
            Ext.ComponentQuery.query('#meterDataGrid')[0].store.extraParams={ user_name : company};
            Ext.ComponentQuery.query('#meterDataGrid')[0].store.load({
              params : {
                user_name : company
              }
            });
          }
        });  
       
      }else{
        Ext.ComponentQuery.query('#metercontainer')[0].setHidden(true);
      } 
    }
});