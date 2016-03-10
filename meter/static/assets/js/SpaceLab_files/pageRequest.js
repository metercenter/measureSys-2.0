/**
 * 
 */

angular.module('pageRequest',[])
.factory('retrieveData',['$http', function($http){
  var mydata = 'nihao';
  var setData = function(data){
    mydata = data;
  };
  var refresh = function(){
    return $http({url: '/get-user-group',
      method: 'GET',
      params: {'user_company': '万达广场'}
      
    }).success(function(data){
      console.log(mydata);
//      alert(mydata);
    });
  };
  return {
    requestData : mydata,
    refresh: refresh,
    setData: setData
  };
}]);