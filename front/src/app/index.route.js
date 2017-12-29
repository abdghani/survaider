(function() {
  'use strict';

  angular
    .module('front')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('data', {
        url: '/data',
        views: {
          'main': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
          }
        }
      })
      .state('charts', {
        url: '/charts',
        views: {
          'main': {
            templateUrl: 'app/charts/charts.html',
            controller: 'ChartsController',
            controllerAs: 'charts'
          }
        }
      })

    $urlRouterProvider.otherwise('/charts');
  }

})();
