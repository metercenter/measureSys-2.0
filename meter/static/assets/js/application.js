var app = angular.module("Application", ['datatables','datatables.bootstrap', 'ui.bootstrap','highcharts-ng','pageRequest','smart-table','ngTable','ngRoute','ui.map','tm.pagination']);

Highcharts.setOptions({
    global : {
        useUTC : false
    }
});	

function ___________globalParam_______start(){};
app.factory('globalParams', function($http){
  var current_company = "金昇公司";
  var current_meter = "1号流量计";
  var current_meter_eui = "36ffd60532573238";
  var user_company = "万达广场";
  var user_id = "0001000400000002";
  var data_qm_p = '';
  return {
    current_company : current_company,
    current_meter: current_meter,
    current_meter_eui: current_meter_eui,
    user_company:user_company,
    user_id: user_id,
    data_qm_p: data_qm_p
  };

});
function ___________globalParam_______end(){};



function ___________headerUserCtrl______start(){};

app.controller('headerUserCtrl', function($scope, $http, globalParams){
  $http({
    url:'/getCurrentUser',
    method:'GET'
  })
  .success(function(response) {
    $scope.headerName = response[0].userName;
    globalParams.user_id = response[0].userID;
    if (globalParams.user_id.length == 2){
      $scope.homepageTitle = "#/homepage/"+globalParams.user_id;
      page = '/homepage/00';
    }else if (globalParams.user_id.length == 4){
      $scope.homepageTitle = "#/companypage/"+globalParams.user_id;
      page = "/companypage/"+globalParams.user_id;
    }else if (globalParams.user_id.length == 8){
      $scope.homepageTitle = "#/userpage/"+globalParams.user_id;
      page = "/userpage/"+globalParams.user_id;
    }   
    $scope.warnpageTile = "#/warnpage/"+ globalParams.user_id;
    $scope.gascollectionpageTile = "#/gascollectionpage/"+ globalParams.user_id;
    //console.log(globalParams.current_page);
  });
});

function ___________headerUserCtrl________end(){};


app.run(function($location, $http, globalParams){
  $http({
    url:'/getCurrentUser',
    method:'GET'
  })
  .success(function(response) {
    globalParams.user_id = response[0].userID;
    if (globalParams.user_id.length == 2){
      page = '/homepage/00';
    }else if (globalParams.user_id.length == 4){
      page = "/companypage/"+globalParams.user_id;
    }else if (globalParams.user_id.length == 8){
      page = "/userpage/"+globalParams.user_id;
    }
    $location.url(page);
  });
});

function ___________ngRoute___________Start(){};
app.config(['$routeProvider', function($routeProvider){
	  $routeProvider.
	    when('/homepage/:id',{
	      templateUrl: 'homepage.html',
	      controller: HomePageCtrl
	    }).
	    when('/companypage/:id',{
	      templateUrl: 'company.html',
	      controller: CompanyPageCtrl
	    }).
	    when('/userpage/:id',{
	      templateUrl: 'user.html',
	      controller: UserPageCtrl
	    }).
	    when('/meterpage/:id',{
	      templateUrl: 'meter.html',
	      controller: MeterPageCtrl
	    }).
	    when('/warnpage/:id',{
	      templateUrl: 'warn.html',
	      controller: WarnPageCtrl
	    }).
	    when('/identificationpage/:id',{
            templateUrl: 'identification.html',
            controller: IdentificationPageCtrl
	    }).
	    when('/datacenter/:id',{
            templateUrl: 'datacenter.html'
	    }).
      when('/gascollectionpage/:id',{
            templateUrl: 'gascollection.html',
            controller: GasCollectionPageCtrl
	    });
	}]);

function HomePageCtrl($scope, $routeParams, globalParams) {
  globalParams.user_id = $routeParams.id
};
function CompanyPageCtrl($scope, $routeParams, globalParams) {
  globalParams.user_id = $routeParams.id
  $scope.title = $routeParams.id;
};
function UserPageCtrl($scope, $routeParams, globalParams) {
  globalParams.user_id = $routeParams.id
  $scope.title = $routeParams.id;
};
function MeterPageCtrl($scope, $routeParams,$http, globalParams) {
  globalParams.user_id = $routeParams.id
};
function IdentificationPageCtrl($scope, $routeParams,globalParams) {
	  globalParams.user_id = $routeParams.id;	  
};
function WarnPageCtrl($scope, $routeParams,globalParams) {
  globalParams.user_id = $routeParams.id;
};

function GasCollectionPageCtrl($scope, $routeParams,globalParams) {
  globalParams.user_id = $routeParams.id;


  //alert('nihao'); 这里完成一些初始化的操作
};
function ___________ngRoute___________End(){};

/////////////////////测试一下刚才总结的modal//////////////////////////
app.controller('testModalCtrl',function($scope, $modal){
  $scope.animationsEnabled = true;
  $scope.open = function(size) {
    var testModalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'testModal.html',
      controller: 'testModalInstanceCtrl',
      size: size,
      resolve: {
        assigner : function () {
          return '';
        }
      }
    });

    testModalInstance.result.then(function (returnVal){
      alert(returnVal);
    },function(){

    }) ;
  }
});

function printcontent(content)
{
    var mywindow = window.open('', '', '');
    mywindow.document.write('<html><title>Print</title><body>');
    mywindow.document.write(content);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.print();
    return true;
};

app.controller('testModalInstanceCtrl', function($scope, $modalInstance,assigner){
  $scope.assignee = assigner;

  $scope.reportPath = "/static/report.html";
  //$scope.reportPath = "/static/onePiple.htm";
  $scope.ok = function(){
    printcontent($("#reportContent").html());
    $modalInstance.close($scope.assignee);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }

});


/////////////////////测试一下刚才总结的modal//////////////////////////


function ___________SidebarControl_________start(){}

app.factory('sidebarStyle', function(){
  return {
    isActive: false, 
    isRightActive: false,
    tree: []
  };
});

app.controller('headerBtnforsidebar',function(sidebarStyle, $scope){
  $scope.sidebarStyle = sidebarStyle;
  $scope.toggle = function(){
    sidebarStyle.isActive=!sidebarStyle.isActive;
    sidebarStyle.isRightActive=!sidebarStyle.isRightActive;
  }
});
app.controller('rightSiderbarCtrl',function(sidebarStyle, $scope){
  $scope.sidebarStyle = sidebarStyle;
});
app.controller('siderbarCtrl',function($scope, $http, sidebarStyle){
  $scope.sidebarStyle = sidebarStyle;
  $http({
    url:'/get-user-group',
    method:'GET'
  })
  .success(function(response) {
    sidebarStyle.tree = response
    $scope.tree = sidebarStyle.tree;
  });
  
  $scope.toggle = function(data) {
    var nodeSet = data.nodes;
    for (i=0; i<nodeSet.length; i++){
      nodeSet[i].visible = !nodeSet[i].visible;
    }
    //遍历整个tree
    
  };
  
  
  $scope.show =function(data) {
    if (data.visible == true)
      return true;
    else
      return false;
  }
  
});

function ___________SidebarControl_________end(){};





