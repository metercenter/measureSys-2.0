var app = angular.module("Application", ['datatables','datatables.bootstrap', 'ui.bootstrap','highcharts-ng','pageRequest','smart-table','ngTable']);

var current_company = "金昇公司";
var current_meter = "1号流量计";
var current_meter_eui = "36ffd60532573238";
var data_qm_p = '';




app.controller('siderbarCtrl',function($scope, $http){
  $http({
    url:'/get-user-group',
    method:'GET',
  })
  .success(function(response) {
    console.log(response)
    $scope.tree = response;
});
  
  $scope.toggle = function(data) {
    var nodeSet = data.nodes;
    for (i=0; i<nodeSet.length; i++){
      nodeSet[i].visible = !nodeSet[i].visible;
    }
    //刷屏 1 选择panel 2刷新grid
  };
  $scope.show =function(data) {
    if (data.visible == true)
      return true;
    else
      return false;
  }
  
});

app.controller('BootstrapIntegrationCtrl', function ( DTOptionsBuilder, DTColumnBuilder) {
  var vm = this;
  vm.dtOptions = DTOptionsBuilder
//      .fromSource('https://l-lin.github.io/angular-datatables/data.json?_=1436725196255')
      .fromSource('/static/assets/data.json')
      .withBootstrap();
  vm.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID').withClass('text-danger'),
      DTColumnBuilder.newColumn('firstName').withTitle('First name'),
      DTColumnBuilder.newColumn('lastName').withTitle('Last name')
  ];
    
});

app.directive('myTable', function () {
  return {
      restrict: 'E, A, C',
      link: function (scope, element, attrs, controller) {
          var dataTable = element.dataTable(scope.options);

          scope.$watch('options.aaData', handleModelUpdates, true);

          function handleModelUpdates(newData) {
              var data = newData || null;
              if (data) {
                  dataTable.fnClearTable();
                  dataTable.fnAddData(data);
              }
          }
      },
      scope: {
          options: "="
      }
  };
});

app.controller('selfCtrl', function(retrieveData, $scope, $http){
  retrieveData.setData ('lelelel');
  retrieveData.refresh();
});

app.controller('customersCtrl', function($scope, $http) {
  $scope.options = {
      aoColumns: [{
          "sTitle": "Surname"
      }, {
          "sTitle": "First Name"
      }],
      aoColumnDefs: [{
          "bSortable": true,
          "aTargets": [0, 1]
      }],
      bJQueryUI: true,
      bDestroy: true,
      aaData: [
          ["Webber", "Adam"]
      ]
  };

  $scope.addData = function () {
      $scope.counter = $scope.counter + 1;
      $scope.options.aaData.push([$scope.counter, $scope.counter * 2]);
  };

  $scope.counter = 0;
});

