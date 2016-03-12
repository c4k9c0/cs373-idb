'use strict';

/* App Module */

var nflCsApp = angular.module('nflCsApp', [
  'ngRoute',
  'nflCsControllers',
  'phonecatServices'
]);

nflCsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/players', {
        templateUrl: 'views/players.html',
        controller: 'PlayersCtrl'
      }).
      when('/about', {
        templateUrl: 'views/about.html'
      }).
      when('/', {
        templateUrl: 'views/splash.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
