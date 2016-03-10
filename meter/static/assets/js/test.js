/**
 * 
 */

angular.module("Application", []).controller('TreeController',
    [ '$scope', function($scope) {
      var isShow = false;
      var curNode = "";
      $scope.deleteNode = function(data) {
        data.nodes = [];
      };
      $scope.add = function(data) {
        var post = data.nodes.length + 1;
        var newValue = data.value + 1;
        var newName = data.name + '-' + post;
        data.nodes.push({
          name : newName,
          value : newValue,
          visible: false,
          nodes : []
        });
      };
      $scope.toggle = function(data) {
        var nodeSet = data.nodes;
        for (i=0; i<nodeSet.length; i++){
          nodeSet[i].visible = !nodeSet[i].visible;
        }
      };
      $scope.show =function(data) {
        if (data.visible == true)
          return true;
        else
          return false;
      }
      $scope.tree = [ {
        name : "Node",
        value : 0,
        visible: true,
        nodes : [{
          name: "Child",
          value: 0, 
          visible: true, 
          nodes:[{
            name: "grandson",
            value: 0, 
            visible: true, 
            nodes:[]
        }]}]
      } ];
    } ]);