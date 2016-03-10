Ext.define('app.controller.main.BrowseAreaController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.browseAreaController',

	views:  [
// 'main.BrowseArea',
				'main.OperationArea'
			],

	init: function() {
		// alert('nihao');
		var me = this;

		this.getView().items.items[4].toggleCollapse();

		this.control({
			'#addUserBtn':{
				click: function(){
//				  console.log(Ext.ComponentQuery.query('#userTree'));
//				  Ext.ComponentQuery.query('#userTree')[0].view.getRootNode().expand()
					me.getView().items.items[5].setCollapsed(false);
          Ext.ComponentQuery.query('#addUser')[0].setHidden(false);
          Ext.ComponentQuery.query('#addMeter')[0].setHidden(true);
          Ext.ComponentQuery.query('#addCompanyIntro')[0].setHidden(true);
          Ext.ComponentQuery.query('#addFeedback')[0].setHidden(true);
				}
			}
		});
		
		this.control({
      '#addMeterBtn':{
        click: function(){
// me.getView().items.items[5].toggleCollapse();
          me.getView().items.items[5].setCollapsed(false);
          Ext.ComponentQuery.query('#addUser')[0].setHidden(true);
          Ext.ComponentQuery.query('#addCompanyIntro')[0].setHidden(true);
          Ext.ComponentQuery.query('#addMeter')[0].setHidden(false);
          Ext.ComponentQuery.query('#addFeedback')[0].setHidden(true);
        }
      }
    });
		
		this.control({
      '#changeCompanyIntro':{
        click: function(){
          me.getView().items.items[5].setCollapsed(false);
          Ext.ComponentQuery.query('#addUser')[0].setHidden(true);
          Ext.ComponentQuery.query('#addMeter')[0].setHidden(true);
          Ext.ComponentQuery.query('#addCompanyIntro')[0].setHidden(false);
          Ext.ComponentQuery.query('#addFeedback')[0].setHidden(true);
        }
      }
    });
		
		this.control({
		  '#feedbackBtn': {
		    click: function(){
		      me.getView().items.items[5].setCollapsed(false);
          Ext.ComponentQuery.query('#addUser')[0].setHidden(true);
          Ext.ComponentQuery.query('#addMeter')[0].setHidden(true);
          Ext.ComponentQuery.query('#addCompanyIntro')[0].setHidden(true);
          Ext.ComponentQuery.query('#addFeedback')[0].setHidden(false);
		    }
		  }
		  
		});
		
	  this.control({
	    '#addfeedbackrecord':{
	      click:function() {
          var formData = Ext.ComponentQuery.query('#addFeedback')[0].getForm();
          Ext.MessageBox.confirm('提示', '您确定要添加用户反馈信息？', callBack);
          function callBack(btn, text) {
            if (btn != 'no'){
              Ext.Ajax.request({
                url : '/AddUserFeedback',
                method : 'POST',
                params : formData.getValues(),
                success : function(response, opts) {
                  Ext.MessageBox.confirm('提示', '客户反馈信息已添加，是否关闭窗口？', callBack);
                  Ext.ComponentQuery.query('#userfeedbackgrid')[0].store.load();
                  
                  function callBack(btn, text) {
                    if (btn != 'no')
                      me.getView().items.items[5].setCollapsed(true);
                  }
                },
                failure : function() {
                }
              })
            }
              
          }	        
	      }
	    }
	  });
		this.control({
		  '#companyIntro':{
		    click:function(){
          var formData = Ext.ComponentQuery.query('#addCompanyIntro')[0].getForm();
          Ext.MessageBox.confirm('提示', '您确定要修改公司简介信息？', callBack);
          function callBack(btn, text) {
            if (btn != 'no'){
              Ext.Ajax.request({
                url : '/changeCompanyIntro',
                method : 'POST',
                params : formData.getValues(),
                success : function(response, opts) {
                  Ext.MessageBox.confirm('提示', '客户信息已注册，是否关闭窗口？', callBack);
//                  Ext.ComponentQuery.query('#userTree')[0].store.load();
                  
                  function callBack(btn, text) {
                    if (btn != 'no')
                      me.getView().items.items[5].setCollapsed(true);
                  }
                },
                failure : function() {
                }
              })
            }
              
          }
		    }
		  }
		});
		
		this.control({
		  '#registorBtn':{
        click: function(){
          var formData = Ext.ComponentQuery.query('#addUser')[0].getForm();
          Ext.MessageBox.confirm('提示', '您确定要添加该客户信息？', callBack);
          function callBack(btn, text) {
            if (btn != 'no'){
              Ext.Ajax.request({
                url : '/register_company',
                method : 'POST',
                params : formData.getValues(),
                success : function(response, opts) {
                  Ext.MessageBox.confirm('提示', '客户信息已注册，是否关闭窗口？', callBack);
                  Ext.ComponentQuery.query('#userTree')[0].store.load();
                  
                  function callBack(btn, text) {
                    if (btn != 'no')
                      me.getView().items.items[5].setCollapsed(true);
                  }
                },
                failure : function() {
                }
              })
            }
              
          }
        }
		  }
		});
		
		this.control({
		  '#modifyMeter' :{
		    click: function() {
		      Ext.ComponentQuery.query('#meterFieldset')[0].setDisabled(false);
		    }
		  }
		  
		});
		
		this.control({
		  '#modifyOutputDiff':{
		    click: function() {
          var input = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['input'];
          input = input == ''? 0 : parseInt(input);
          var ioutput = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['industry_output'];
          ioutput = ioutput == ''? 0 : parseInt(ioutput);
          var routput = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['resident_output'];
          routput = routput == ''? 0 : parseInt(routput);
          var ooutput = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['other_output'];
          ooutput = ooutput == ''? 0 : parseInt(ooutput);
          var outputdiff = input-ioutput-routput-ooutput;
          Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().setValues({
            output_diff: outputdiff
          });
          var userCompany = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['user_company'];
          var formData = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm();
          
          Ext.MessageBox.confirm('提示', '您确定要修改前日输差信息？', callBack);
          function callBack(btn, text) {
            if (btn != 'no'){
              Ext.Ajax.request({
                url : '/modifyOutputDiff',
                method : 'POST',
                params : formData.getValues(),
                success : function(response, opts) {
                  result = Ext.decode(response.responseText);
                  if (result.status == 'SUCCESS'){
                    Ext.MessageBox.alert('提示', '前日输差信息已成功修改');
//                    console.log(Ext.ComponentQuery.query('#dataChart')[0].store)
                    Ext.ComponentQuery.query('#dataChart')[0].store.load({
                      params : {
                        user_company : userCompany
                      }
                    });
                  } else {
                    Ext.MessageBox.alert('提醒',result.data);
                  }
                },
                failure : function() {
                }
              })
            }
          }
        } 
		  }
		});
		
		this.control({
		  '#addOutputDiff' :{
		    click: function() {
		      var input = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['input'];
		      input = input == ''? 0 : parseInt(input);
		      var ioutput = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['industry_output'];
		      ioutput = ioutput == ''? 0 : parseInt(ioutput);
          var routput = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['resident_output'];
          routput = routput == ''? 0 : parseInt(routput);
          var ooutput = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['other_output'];
          ooutput = ooutput == ''? 0 : parseInt(ooutput);
          var outputdiff = input-ioutput-routput-ooutput;
		      Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().setValues({
            output_diff: outputdiff
          });
		      var userCompany = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm().getValues()['user_company'];
		      var formData = Ext.ComponentQuery.query('#outputDiffInfo')[0].getForm();
		      
		      Ext.MessageBox.confirm('提示', '您确定要添加前日输差信息？', callBack);
          function callBack(btn, text) {
            if (btn != 'no'){
              Ext.Ajax.request({
                url : '/addOutputDiff',
                method : 'POST',
                params : formData.getValues(),
                success : function(response, opts) {
                  result = Ext.decode(response.responseText);
                  if (result.status == 'SUCCESS'){
                    Ext.MessageBox.alert('提示', '前日输差信息已成功添加');
//                    console.log(Ext.ComponentQuery.query('#dataChart')[0].store)
                    Ext.ComponentQuery.query('#dataChart')[0].store.load({
                      params : {
                        user_company : userCompany
                      }
                    });
                  } else {
                    Ext.MessageBox.alert('提醒',result.data);
                  }
                },
                failure : function() {
                }
              })
            }
          }
		    }
		  }
		});
		
		this.control({
		  '#exportData' :{
		    click: function() {
		      var userCompany = Ext.ComponentQuery.query('#userTree')[0].userCompany;
		      Ext.MessageBox.confirm('提示', '您确定要输出'+userCompany+'的流量计信息？', callBack);
          function callBack(btn, text) {
            if (btn != 'no'){
              window.location.href = "/get-excel-file?&user_company="+userCompany;
            }
          }
		    }
		  }
		})
		
		
		this.control({
		  '#registorMeterBtn':{
		    click: function() {
		      var formData = Ext.ComponentQuery.query('#addMeter')[0].getForm();
		      Ext.MessageBox.confirm('提示', '您确定要添加该流量计信息？', callBack);
          function callBack(btn, text) {
            if (btn != 'no'){
              Ext.Ajax.request({
                url : '/register_meter',
                method : 'POST',
                params : formData.getValues(),
                success : function(response, opts) {
                  result = Ext.decode(response.responseText);
                  if (result.status == 'SUCCESS'){
                    Ext.MessageBox.confirm('提示', '流量计信息已成功添加，是否关闭窗口？', callBack);
                    Ext.ComponentQuery.query('#userTree')[0].store.load();
                    
                    function callBack(btn, text) {
                      if (btn != 'no')
                        me.getView().items.items[5].setCollapsed(true);
                    }
                  } else {
                    Ext.MessageBox.alert('提醒',result.data);
                  }
                },
                failure : function() {
                }
              })
            }
              
          }
		    }
		  }
		});
		
this.control({
	  '#identificationMeterBtn':{
	    click:function(){
    var formData = Ext.ComponentQuery.query('#addIdentificationMeter')[0].getForm();
    Ext.MessageBox.confirm('提示', '您确定添加该检定信息？', callBack);
    function callBack(btn, text) {
      if (btn != 'no'){
        Ext.Ajax.request({
          url : '/addIndentificationMeter',
          method : 'POST',
          params : formData.getValues(),
          success : function(response, opts) {
            Ext.MessageBox.alert('提示', '该检定信息已添加');
            Ext.ComponentQuery.query('#identificationMeterGrid')[0].store.load();
          },
          failure : function() {
          }
        })
      }
        
    }
	    }
	  }
	});


	}

});