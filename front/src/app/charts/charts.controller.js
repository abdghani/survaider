(function() {
  'use strict';

  angular
    .module('front')
    .controller('ChartsController', ChartsController);

  /** @ngInject */
  function ChartsController($timeout, $scope, GatewayService) {
    $scope.obj = {};
    $scope.obj.type = "sex";
    $scope.funcs = {};
    $scope.myChartObject1 = {};
    $scope.myChartObject2 = {};
    $scope.myChartObject3 = {};
    $scope.obj.possibleSelections = ["sex", "race", "relationship", "native-country", "workclass", "education"]
    $scope.myChartObject1.type = "PieChart";
    $scope.myChartObject2.type = "BarChart";
    $scope.myChartObject3.type = "ColumnChart";
    $scope.myChartObject1.options = {
      'title': 'Pie Chart for ' + $scope.obj.type + ' distribution'
    };
    $scope.myChartObject2.options = {
      'title': 'Bar Chart for ' + $scope.obj.type + ' distribution'
    };
    $scope.myChartObject3.options = {
      'title': 'Column Chart for ' + $scope.obj.type + ' distribution'
    };
    $scope.obj.cols = [{
      id: "t",
      label: "Type",
      type: "string"
    }, {
      id: "s",
      label: "Count",
      type: "number"
    }]

    $scope.myChartObject1.data = {
      "cols": $scope.obj.cols,
      "rows": []
    };
    $scope.myChartObject2.data = {
      "cols": $scope.obj.cols,
      "rows": []
    };
    $scope.myChartObject3.data = {
      "cols": $scope.obj.cols,
      "rows": []
    };
    $scope.funcs.changeType = function(type) {
      console.log(type);
      $scope.funcs.getCount(type);
    };
    $scope.funcs.getCount = function(type) {
      GatewayService.getCount({
          type: type
        })
        .then(function(res) {
          $scope.myChartObject1.data.rows = res.data;
          $scope.myChartObject2.data.rows = res.data;
          $scope.myChartObject3.data.rows = res.data;
          console.log("data");
        })
    };
    $scope.funcs.getCount($scope.obj.type);
  }
})();
