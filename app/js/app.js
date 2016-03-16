'use strict';

/* App Module */

var nflCsApp = angular.module('nflCsApp', [
  'ngRoute',
  'directive',
  'nflCsControllers',
  'nflCsServices'
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
      when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'TeamCtrl'
      }).
      when('/teams/:teamAbrv', {
        templateUrl: 'views/single_team.html',
        controller: 'SingleTeamCtrl'
      }).
      when('/', {
        templateUrl: 'views/splash.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