function ___________dataAnalyzeModal________start(){};
app.controller('deviationCtrl', function ($scope, $modal, $log, globalParams) {
  
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;
  

  $scope.open = function open(row) {

    globalParams.data_qm_p = row.data_qm;
    globalParams.current_meter_eui = row.meter_eui;
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deviationCtrl.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});


app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {//

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

app.controller('DeviationCtrl',  function ($scope,$http,globalParams) {
  $http({
    url:'/getDeviationVal',
    method:'GET',
    params:{meter_eui: globalParams.current_meter_eui,
      data_qm: globalParams.data_qm_p }
  }).success(function(response) {
	  
	  if(response.length==12){
		  factoryContent = '出厂检定偏差曲线'
		  factoryData = [0, response[7].deviation_val, response[8].deviation_val, response[9].deviation_val,response[10].deviation_val, response[11].deviation_val]
	  }
	  else {
		  factoryContent = '暂未录入出厂检定参数'
		  factoryData = [0,0,0,0,0,0]
	  }			  

    $scope.chartConfig = {
            options: {
                chart: {
                    type: 'spline',
                    zoomType: 'x'
                }
            },
            title: {
                text: '实时数据分析'
            },
            subtitle: {
                text: '检定数据对比'
            },
            xAxis: {
                categories: ['0%Qmax', '10%Qmax', '20%Qmax', '40%Qmax', '60%Qmax', '100%Qmax']
            },
            yAxis: {
                title: {
                    text: '偏差(%)'
                },
                min: -2,
                max: 2,
                startOnTick: false,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [{
                name: '最新检定偏差曲线',
                data: [0, response[0].deviation_val, response[1].deviation_val, response[2].deviation_val,
                       response[3].deviation_val, response[4].deviation_val]
            },
            {
                name: factoryContent,
                data: factoryData
            },
            {name: '实时工况瞬时流量',
             marker: {
                radius: 5,
                symbol: "circle"
            },data: [{x:response[5].single_qm_level,y:response[5].single_qm_diff,fillColor:'red'}]}]
    }
  });
});

function ___________dataAnalyzeModal________end(){};





function ___________importantWarnData________start(){};
app.controller('WarnCtrl-1', function ($scope, $http, globalParams) {
	//$http({
	//	url:'/getWarnInfo',
	//	method:'GET',
	//	params:{user_id: globalParams.user_id,
	//		warn_level: "一级警报"}
	//}).success(function(response) {
    //
	//  $scope.rowCollection = response;
    //
	//  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	//  $scope.displayedCollection = [].concat($scope.rowCollection);
    //
	//  });
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            THIS = $scope.paginationConf;
            $http({
                url:'/getWarnInfo',
                method:'GET',
                params: {
                    user_id: globalParams.user_id,
                    warn_level: "一级警报",
                    pageNum: THIS.currentPage,
                    pageSize:  THIS.itemsPerPage
                }
            }).success(function(response) {

                $scope.rowCollection = response.data;
                THIS.totalItems = response.count

                //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
                $scope.displayedCollection = [].concat($scope.rowCollection);
            });
        }
    };
});
function ___________importantWarnData________end(){};




function ___________allWarnData________start(){};
app.controller('WarnCtrl-all', function ($scope, $http, globalParams) {
	$http({
		url:'/getWarnInfo',
		method:'GET',
		params:{user_id: globalParams.user_id}
	}).success(function(response) {

	  $scope.rowCollection = response;

	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});
function ___________allWarnData________end(){};





function ___________userFeedback________start(){};
app.controller('UserFeedbackCtrl', function ($scope, $http) {
	$http({
		url:'/getUserFeedback',
		method:'GET'
	}).success(function(response) {

	  $scope.rowCollection = response;

	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});
function ___________userFeedback________end(){};	



function ___________MeterDataCtrl________start(){};  
app.controller('MeterDataCtrl', function ($scope, $http, globalParams) {
	  var periodTime = 7;
	  
	  update();
	  
	  function update() {
			$http({
				url:'/get-data',
				method:'GET',
				params:{user_id: globalParams.user_id,
					period:periodTime}
			}).success(function(response) {

			  $scope.rowCollection = response;
			  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
			  $scope.displayedCollection = [].concat($scope.rowCollection);
			  });
	  }

	  $scope.week = function () {
	    $("#oneWeekBt").attr("class","btn btn-primary");
	    $("#oneMonthBt").attr("class","btn btn-default");
	    $("#oneYearBt").attr("class","btn btn-default");
	    $("#totalBt").attr("class","btn btn-default");
	    periodTime = 7;
	    update();
	  };
	  $scope.month = function () {
	    $("#oneWeekBt").attr("class","btn btn-default");
	    $("#oneMonthBt").attr("class","btn btn-primary");
	    $("#oneYearBt").attr("class","btn btn-default");
	    $("#totalBt").attr("class","btn btn-default");
	    periodTime = 30;
	    update();
	  };
	  $scope.year = function () {
	    $("#oneWeekBt").attr("class","btn btn-default");
	    $("#oneMonthBt").attr("class","btn btn-default");
	    $("#oneYearBt").attr("class","btn btn-primary");
	    $("#totalBt").attr("class","btn btn-default");
	    periodTime = 365;
	    update();
	  };
	  $scope.total = function () {
	    $("#oneWeekBt").attr("class","btn btn-default");
	    $("#oneMonthBt").attr("class","btn btn-default");
	    $("#oneYearBt").attr("class","btn btn-default");
	    $("#totalBt").attr("class","btn btn-primary");
	    periodTime = 9999;
	    update();
	  };
});



app.controller('UserMeterDataCtrl', function ($scope,$http,globalParams) {
  var periodTime = 7;
  
  update();
  
  function update() {
    var datas = [];
    $http({
        url:'/meterDataChart',
        method:'GET',
        params:{user_id: globalParams.user_id,
          period: periodTime }
      }).success(function(response) {
        for (var i=0;i<response.length;i++)
        {
          datas.push([response[i].data_date, response[i].data_qb])
        }
        $scope.chartConfig = {
                options: {
                    chart: {
                        type: 'spline',
                        zoomType: 'x'
                    },
                    rangeSelector: {
                        enabled: true
                    },
                    navigator: {
                        enabled: true
                    }
                },
                title: {
                    text: '流量计标况统计'
                },
//                useHighStocks: true,
                xAxis: {
                    startOnTick: true,
                    type: 'datetime',
                    tickInterval: 3600 * 1000 * 24,
                    labels:{
                        formatter: function() {
                            var d = new Date(this.value);
                                 return Highcharts.dateFormat("%Y-%m-%e",this.value); // just month
                             
                        },
                    rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: '总流量(Nm3)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                series: [{
                  name: '总流量',
                  data: datas
                }]
        }
      });
  }

  $scope.week = function () {
    $("#oneWeekBt").attr("class","btn btn-primary");
    $("#oneMonthBt").attr("class","btn btn-default");
    $("#oneYearBt").attr("class","btn btn-default");
    $("#totalBt").attr("class","btn btn-default");
    periodTime = 7;
    $("dataChart").hide().fadeIn('fast');
    update();
  };
  $scope.month = function () {
    $("#oneWeekBt").attr("class","btn btn-default");
    $("#oneMonthBt").attr("class","btn btn-primary");
    $("#oneYearBt").attr("class","btn btn-default");
    $("#totalBt").attr("class","btn btn-default");
    periodTime = 30;
    $("dataChart").hide().fadeIn('fast');
    update();
  };
  $scope.year = function () {
    $("#oneWeekBt").attr("class","btn btn-default");
    $("#oneMonthBt").attr("class","btn btn-default");
    $("#oneYearBt").attr("class","btn btn-primary");
    $("#totalBt").attr("class","btn btn-default");
    periodTime = 90;
    $("dataChart").hide().fadeIn('fast');
    update();
  };
  $scope.total = function () {
    $("#oneWeekBt").attr("class","btn btn-default");
    $("#oneMonthBt").attr("class","btn btn-default");
    $("#oneYearBt").attr("class","btn btn-default");
    $("#totalBt").attr("class","btn btn-primary");
    periodTime = 365;
    $("dataChart").hide().fadeIn('fast');
    update();
  };
  

});

function ___________MeterDataCtrl________end(){};  




function add________________Modal____________start(){};

app.controller('AddUserModalCtrl', function($scope, $modal, $log){
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;
  

  $scope.open = function open() {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'AddUserModal.html',
      controller: 'AddUserModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

app.controller('AddUserModalInstanceCtrl', function ($scope, $http, $modalInstance, items, sidebarStyle) {//
  
  $scope.companys = [];
  $scope.warning = ""
  $http({
    url:'/get-user-level',
    method:'GET'
  }).success(function(response) {
    response.forEach(function(entry){
      $scope.companys.push(entry.user_company);
    });
  });
  
  $scope.submit = function () {
    if (($scope.user.length==0)|($scope.password.length==0)|($scope.confirmpassword.length==0)|($scope.userName.length==0)
    		|($scope.userPhone.length==0)|($scope.company.length==0)) {
    	$scope.warning = "信息还未完全输入"
    	return
    }
    if ($scope.password != $scope.confirmpassword) {
    	$scope.warning = "两次密码输入不一致"
    	return
    }
    if ($scope.password.length < 4) {
    	console.log("...");
    	$scope.warning = "密码长度过短,建议4位字符或以上"
    	return
    }
    
    	
    $http({
        url: 'register_company',
        method: "POST",
        data: { user : $scope.user,
            	pass : $scope.password,
            	company : $scope.userName,
            	phone : $scope.userPhone,
            	user_company : $scope.companys[$scope.company]
            	}
    }).success(function(response) {
      if ((response.status == "FAIL")&&(response.reason == "USER_NAME")) {
    	  $scope.warning = "用户名已存在，请重新输入"
    	  return
      }
      if ((response.status == "FAIL")&&(response.reason == "COMPANY")) {
    	  $scope.warning = "该公司已注册"
    	  return
      }
      $scope.warning = "注册成功，欢迎使用本系统"
      $http({
        url:'/get-user-group',
        method:'GET'
      })
      .success(function(response) {
        sidebarStyle.tree = response
      });
      });
  };
  
  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $modalInstance.close();
  };
  
});

app.controller('AddMeterModalCtrl', function($scope, $modal, $log){
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function open() {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'AddMeterModal.html',
      controller: 'AddMeterModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

app.controller('AddMeterModalInstanceCtrl', function ($scope, $http, $modalInstance, items) {//

  $scope.companys = [];
  $scope.metertypes = [];
  $scope.provinces = [];
  $scope.cities = [];
  $scope.districts = [];
  $scope.warning = ""

  var provinces_id = [];
  var cities_id = [];
  var districts_id = [];
  $http({
    url:'/getIndUser',
    method:'GET'
  }).success(function(response) {
    response.forEach(function(entry){
      $scope.companys.push(entry.user_company);
    });
  });

  $http({
	    url:'/getMeterType',
	    method:'GET'
	  }).success(function(response) {
	    response.forEach(function(entry){
	      $scope.metertypes.push(entry.meter_type_name);
	    });
	  });
  
  $http({
      url:'/getDistrict',
      method:'GET'
    }).success(function(response) {
	    response.forEach(function(entry){
	      $scope.provinces.push(entry.district_name);
	      provinces_id.push(entry.district_id)
	    });
	  });
  
  $scope.province_update = function(province) {
	  $http({
		    url:'/getDistrict',
		    method:'GET',
		    params:{province_id: provinces_id[province]}
		  }).success(function(response) {
			  $scope.cities = [];
			  cities_id = [];
		    response.forEach(function(entry){
		      $scope.cities.push(entry.district_name);
		      cities_id.push(entry.district_id);
		    });
		  });
  };

  $scope.city_update = function(city) {
	  $http({
		    url:'/getDistrict',
		    method:'GET',
		    params:{city_id: cities_id[city]}
		  }).success(function(response) {
			  $scope.districts = [];
			  districts_id = [];
		    response.forEach(function(entry){
		      $scope.districts.push(entry.district_name);
		      districts_id.push(entry.district_id);
		    });
		  });
  };

  $scope.submit = function () { 
	    $scope.warning = " "
	    if ($scope.meterName == null) {$scope.warning = "请输入流量计名";return;}
	    if ($scope.eui == null) {$scope.warning = "请输入节点编号";return;}
	    if ($scope.company == null) {$scope.warning = "请选择隶属客户";return;}
	    if ($scope.meter_type1 == null) {$scope.warning = "请选择流量计品牌";return;}
	    if ($scope.meter_type2 == null) $scope.meter_type2 = $scope.meter_type1;
	    if ($scope.meterIndex == null) $scope.meterIndex = "--";
	    if ($scope.meterVersion == null) $scope.meterVersion = "--";
	    if ($scope.wrapCode == null) $scope.wrapCode = "--";
	    if ($scope.outMin == null) $scope.outMin = "-";
	    if ($scope.outMax == null) $scope.outMax = "-";
	    if ($scope.pressMin == null) $scope.pressMin = "-";
	    if ($scope.pressMax == null) $scope.pressMax = "-";
	    if ($scope.tempMin == null) $scope.tempMin = "-";
	    if ($scope.tempMax == null) $scope.tempMax = "-";
	    if ($scope.district == null) 
	    	districtsID = "--";
	    else
	    	districtsID = districts_id[$scope.district];
	    
	    $http({
	        url: '/register_meter',
	        method: "POST",
	        data: { meter_name : $scope.meterName,
	        	meter_eui : $scope.eui,
	        	user_company : $scope.companys[$scope.company],
	        	meter_type : $scope.meter_type1,
	        	meter_revisetype: $scope.meter_type2,
	        	meter_index: $scope.meterIndex,
	        	meter_version: $scope.meterVersion,	            
	            wrap_code : $scope.wrapCode,
	            districts_id: districtsID,
	            out_min: $scope.outMin,
	            out_max: $scope.outMax,
	            press_min: $scope.pressMin,
	            press_max: $scope.pressMax,
	            temp_min: $scope.tempMin,
	            temp_max: $scope.tempMax        
	        }
	    }).success(function(response) {
	      if ((response.status == "FAIL")&&(response.reason == "EUI")) {
	    	  $scope.warning = "节点编号已存在"
	    	  return
	      }

	      $scope.warning = "注册成功，欢迎使用本系统"
	      $http({
	        url:'/get-user-group',
	        method:'GET'
	      })
	      .success(function(response) {
	        sidebarStyle.tree = response
	      });
	      });
	  };
  
  $scope.cancel = function () {
    $modalInstance.close();
  };
  
});

app.controller('AddFeedbackModalCtrl', function($scope, $modal, $log){
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;
  

  $scope.open = function open() {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'AddFeedbackModal.html',
      controller: 'AddFeedbackModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

app.controller('AddFeedbackModalInstanceCtrl', function ($scope, $http, $modalInstance, items) {//

  $scope.selectData = [];// [('dd-MMMM-yyyy',1), ('yyyy/MM/dd',2), ('dd.MM.yyyy',3), ('shortDate',4)];
  $http({
    url:'/get-user-level',
    method:'GET'
  }).success(function(response) {
    response.forEach(function(entry){
      $scope.selectData.push((entry.user_id, entry.user_company));
    });
  });

  $scope.submit = function () {
//    $modalInstance.close($scope.selected.item);
    console.log($scope.user);
    console.log($scope.password);
    console.log($scope.confirmpassword);
    console.log($scope.userName);
    console.log($scope.userPhone);
    console.log($scope.company);
    if($scope.user ==  null){
      
    }
  };
  
  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $modalInstance.close();
  };
    
});

app.controller('ExportData', function($scope, globalParams){
  $scope.open = function(){
    window.location.href = "/get-excel-file?&user_id="+globalParams.user_id;
  }
});
function add________________Modal______________End(){};


function add________________Form______________Start(){};

app.controller('NodeNumCtrl', function ($scope, $http, globalParams) {
  $http({
    url:'/retrieveNodeNum',
    method:'GET',
    params:{user_id: globalParams.user_id}
  }).success(function(response) {
    $scope.nums = response[0];
    });
});

app.controller('MeterInfoCtrl', function ($scope, $http, globalParams) {
  $http({
    url:'/get-meter',
    method:'GET',
    params:{user_id: globalParams.user_id}
  }).success(function(response) {
     $scope.meter = response[0];
     globalParams.current_meter_eui = response[0].meter_eui;
  });
});
function add________________Form______________End(){};

function ______________threePiple___________start(){}

function ______________threePiple___________end(){}


function ________________artworkCtrl___________start(){};
app.controller('artworkCtrl',function($scope , $http,  $modal, globalParams){
  $scope.threePiplePath = "/static/threePiple.htm";
  $scope.twoPiplePath = "/static/twoPiple.htm";
  $scope.onePiplePath = "/static/onePiple.htm";
  
  $scope.artworkShow = parseInt(globalParams.user_id.substring(globalParams.user_id.length-1, globalParams.user_id.length))%3
  
  $scope.valveShow = false;
  $scope.meterShow = true;
  $scope.filterShow = false;
  var initialProc = function(){
    $scope.valveShow = false;
    $scope.meterShow = false;
    $scope.filterShow = false;
  };
  $scope.valveVisible =function(){
    initialProc();
    $scope.valveShow = true;
  }
  $scope.meterVisible =function(){
    initialProc();
    $scope.meterShow = true;
  }
  $scope.filterVisible =function(){
    initialProc();
    $scope.filterShow = true;
  }

  $scope.no1 = {checked:true};
  $scope.no2 = {checked:true};
  $scope.no1_2 = {checked:true};
  $scope.no2_2 = {checked:true};
  $scope.operator_name = {text: ''};
  $scope.meter_name = {text: ''};
  $scope.current_lead_code = {text: ''};
  $scope.changed_lead_code = {text: ''};
  $scope.changed_reason = {text: ''};

  $scope.type = {text: ''};
  $scope.capacity = {text: ''};
  $scope.accurate = {text: ''};
  $scope.change_time = {text: ''};
  $scope.maintain_time = {text: ''};
  $scope.work_content = {text: ''};
  dateTime = new Date();

//  if ($scope.artworkShow == 2) {
    $scope.no3 = {checked:true};
    $scope.no4 = {checked:true};
    $scope.no3_2 = {checked:true};
    $scope.no4_2 = {checked:true};
//  }

//  if ($scope.artworkShow == 0) {
    $scope.no5 = {checked:true};
    $scope.no6 = {checked:true};
    $scope.no5_2 = {checked:true};
    $scope.no6_2 = {checked:true};
//  }

  $scope.submitClick = function() {
    var data = {
        user_id: globalParams.user_id,
        report_time: new Date(),
        current_status_one: '',
        current_status_two: '',
        current_status_three: '',
        current_status_four: '',
        current_status_five: '',
        current_status_six: '',
        changed_status_one: '',
        changed_status_two: '',
        changed_status_three: '',
        changed_status_four: '',
        changed_status_five: '',
        changed_status_six: '',
        operator: $scope.operator_name.text
    };
    if ($scope.artworkShow == 1) {
      data.current_status_one = $scope.no1.checked ? '开' : '关';
      data.current_status_two = $scope.no2.checked ? '开' : '关';
      data.changed_status_one = $scope.no1_2.checked ? '开' : '关';
      data.changed_status_two = $scope.no2_2.checked ? '开' : '关';
      data.operator = $scope.operator_name.text
    }
    if ($scope.artworkShow == 2) {
        data.current_status_one = $scope.no1.checked ? '开' : '关';
        data.current_status_two = $scope.no2.checked ? '开' : '关';
        data.current_status_three = $scope.no3.checked ? '开' : '关';
        data.current_status_four = $scope.no4.checked ? '开' : '关';
        data.changed_status_one = $scope.no1_2.checked ? '开' : '关';
        data.changed_status_two = $scope.no2_2.checked ? '开' : '关';
        data.changed_status_three = $scope.no3_2.checked ? '开' : '关';
        data.changed_status_four = $scope.no4_2.checked ? '开' : '关';
        data.operator = $scope.operator_name.text
    }
    if ($scope.artworkShow == 0) {
        data.current_status_one = $scope.no1.checked ? '开' : '关';
        data.current_status_two = $scope.no2.checked ? '开' : '关';
        data.current_status_three = $scope.no3.checked ? '开' : '关';
        data.current_status_four = $scope.no4.checked ? '开' : '关';
        data.current_status_five = $scope.no5.checked ? '开' : '关';
        data.current_status_six = $scope.no6.checked ? '开' : '关';
        data.changed_status_one = $scope.no1_2.checked ? '开' : '关';
        data.changed_status_two = $scope.no2_2.checked ? '开' : '关';
        data.changed_status_three = $scope.no3_2.checked ? '开' : '关';
        data.changed_status_four = $scope.no4_2.checked ? '开' : '关';
        data.changed_status_five = $scope.no5_2.checked ? '开' : '关';
        data.changed_status_six = $scope.no6_2.checked ? '开' : '关';
        data.operator = $scope.operator_name.text
    }
    $http({
      url:'/changeValve',
      method:'POST',
      data: data
    }).success(function(response) {
      alert('您已成功保存信息')
    });
  };


  $scope.meterSubmitClick = function() {
    var data = {
	        user_id: globalParams.user_id,
          report_time: new Date(),
	        meter_name: $scope.meter_name.text,
	        current_lead_code: $scope.current_lead_code.text,
	        changed_lead_code: $scope.changed_lead_code.text,
	        changed_reason: $scope.changed_reason.text,
          operator: $scope.operator_name.text
	      };
    $http({
      url:'/changeArtworkMeter',
      method:'POST',
      data: data
    }).success(function(response) {
    });
  };

  $scope.filterSubmitClick = function() {
    var data = {
	        user_id: globalParams.user_id,
          report_time: new Date(),
	        type: $scope.type.text,
	        capacity: $scope.capacity.text,
	        accurate: $scope.accurate.text,
	        change_time: $scope.change_time.text,
	        maintain_time: $scope.maintain_time.text,
	        work_content: $scope.work_content.text,
          operator: $scope.operator_name.text
	      };
    $http({
      url:'/changeFilterArtworkInfo',
      method:'POST',
      data: data
    }).success(function(response) {
    });
  };


  $scope.items = ['item1', 'item2', 'item3'];
  $scope.animationsEnabled = true;

  $scope.open = function() {
    if ($scope.artworkShow == 1) {
      var modalInstance = $modal.open({
                                        animation: $scope.animationsEnabled,
                                        templateUrl: 'valveCtrl.html',
                                        controller: 'valveModalInstanceCtrl',
                                        resolve: {
                                          items: function () {
                                            return $scope.items;
                                          }
                                        }
                                      });
    }
    if ($scope.artworkShow == 2) {
      var modalInstance = $modal.open({
                                        animation: $scope.animationsEnabled,
                                        templateUrl: 'twoValveCtrl.html',
                                        controller: 'valveModalInstanceCtrl',
                                        resolve: {
                                          items: function () {
                                            return $scope.items;
                                          }
                                        }
                                      });
    }
    if ($scope.artworkShow == 0) {
      var modalInstance = $modal.open({
                                        animation: $scope.animationsEnabled,
                                        templateUrl: 'threeValveCtrl.html',
                                        controller: 'valveModalInstanceCtrl',
                                        resolve: {
                                          items: function () {
                                            return $scope.items;
                                          }
                                        }
                                      });
    }
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
    });
  };

    $scope.meterArtworkOpen = function() {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'MeterArtworkCtrl.html',
      controller: 'meterModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
    });
  };

  $scope.filterOpen = function() {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'filterArtworkCtrl.html',
      controller: 'filterModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
    });
  };
});

app.controller('valveModalInstanceCtrl', function ($scope, $http, $modalInstance, items) {//

  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $modalInstance.close();
  };

});

app.controller('meterModalInstanceCtrl', function ($scope, $http, $modalInstance, items) {//

  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $modalInstance.close();
  };

});

app.controller('filterModalInstanceCtrl', function ($scope, $http, $modalInstance, items) {//

  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $modalInstance.close();
  };

});
app.controller('valveInfoCtrl', function($scope, $http,globalParams ){
  $http({
		url:'/getValve',
		method:'GET',
    params:{user_id: globalParams.user_id}
	}).success(function(response) {
	  $scope.rowCollection = response;
	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});


app.controller('meterArtworkInfoCtrl', function($scope, $http,globalParams ){
  $http({
		url:'/getMeterArtworkInfo',
		method:'GET',
    params:{user_id: globalParams.user_id}
	}).success(function(response) {
	  $scope.rowCollection = response;
	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});

app.controller('filterArtworkInfoCtrl', function($scope, $http,globalParams ){
  $http({
		url:'/getFilterArtworkInfo',
		method:'GET',
    params:{user_id: globalParams.user_id}
	}).success(function(response) {
	  $scope.rowCollection = response;
	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});
function ________________artworkCtrl___________end(){};

app.controller('IdentificationShowCtrl', function ($scope, $http, globalParams) {
	$http({
		url:'/getIdentifyMeter',
		method:'GET'
	}).success(function(response) {

	  $scope.rowCollection = response;

	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});



app.controller('AddIdentificationCtrl', function ($scope, $http, globalParams) {
	  $scope.identDate = new Date();
    $scope.nextDate = new Date();
    $scope.checkboxSelection = 0;
	  
	  $http({
	    url:'/getIndComp',
	    method:'GET'
	  }).success(function(response) {
		  $scope.companys = [];
	    response.forEach(function(entry){
	      var field = {
	          key: entry.user_id,
	          value: entry.gas_company
	      }
	      $scope.companys.push(field);
	    });
	  });

	  $scope.company_update = function(company) {
	    $scope.isCompanyShow = false;
		  $http({
			    url:'/getIndUser',
			    method:'GET',
			    params:{user_id: company}
			  }).success(function(response) {
				  $scope.users = [];
				  $scope.meters = [];
				  $scope.seqNo = '';
				  $scope.meterVersion = '';
				  $scope.meterType = '';
				  
			    response.forEach(function(entry){
  				  var field = {
  	            key: entry.user_id,
  	            value: entry.user_company
  	        }
  	        $scope.users.push(field);
			    });
			  });
	  };

	  $scope.user_update = function(user) {
	    $scope.isUserShow = false;
		  $http({
			    url:'/getIndMeter',
			    method:'GET',
			    params:{user_id: user}
			  }).success(function(response) {
				  $scope.meters = [];
			    response.forEach(function(entry){
			      var field = {
		            key: entry.meter_eui,
		            value: entry.meter_name,
		            meterType: entry.meter_type,
		            meterSeqno: entry.meter_index,
		            meterVersion: entry.meter_version 
		        }
		        $scope.meters.push(field);
			    });
			    console.log($scope.meters);
			  });		  
	  };
	  
	  $scope.meter_update = function(meter) {
	    $scope.isMeterShow = false;
	    $scope.seqNo = meter.meterSeqno;
	    $scope.meterVersion = meter.meterVersion;
	    $scope.meterType = meter.meterType;
	  };
	  
    
    
	  $scope.submit = function() {
	    if (($scope.company == null) || ($scope.company.key == '')) {
	      $scope.isCompanyShow = true;
	      return false;
	    }
	    if (($scope.user == null) || ($scope.user.key == '')) {
	      $scope.isUserShow = true;
	      return false;
	    }
	    if (($scope.meter == null) || ($scope.meter.key == '')) {
	      $scope.isMeterShow = true;
	      return false;
	    }
	    
	    var data = {
	        meter_eui: $scope.meter.key,
	        model: $scope.meterVersion,
	        meter_type: $scope.meterType,
	        identify_date : $scope.identDate.getFullYear()+'-'+$scope.identDate.getMonth()+'-'+$scope.identDate.getDate(),
	        next_identify_date : $scope.nextDate.getFullYear()+'-'+$scope.nextDate.getMonth()+'-'+$scope.nextDate.getDate(),
	        medium : $scope.medium,
	        pressureMax : $scope.presureMax,
	        pressureMin : $scope.presureMin,
	        temperatureMax : $scope.temperatureMax,
	        temperatureMin : $scope.temperatureMin,
	        outputMax : $scope.outputMax,
	        outputMin : $scope.outputMin,
	        Qmax100 : $scope.Qmax100,
	        Qmax60 : $scope.Qmax60,
	        Qmax40 : $scope.Qmax40,   
	        Qmax20 : $scope.Qmax20,
	        Qmax10 : $scope.Qmax10,
	        isFactory: $scope.checkboxSelection
	      };
	    $http({
	      url: '/addIndentificationMeter',
	      method:'POST',
	      data: data
	      }).success(function(response){
	      });
	    }
	  
});



app.controller('OutdiffChartCtrl', function ($scope,$http,globalParams) {
	    var datas = [];
	    $http({
	        url:'/outputDiffChart',
	        method:'GET',
	        params:{user_id: globalParams.user_id}
	      }).success(function(response) {
	        for (var i=0;i<response.length;i++)
	        {
	          datas.push([response[i].output_date, response[i].output_diff])
	        }
	        $scope.chartConfig = {
	                options: {
	                    chart: {
	                        type: 'spline',
	                        zoomType: 'x'
	                    },
	                    rangeSelector: {
	                        enabled: true
	                    },
	                    navigator: {
	                        enabled: true
	                    }
	                },
	                title: {
	                    text: '输差统计曲线'
	                },
//	                useHighStocks: true,
	                xAxis: {
	                    startOnTick: true,
	                    type: 'datetime',
	                    tickInterval: 3600 * 1000 * 24,
	                    labels:{
	                        formatter: function() {
	                            var d = new Date(this.value);
	                                 return Highcharts.dateFormat("%Y-%m-%e",this.value); // just month
	                             
	                        },
	                    rotation: -45
	                    }
	                },
	                yAxis: {
	                    title: {
	                        text: '输差(Nm3)'
	                    },
	                    plotLines: [{
	                        value: 0,
	                        width: 1,
	                        color: '#808080'
	                    }]
	                },
	                series: [{
	                  name: '输差曲线',
	                  data: datas
	                }]
	        }
	      });
	});

app.controller('DCDeviationCtrl',  function ($scope,$http,globalParams) {
	  $http({
	    url:'/getDeviationVal',
	    method:'GET',
	    params:{meter_eui: "36ffd60532573238",
	      data_qm: 3.5 }
	  }).success(function(response) {
		  if(response.length==12){
			  factoryContent = '出厂检定偏差曲线'
			  factoryData = [0, response[7].deviation_val, response[8].deviation_val, response[9].deviation_val,response[10].deviation_val, response[11].deviation_val]
		  }
		  else{
			  factoryContent = '暂未录入出厂检定参数'
			  factoryData = [0,0,0,0,0,0]
		  }			  
	    $scope.chartConfig = {
	            options: {
	                chart: {
	                    type: 'spline',
	                    zoomType: 'x'
	                }
	            },
	            title: {
	                text: '实时数据分析'
	            },
	            subtitle: {
	                text: '鉴定数据对比'
	            },
	            xAxis: {
	                categories: ['0%Qmax', '10%Qmax', '20%Qmax', '40%Qmax', '60%Qmax', '100%Qmax']
	            },
	            yAxis: {
	                title: {
	                    text: '偏差(%)'
	                },
	                min: -2,
	                max: 2,
	                startOnTick: false,
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }]
	            },
	            tooltip: {
	                valueSuffix: '%'
	            },
	            series: [{
	                name: '最新检定偏差曲线',
	                data: [0, response[0].deviation_val, response[1].deviation_val, response[2].deviation_val,
	                       response[3].deviation_val, response[4].deviation_val]
	            },
	            {
	                name: factoryContent,
	                data: factoryData
	            },
	            {name: '实时工况瞬时流量',
	             marker: {
	                radius: 5,
	                symbol: "circle"
	            },data: [{x:response[5].single_qm_level,y:response[5].single_qm_diff,fillColor:'red'}]}]
	    }
	  });
	});

app.controller('DCOutDiffCtrl-shunshi', function ($scope, $http) {
	  $scope.companys = [];
	  $scope.users = [];
	  $scope.meters = [];
	  
	  $scope.outdiff = 0;
	  $scope.warning = "";

	  $scope.user_selected = 0;
	  $scope.meter_selected = 0;
	  $scope.qm_edit = "0";
	  $scope.temp_edit = "0";
	  $scope.pressure_edit = "1.013";

	  var companys_id = [];
	  var users_id = [];
	  var meters_eui = []; 
	  var meterEui;
	  var diff = 0;
	  
	  $http({
	    url:'/getIndComp',
	    method:'GET'
	  }).success(function(response) {
		  $scope.companys = [];
		  companys_id = [];
	    response.forEach(function(entry){
	      $scope.companys.push(entry.gas_company);
	      companys_id.push(entry.user_id);
	    });
	  });

	  $scope.company_update = function(company) {
		  $http({
			    url:'/getIndUser',
			    method:'GET',
			    params:{user_id: companys_id[company]}
			  }).success(function(response) {
				  $scope.users = [];
				  users_id = [];
			    response.forEach(function(entry){
			      $scope.users.push(entry.user_company);
			      users_id.push(entry.user_id);
				  $scope.user_selected = -1;
			    });
			  });
	  };

	  $scope.user_update = function() {
		  $http({
			    url:'/getIndMeter',
			    method:'GET',
			    params:{user_id: users_id[$scope.user_selected]}
			  }).success(function(response) {
				  $scope.meters = [];
				  meters_eui = [];
			    response.forEach(function(entry){
			      $scope.meters.push(entry.meter_name);
			      meters_eui.push(entry.meter_eui);
			    });
				$scope.meter_selected = -1;
			  });		  
	  };
	  $scope.meter_update = function() {
		  meterEui = meters_eui[$scope.meter_selected];
		  $scope.update();
	  };
	  
	  $scope.update_diff = function() {
		  var qm = parseFloat($scope.qm_edit);
		  var temp = parseFloat($scope.temp_edit);
		  var press = parseFloat($scope.pressure_edit);
		  $scope.outdiff = qm * (press + 1.013)/1.013 * (temp+273.15)/(temp+273.15+273.15) * diff/100;
	  }
	  
	  $scope.update = function() {
		  $http({
			    url:'/getDeviationVal',
			    method:'GET',
			    params:{meter_eui: meterEui,
			      data_qm: $scope.qm_edit }
			  }).success(function(response) {
				  if(response.length==12){
					  factoryContent = '出厂检定偏差曲线'
					  factoryData = [0, response[7].deviation_val, response[8].deviation_val, response[9].deviation_val,response[10].deviation_val, response[11].deviation_val]
				  }
				  else{
					  factoryContent = '暂未录入出厂检定参数'
					  factoryData = [0,0,0,0,0,0]
				  }
				$scope.warning = "选中流量计的流量范围:"+response[6].outputmin+"~"+response[6].outputmax+"(m³/h)";
				var qm = parseFloat($scope.qm_edit);
				var temp = parseFloat($scope.temp_edit);
				var press = parseFloat($scope.pressure_edit);
				diff = response[5].single_qm_diff;
				$scope.outdiff = qm * (press + 1.013)/1.013 * (temp+273.15)/(temp+273.15+273.15) * diff/100;
				
			    $scope.chartConfig = {
			            options: {
			                chart: {
			                    zoomType: 'x'
			                }
			            },
			            title: {
			                text: '实时数据分析'
			            },
			            xAxis: {
			                categories: ['0%Qmax', '10%Qmax', '20%Qmax', '40%Qmax', '60%Qmax', '100%Qmax']
			            },
			            yAxis: {
			                title: {
			                    text: '偏差(%)'
			                },
			                min: -2,
			                max: 2,
			                startOnTick: false,
			                plotLines: [{
			                    value: 0,
			                    width: 1,
			                    color: '#808080'
			                }]
			            },
			            tooltip: {
			                valueSuffix: '%'
			            },
			            series: [{
			                name: '最新检定偏差曲线',
			                data: [0, response[0].deviation_val, response[1].deviation_val, response[2].deviation_val,
			                       response[3].deviation_val, response[4].deviation_val]
			            },
			            {
			                name: factoryContent,
			                data: factoryData
			            },
			            {name: '实时工况瞬时流量偏差(%)',
			             marker: {
			                radius: 5,
			                symbol: "circle"
			            },data: [{x:response[5].single_qm_level,y:response[5].single_qm_diff,fillColor:'red'}]}]
			    }
			  }).error(function(){
			    	$scope.warning = "选中流量计没有录入检定信息!";
			    });
	  };
});

app.controller('DCOutDiffCtrl-total', function ($scope, $http) {
	  $scope.companys = [];
	  $scope.users = [];
	  $scope.meters = [];
	  
	  $scope.warning = "";

	  $scope.user_selected = 0;
	  $scope.meter_selected = 0;
	  $scope.total_diff = 0;
	  
	  var companys_id = [];
	  var users_id = [];
	  var meters_eui = []; 
	  var meterEui;
	  var diff = 0;
	  
	  $http({
	    url:'/getIndComp',
	    method:'GET'
	  }).success(function(response) {
		  $scope.companys = [];
		  companys_id = [];
	    response.forEach(function(entry){
	      $scope.companys.push(entry.gas_company);
	      companys_id.push(entry.user_id);
	    });
	  });

	  $scope.company_update = function(company) {
		  console.log(company);
		  $http({
			    url:'/getIndUser',
			    method:'GET',
			    params:{user_id: companys_id[company]}
			  }).success(function(response) {
				  $scope.users = [];
				  users_id = [];
			    response.forEach(function(entry){
			      $scope.users.push(entry.user_company);
			      users_id.push(entry.user_id);
				  $scope.user_selected = -1;
			    });
			  });
	  };

	  $scope.user_update = function() {
		  console.log(users_id);
		  console.log(users_id[$scope.user_selected]);
		  $http({
			    url:'/getIndMeter',
			    method:'GET',
			    params:{user_id: users_id[$scope.user_selected]}
			  }).success(function(response) {
				  $scope.meters = [];
				  meters_eui = [];
			    response.forEach(function(entry){
			      $scope.meters.push(entry.meter_name);
			      meters_eui.push(entry.meter_eui);
			    });
				$scope.meter_selected = -1;
			  });		  
	  };
	  $scope.meter_update = function() {
		  meterEui = meters_eui[$scope.meter_selected];
	  };
	  	  
	  $scope.submit = function() {
		  $scope.warning = "该流量计在此区间内，瞬时流量信息过少,结果没有参考意义"
		  $scope.total_diff = 0;
	  }
	  $scope.update = function() {
		  $http({
			    url:'/getDeviationVal',
			    method:'GET',
			    params:{meter_eui: meterEui,
			      data_qm: $scope.qm_edit }
			  }).success(function(response) {
				  if(response.length==12){
					  factoryContent = '出厂检定偏差曲线'
					  factoryData = [0, response[7].deviation_val, response[8].deviation_val, response[9].deviation_val,response[10].deviation_val, response[11].deviation_val]
				  }
				  else{
					  factoryContent = '暂未录入出厂检定参数'
					  factoryData = [0,0,0,0,0,0]
				  }
				$scope.warning = "选中流量计的流量范围:"+response[6].outputmin+"~"+response[6].outputmax+"(m³/h)";
				var qm = parseFloat($scope.qm_edit);
				var temp = parseFloat($scope.temp_edit);
				var press = parseFloat($scope.pressure_edit);
				diff = response[5].single_qm_diff;
				$scope.outdiff = qm * (press + 1.013)/1.013 * (temp+273.15)/(temp+273.15+273.15) * diff/100;
				
			    $scope.chartConfig = {
			            options: {
			                chart: {
			                    zoomType: 'x'
			                }
			            },
			            title: {
			                text: '实时数据分析'
			            },
			            xAxis: {
			                categories: ['0%Qmax', '10%Qmax', '20%Qmax', '40%Qmax', '60%Qmax', '100%Qmax']
			            },
			            yAxis: {
			                title: {
			                    text: '偏差(%)'
			                },
			                min: -2,
			                max: 2,
			                startOnTick: false,
			                plotLines: [{
			                    value: 0,
			                    width: 1,
			                    color: '#808080'
			                }]
			            },
			            tooltip: {
			                valueSuffix: '%'
			            },
			            series: [{
			                name: '最新检定偏差曲线',
			                data: [0, response[0].deviation_val, response[1].deviation_val, response[2].deviation_val,
			                       response[3].deviation_val, response[4].deviation_val]
			            },
			            {
			                name: factoryContent,
			                data: factoryData
			            },
			            {name: '实时工况瞬时流量偏差(%)',
			             marker: {
			                radius: 5,
			                symbol: "circle"
			            },data: [{x:response[5].single_qm_level,y:response[5].single_qm_diff,fillColor:'red'}]}]
			    }
			  }).error(function(){
			    	$scope.warning = "选中流量计没有录入检定信息!";
			    });
	  };
});

app.controller('DistrictAnalyseCtrl', function ($scope, $http) {
	  $scope.analysetypes = ["温度","压力"]
	  $scope.periods = ["一周","一月", "一年", "所有"]

	  $scope.provinces = [];
	  $scope.cities = [];
	  $scope.districts = [];
	  $scope.meters = [];
	  
	  $scope.warning = ""
	  $scope.names = []
	  $scope.period = '0';
	  $scope.left_count = 5

	  var provinces_id = [];
	  var cities_id = [];
	  var districts_id = [];
	  var meters_id = [];
	  var analyse_ids = [];
      var periodTime = 7;
	  
	  $http({
	      url:'/getDistrict',
	      method:'GET'
	    }).success(function(response) {
		    response.forEach(function(entry){
		      $scope.provinces.push(entry.district_name);
		      provinces_id.push(entry.district_id)
		    });
		  });
	  
	  $scope.province_update = function(province) {
		  $scope.warning = ""
		  $http({
			    url:'/getDistrict',
			    method:'GET',
			    params:{province_id: provinces_id[province]}
			  }).success(function(response) {
				  $scope.cities = [];
				  cities_id = [];
			    response.forEach(function(entry){
			      $scope.cities.push(entry.district_name);
			      cities_id.push(entry.district_id);
			      
			    });
			  });
		  $scope.city = -1;
	  };

	  $scope.city_update = function(city) {
		  $scope.warning = ""
		  $http({
			    url:'/getDistrict',
			    method:'GET',
			    params:{city_id: cities_id[city]}
			  }).success(function(response) {
				  $scope.districts = [];
				  districts_id = [];
			    response.forEach(function(entry){
			      $scope.districts.push(entry.district_name);
			      districts_id.push(entry.district_id);			      
			    });
			  });
		  $scope.district = -1;
	  };

	  $scope.district_update = function(district) {
		  $scope.warning = ""
		  $http({
			    url:'/get-meter',
			    method:'GET',
			    params:{district_id: districts_id[district]}
			  }).success(function(response) {
				  $scope.meters = [];
				  meters_id = [];
				  if (response.length == 0) {
					  $scope.warning = "当前用户在该区域没有流量计"
					  return
				  }
			    response.forEach(function(entry){
			      if (entry.meter_typenum != 2) { //卓度流量计没有压力 温度数据
			    	  $scope.meters.push(entry.meter_name)
			    	  meters_id.push(entry.meter_eui)	
			      }		      
			    });
			  });
		  $scope.meter = -1;
	  };
	  
	  $scope.add_meter = function() {
		  $scope.warning = ""
		  if ($scope.left_count <= 0)
			  return
		  if ($scope.meter == null){
			  $scope.warning = "请选择流量计"
			  return  
		  }
		  for (var i = 0; i < analyse_ids.length; i++){
			  if (analyse_ids[i] == meters_id[$scope.meter]){
				  $scope.warning = "该流量计已在列表中"
				  return  
		      }
		  }
		  $scope.left_count = $scope.left_count - 1
		  $scope.names.push($scope.meters[$scope.meter])
		  analyse_ids.push(meters_id[$scope.meter])
	  };
	  
	  $scope.clear_meter = function() {
		  $scope.names = []
		  analyse_ids = []
		  $scope.left_count = 5
	  };
	  
	  $scope.period_update = function(period) {
		  if (period == 0)
			  periodTime = 7
		  else if (period == 1)
			  periodTime = 30
		  else if (period == 2)
			  periodTime = 365
		  else if (period == 3)
			  periodTime = 9999
	  };
	  
	  $scope.start_analyse = function() {
		  var datas = [];
		  var ytext = "";
		  var titletext = "";
		  $scope.warning = ""

		  if ($scope.analyse_type == null){
			  $scope.warning = "请选择分析数据类型"
			  return
		  }
		  if ($scope.left_count == 5) {
			  $scope.warning = "请选择分析对象"
			  return
		  }
		  
		  if ($scope.analyse_type == 0) {
			  ytext = "温度(℃)"
			  titletext = "区域性分析（温度)"
		  }
		  else if ($scope.analyse_type == 1) {
			  ytext = "压力(bar)"
			  titletext = "区域性分析（压力)"	  
		  }
			  
	  
		  $http({
		        url:'/getAnalyse',
		        method:'GET',
		        params:{type: $scope.analyse_type,
		        	meter_ids: analyse_ids.toString(),
		          period: periodTime }
		      }).success(function(response) {				  
		        for (var i=0;i<response.length;i++)
		        {
		        	var eachdatas = [];
		        	for (var j=0;j<response[i].length;j++){
		        		eachdatas.push([response[i][j].data_date, response[i][j].data_e])
		        	}
		        	datas.push(eachdatas)
		        }
		        for (var a=0;a<5;a++) {
		        	if ($scope.names[a]==null)
		        		$scope.names.push(" ")
		        }
		        $scope.chartConfig = {
		                options: {
		                    chart: {
		                        type: 'spline',
		                        zoomType: 'x'
		                    },
		                    rangeSelector: {
		                        enabled: true
		                    },
		                    navigator: {
		                        enabled: true
		                    }
		                },
		                title: {
		                    text: titletext
		                },
//		                useHighStocks: true,
		                xAxis: {
		                    startOnTick: true,
		                    type: 'datetime',
		                    tickInterval: 3600 * 1000 * 24,
		                    labels:{
		                        formatter: function() {
		                            var d = new Date(this.value);
		                            return Highcharts.dateFormat("%Y-%m-%e",this.value);		                             
		                        },
		                    rotation: -45
		                    }
		                },
		                yAxis: {
		                    title: {
		                        text: ytext
		                    },
		                    plotLines: [{
		                        value: 0,
		                        width: 1,
		                        color: '#808080'
		                    }]
		                },
		                series: [{name: $scope.names[0],data: datas[0]},
		                         {name: $scope.names[1],data: datas[1]},
		                         {name: $scope.names[2],data: datas[2]},
		                         {name: $scope.names[3],data: datas[3]},
		                         {name: $scope.names[4],data: datas[4]}
		                         ]
		        }
		      });
	  };
	  
});

//app.contorller('oneValveCtrl', function ($scope, $http){
// $scope.submit = function() {
//   alert('nihao');
// }
// $scope.click = function() {
//   alert('nihao');
// }
//});

app.controller('DataPickerCtrl', function ($scope, $http, globalParams) {
	  $scope.today = function() {
	    $scope.dt = new Date();	   
	    $scope.start_date = new Date();
	    $scope.stop_date = new Date();
	  };
	  $scope.today();



	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];

	  var tomorrow = new Date();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  var afterTomorrow = new Date();
	  afterTomorrow.setDate(tomorrow.getDate() + 2);
	  $scope.events =
	    [
	      {
	        date: tomorrow,
	        status: 'full'
	      },
	      {
	        date: afterTomorrow,
	        status: 'partially'
	      }
	    ];

	  $scope.getDayClass = function(date, mode) {
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	      for (var i=0;i<$scope.events.length;i++){
	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	        if (dayToCheck === currentDay) {
	          return $scope.events[i].status;
	        }
	      }
	    }

	    return '';
	  };
});




app.controller('MapCtrl', ['$scope', '$http', 'globalParams', function ($scope, $http, globalParams) {
  $scope.myMarkers = [];
  $scope.mapOptions = {
    toolbar: true,
    scrollzoom: false,
    maptype: true,
    overview: true,
    locatecity: true,
    resizeEnable: false,
    uiMapCache: true
  };

  $http({
          url: '/get-meter',
          method: 'GET',
          params: {user_id: globalParams.user_id}
        }).success(function (response) {
    $scope.meters = [];
    response.forEach(function (entry) {
      var field = {
        key: entry.meter_eui,
        value: entry.meter_name,
        meterType: entry.meter_type,
        meterSeqno: entry.meter_index,
        meterVersion: entry.meter_version
      };

      if (entry.meter_latitude != '' && entry.meter_longitude != '') {
        $scope.myMarkers.push({marker: new AMap.Marker({
                                 map: $scope.myMap,
                                 position: {
                                   j: entry.meter_latitude,
                                   l: entry.meter_longitude,
                                   lat: entry.meter_latitude,
                                   lng: entry.meter_longitude
                                 }
                               }),
                                meter_eui: entry.meter_eui,
                                meter_name: entry.meter_name,
                                meter_version: entry.meter_version});
      }
      $scope.meters.push(field);
    });
  });

  $scope.addMarker = function ($event, $params) {
    $scope.myMarkers.push(new AMap.Marker({
                                            map: $scope.myMap,
                                            position: $params[0].lnglat
                                          }));
  };

  $scope.openMarkerInfo = function (marker) {
    $scope.currentMarker = marker;
    $scope.currentMarkerLat = marker.getPosition().getLat();
    $scope.currentMarkerLng = marker.getPosition().getLng();
    $scope.myInfoWindow.open($scope.myMap, marker.getPosition());
  };


  $scope.openBasicInfo = function (marker) {
    $scope.currentMarker = marker;
    $scope.meter_eui = marker.meter_eui;
    $scope.meter_name = marker.meter_name;
    $scope.version = marker.meter_version;
    $http({
            url: '/get-data',
            method: 'GET',
            params: {meter_eui: marker.meter_eui, period: 40}
          }).success(function (response) {
      $scope.meters = [];
      $scope.meter_data = {data_date: response[0].data_date,
        data_vb: response[0].data_vb,
        data_vm: response[0].data_vm,
        data_p: response[0].data_p,
        data_t: response[0].data_t,
        data_qb: response[0].data_qb,
        data_qm: response[0].data_qm
      }
      $scope.ShowBasicInfoWindow.open($scope.myMap, marker.marker.getPosition());
    });

  };

}]);

app.controller('gasCollectionbyDistrictCtrl',function($scope, $http, $modal, globalParams){
  $scope.companys = [];
  $scope.metertypes = [];
  $scope.provinces = [];
  $scope.cities = [];
  $scope.districts = [];
  $scope.dependents= ['用户编号','流量计编号'];
  $scope.userSelections="";
  $scope.warning = ""

  //~~~~~~~~~~~~~~~~~~~~~datepick~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  $scope.startDate = new Date();
  $scope.stopDate = new Date();

  //~~~~~~~~~~~~~~~~~~~~~datepick~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  var provinces_id = [];
  var cities_id = [];
  var districts_id = [];
    $http({
	      url:'/getDistrict',
	      method:'GET'
	    }).success(function(response) {
		    response.forEach(function(entry){
		      $scope.provinces.push(entry.district_name);
		      provinces_id.push(entry.district_id)
		    });
		  });

	  $scope.province_update = function(province) {
		  $scope.warning = ""
		  $http({
			    url:'/getDistrict',
			    method:'GET',
			    params:{province_id: provinces_id[province]}
			  }).success(function(response) {
				  $scope.cities = [];
				  cities_id = [];
			    response.forEach(function(entry){
			      $scope.cities.push(entry.district_name);
			      cities_id.push(entry.district_id);

			    });
			  });
		  $scope.city = -1;
	  };

	  $scope.city_update = function(city) {
		  $scope.warning = ""
		  $http({
			    url:'/getDistrict',
			    method:'GET',
			    params:{city_id: cities_id[city]}
			  }).success(function(response) {
				  $scope.districts = [];
				  districts_id = [];
			    response.forEach(function(entry){
			      $scope.districts.push(entry.district_name);
			      districts_id.push(entry.district_id);
			    });
			  });
		  $scope.district = -1;
	  };

	  $scope.district_update = function(district) {
		  $scope.warning = ""
		  $http({
			    url:'/getGasCollection',
			    method:'GET',
			    params:{district_id: districts_id[district],

            startDate: '2016-2-29',
            endDate:'2016-2-29'

          }
			  }).success(function(response) {

        //添加grid显示的内容
				  $scope.meters = [];
				  meters_id = [];
				  if (response.length == 0) {
					  $scope.warning = "当前用户在该区域没有流量计"
					  return
				  }
          $scope.rowCollection = response;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.report= {
            gasCompany : response[0].meter_company,
            companyName: response[0].meter_name,
            meterType: response[0].meter_version,
            meterCode: response[0].meter_eui,
            meterBand: response[0].meter_type,
            qm1: response[0].meter_data_vb,
            qv1:response[0].meter_data_vm,
            pa1: response[0].meter_data_p,
            temperature1: response[0].meter_data_t,
            qm2: response[0].meter_data_vb1,
            qv2:response[0].meter_data_vm1,
            pa2: response[0].meter_data_p1,
            temperature2: response[0].meter_data_t1,
            compensate: $scope.compensate
          }
			    //response.forEach(function(entry){
			    //  if (entry.meter_typenum != 2) { //卓度流量计没有压力 温度数据
			    //	  $scope.meters.push(entry.meter_name)
			    //	  meters_id.push(entry.meter_eui)
			    //  }
			    //});
			  });
		  $scope.meter = -1;
	  };



  $scope.animationsEnabled = true;
  $scope.open = function(size) {
    var testModalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'testModal.html',
      controller: 'testModalInstanceCtrl',
      size: size,
      resolve: {
        assigner : function () {
          $scope.report.compensate = $scope.compensate;
          return $scope.report;
        }
      }
    });

    testModalInstance.result.then(function (returnVal){
      console.log(returnVal);
    },function(){

    }) ;
  }
 });