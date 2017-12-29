(function() {
  'use strict';

  angular
    .module('front')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, toastr, GatewayService) {
    $scope.obj = {};
    $scope.funcs = {}
    $scope.obj.skip = 0;
    $scope.obj.limit = 20;


    $scope.obj.filterRace = "";
    $scope.obj.filterRelationship = "";
    $scope.obj.filterSex = "";

    $scope.selection = {}
    $scope.selection.race = false;
    $scope.selection.relationship = false;
    $scope.selection.sex = false;

    $scope.filter = {
      "skip": $scope.obj.skip,
      "limit": $scope.obj.limit,
      "filter": {
        "race": $scope.obj.filterRace,
        "relationship": $scope.obj.filterRelationship,
        "sex": $scope.obj.filterSex
      }
    }

    $scope.obj.heads = ["age", "workclass", "fnlwgt", "education", "education-num", "marital-status", "occupation", "relationship", "race", "sex", "capital-gain", "capital-loss", "hours-per-week", "native-country", "incom"];
    $scope.obj.race = ["White", "Asian-Pac-Islander", "Amer-Indian-Eskimo", "Other", "Black"];
    $scope.obj.relationship = ["Wife", "Own-child", "Husband", "Not-in-family", "Other-relative", "Unmarried"];
    $scope.obj.sex = ["Female", "Male"];

    $scope.funcs.getData = function() {
      GatewayService.getData($scope.filter)
        .then(function(data) {
          if (data.data.length > 0) {
            $scope.obj.data = data.data
          } else {
            $scope.obj.skip -= $scope.obj.limit;
          }
        })
    }
    $scope.funcs.getPage = function(type) {
      if (type && type == 'prev' && $scope.obj.skip != 0) {
        $scope.obj.skip -= $scope.obj.limit;
      }
      if (type && type == 'next') {
        $scope.obj.skip += $scope.obj.limit;
      }
      if (!type) {
        $scope.obj.skip = 0
      }
      $scope.filter.skip = $scope.obj.skip
      $scope.filter.limit = $scope.obj.limit
      if ($scope.selection.race) {
        $scope.filter.filter.race = $scope.obj.filterRace;
      } else {
        $scope.filter.filter.race = "";
      }
      if ($scope.selection.relationship) {
        $scope.filter.filter.relationship = $scope.obj.filterRelationship;
      } else {
        $scope.filter.filter.relationship = "";
      }
      if ($scope.selection.sex) {
        $scope.filter.filter.sex = $scope.obj.filterSex;
      } else {
        $scope.filter.filter.sex = "";
      }

      console.log($scope.filter);
      $scope.funcs.getData();
    }
    $scope.funcs.getData();

  }
})();
