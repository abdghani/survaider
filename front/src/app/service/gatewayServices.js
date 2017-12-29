(function() {
  'use strict';

  angular
    .module('front')
    .service('GatewayService', GatewayService);

  GatewayService.$inject = ['$log', '$q', '$cookies', '$http'];
  /** @ngInject */
  function GatewayService($log, $q, $cookies, $http) {
    var baseUrl = "http://localhost:4011";
    return {
      getData: function(data) {
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/getSkipLimit';
        var headers = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        $http.post(baseURL, data)
          .then(function(result) {
            promise.resolve(result);
          }, function(result) {
            promise.reject(result);
          });
        return promise.promise;
      },
      getCount: function(data) {
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/count';
        var headers = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        $http.post(baseURL, data)
          .then(function(result) {
            promise.resolve(result);
          }, function(result) {
            promise.reject(result);
          });
        return promise.promise;
      }
    }
  }
})()
