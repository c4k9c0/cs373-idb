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
  
nflCsServices.service('Teams',
  function(){
    
  	this.getTeams = function() {
		return ['DEN','MIN', 'CIN','TEN','TB','JAC','IND','CHI','CLE','KC','MIA','SD',
			'BAL','NO','PIT','SEA','SF','OAK','GB','WAS','NE','ATL','CAR','ARI',
			'DET','NYJ','BUF','DAL','PHI','NYG','HOU','STL'].sort()
  	}
  });