app.controller('ModalDemoCtrl', function ($scope, $modal, $log ) {
  
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;
  

  $scope.open = function open(row) {

	data_qm_p = row.data_qm;
	  console.log(row);
	  console.log(data_qm_p);
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
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

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

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





app.controller('DemoCtrl', function(ngTableParams, $sce, $scope) {
    var data = [{name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}];

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
});

app.controller('safeCtrl', function ($scope) {

  var firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
  var lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
  var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
  var id = 1;

  function generateRandomItem(id) {

      var firstname = firstnames[Math.floor(Math.random() * 3)];
      var lastname = lastnames[Math.floor(Math.random() * 3)];
      var birthdate = dates[Math.floor(Math.random() * 3)];
      var balance = Math.floor(Math.random() * 2000);

      return {
          id: id,
          firstName: firstname,
          lastName: lastname,
          birthDate: new Date(birthdate),
          balance: balance
      }
  }

  $scope.rowCollection = [];

  for (id; id < 5; id++) {
      $scope.rowCollection.push(generateRandomItem(id));
  }

  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
  $scope.displayedCollection = [].concat($scope.rowCollection);

  //add to the real data holder
  $scope.addRandomItem = function addRandomItem() {
      $scope.rowCollection.push(generateRandomItem(id));
      id++;
  };

  //remove to the real data holder
  $scope.removeItem = function removeItem(row) {
      var index = $scope.rowCollection.indexOf(row);
      if (index !== -1) {
          $scope.rowCollection.splice(index, 1);
      }
  }
});


app.controller('mainCtrl', ['$scope', function ($scope) {

  var
      nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
      familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

  function createRandomItem() {
      var
          firstName = nameList[Math.floor(Math.random() * 4)],
          lastName = familyName[Math.floor(Math.random() * 4)],
          age = Math.floor(Math.random() * 100),
          email = firstName + lastName + '@whatever.com',
          balance = Math.random() * 3000;

      return{
          firstName: firstName,
          lastName: lastName,
          age: age,
          email: email,
          balance: balance
      };
  }


  $scope.displayed = [];
  for (var j = 0; j < 500; j++) {
      $scope.displayed.push(createRandomItem());
  }
}])
.directive('stRatio',function(){
  return {
    link:function(scope, element, attr){
      var ratio=+(attr.stRatio);
      
      element.css('width',ratio+'%');
      
    }
  };
});


app.controller('WarnCtrl-1', function ($scope, $http) {
	$http({
		url:'/getWarnInfo',
		method:'GET',
		params:{user_company: current_company,
			warn_level: "一级警报"}
	}).success(function(response) {

	  $scope.rowCollection = response;
	  console.log(response);

	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});

app.controller('WarnCtrl-all', function ($scope, $http) {
	$http({
		url:'/getWarnInfo',
		method:'GET',
		params:{user_company: current_company,
			warn_level: "一级警报"}
	}).success(function(response) {

	  $scope.rowCollection = response;
	  console.log(response);

	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});

app.controller('UserFeedbackCtrl', function ($scope, $http) {
	$http({
		url:'/getUserFeedback',
		method:'GET'
	}).success(function(response) {

	  $scope.rowCollection = response;
	  console.log(response);

	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});
	
app.controller('MeterDataCtrl', function ($scope, $http) {
	$http({
		url:'/get-data',
		method:'GET',
		params:{user_name: current_meter}
	}).success(function(response) {

	  $scope.rowCollection = response;
	  console.log(response);

	  //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
	  $scope.displayedCollection = [].concat($scope.rowCollection);
	  });
});


app.controller('DeviationCtrl',  function ($scope,$http) {
	$http({
		url:'/getDeviationVal',
		method:'GET',
		params:{meter_eui: current_meter_eui,
			data_qm: data_qm_p }
	}).success(function(response) {
		$scope.chartConfig = {
		        options: {
		            chart: {
		                type: 'spline',
		                zoomType: 'x'
		            }
		        },
		        title: {
		            text: '实时数据分析',
		        },
		        subtitle: {
		            text: '鉴定数据对比',
		        },
		        xAxis: {
		            categories: ['10%Qmax', '20%Qmax', '40%Qmax', '60%Qmax', '100%Qmax']
		        },
		        yAxis: {
		            title: {
		                text: '偏差(%)'
		            },
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
		            name: '偏差统计',
		            data: [response[0].deviation_val, response[1].deviation_val, response[2].deviation_val,
		                   response[3].deviation_val, response[4].deviation_val]
		        }, 
		        {name: '实时工况瞬时流量',
		         marker: {
		            radius: 5,
		            symbol: "circle"
		        },data: [{x:response[5].single_qmax_level,y:0,fillColor:'red'}]}]
		}
	});
});


app.controller('UserMeterDataCtrl', function ($scope,$http) {
	var user_company = "万达广场";
	var xset = [];
	var yset = [];
	var datas = [];
	$http({
		url:'/meterDataChart',
		method:'GET',
		params:{user_company: user_company}
	}).success(function(response) {
		for (var i=0;i<response.length;i++)
		{
			xset.push(response[i].data_date);
			yset.push(response[i].data_qb);
			datas.push([response[i].data_date, response[i].data_qb])
		}
	    $('#UserMeterData').highcharts({
		        options: {
		            chart: {
		                type: 'spline',
		                zoomType: 'x'
		            }
		        },
		        title: {
		            text: '流量计标况统计',
		        },
		        xAxis: {
		            startOnTick: true,
		            type: 'datetime',
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
		});
	});
});


//app.controller('WarnCtrl-1', function ( $http, DTOptionsBuilder, DTColumnBuilder) {
//	  var vm = this;
//	  var current_company = "金昇公司";
//	  var str = "";
//	  
//	  str = "/getWarnInfo?user_company="+current_company+"&warn_level"+"一级警报";
//	  vm.dtOptions = DTOptionsBuilder
//	      .fromSource(str)
//	      .withBootstrap();
//	  vm.dtColumns = [
//	      DTColumnBuilder.newColumn('company').withTitle('企业名称').withClass('text-danger'),
//	      DTColumnBuilder.newColumn('user_id').withTitle('用户信息'),
//	      DTColumnBuilder.newColumn('meter_info').withTitle('表计信息'),
//	      DTColumnBuilder.newColumn('warn_info').withTitle('报警信息'),
//	      DTColumnBuilder.newColumn('warn_level').withTitle('报警级别'),
//	      DTColumnBuilder.newColumn('solution').withTitle('处理办法'),
//	      DTColumnBuilder.newColumn('warn_date').withTitle('报警时间')
//	  ];
//	    
//	});
//
//	app.controller('WarnCtrl-all', function ( $http, DTOptionsBuilder, DTColumnBuilder) {
//		  var vm = this;
//		  var current_company = "金昇公司";
//		  var str = "";
//		  
//		  str = "/getWarnInfo?user_company="+current_company;
//		  vm.dtOptions = DTOptionsBuilder
//		      .fromSource(str)
//		      .withBootstrap();
//		  vm.dtColumns = [
//		      DTColumnBuilder.newColumn('company').withTitle('企业名称'),
//		      DTColumnBuilder.newColumn('user_id').withTitle('用户信息'),
//		      DTColumnBuilder.newColumn('meter_info').withTitle('表计信息'),
//		      DTColumnBuilder.newColumn('warn_info').withTitle('报警信息').withClass('text-danger'),
//		      DTColumnBuilder.newColumn('warn_level').withTitle('报警级别'),
//		      DTColumnBuilder.newColumn('solution').withTitle('处理办法'),
//		      DTColumnBuilder.newColumn('warn_date').withTitle('报警时间')
//		  ];
//		    
//		});
//
//	app.controller('UserFeedbackCtrl', function ( $http, DTOptionsBuilder, DTColumnBuilder) {
//		var vm = this;
//		var str = "";
//			  
//		str = "/getUserFeedback";
//		vm.dtOptions = DTOptionsBuilder
//	      .fromSource(str)
//	      .withBootstrap();
//		vm.dtColumns = [
//		     DTColumnBuilder.newColumn('user_company').withTitle('客户名称').withClass('text-danger'),
//		     DTColumnBuilder.newColumn('report_time').withTitle('反馈时间'),
//		     DTColumnBuilder.newColumn('solution_deadline').withTitle('处理时限'),
//		     DTColumnBuilder.newColumn('problem').withTitle('问题描述').withClass('text-danger'),
//		     DTColumnBuilder.newColumn('solution_result').withTitle('处理结果')
//		 ];	   
//	});
//
//	app.controller('MeterDataCtrl', function ( $http, DTOptionsBuilder, DTColumnBuilder) {
//		var vm = this;
//		var str = "";
//		var user_name = "1号流量计"
//			  
//		str = "/get-data?user_name="+user_name;
//		vm.dtOptions = DTOptionsBuilder
//	      .fromSource(str)
//	      .withBootstrap();
//		vm.dtColumns = [
//		     DTColumnBuilder.newColumn('data_id').withTitle('数据编号'),
//		     DTColumnBuilder.newColumn('data_date').withTitle('接收时间'),
//		     DTColumnBuilder.newColumn('data_vb').withTitle('标况总累计(Nm³)'),
//		     DTColumnBuilder.newColumn('data_vm').withTitle('工况总累计(Nm³)'),
//		     DTColumnBuilder.newColumn('data_p').withTitle('压力(bar)'),
//		     DTColumnBuilder.newColumn('data_t').withTitle('温度(℃)'),
//		     DTColumnBuilder.newColumn('data_qb').withTitle('工况总累计(Nm³/h)'),
//		     DTColumnBuilder.newColumn('data_qm').withTitle('工况总累计(Nm³/h)'),	     
//		     DTColumnBuilder.newColumn('data_battery').withTitle('电量(月)')
//		 ];	   
//	});