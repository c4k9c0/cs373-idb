'use strict';
/* App Module */

var nflCsApp = angular.module('nflCsApp', [
  'ngRoute',
  'directive',
  'nflCsControllers',
  'nflCsServices',
  'nflCsFilters'
]);

nflCsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/players', {
        templateUrl: 'templates/players.html',
        controller: 'PlayersCtrl'
      }).
      when('/players/:playerName', {
        templateUrl: 'templates/single_player.html',
        controller: 'SinglePlayerCtrl'
      }).
      when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }).
      when('/crimes', {
        templateUrl: 'templates/crimes.html',
        controller: 'CrimeCtrl'
      }).
      when('/crimes/:crime', {
        templateUrl: 'templates/single_crime.html',
        controller: 'SingleCrimeCtrl'
      }).
      when('/teams', {
        templateUrl: 'templates/teams.html',
        controller: 'TeamCtrl'
      }).
      when('/teams/:teamAbrv', {
        templateUrl: 'templates/single_team.html',
        controller: 'SingleTeamCtrl'
      }).
      when('/', {
        templateUrl: '/templates/splash.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
