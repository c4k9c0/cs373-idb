'use strict';

/* Services */

var nflCsServices = angular.module('nflCsServices', ['ngResource']);

nflCsServices.factory('Players',
  function($resource){
    return $resource('db_scripts/players.json');
  });

nflCsServices.factory('Crimes',
  function($resource){
    return $resource('db_scripts/crimes.json');
  });
  
  
