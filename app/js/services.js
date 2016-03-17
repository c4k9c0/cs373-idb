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

nflCsServices.service('Types',
  function(){
    
    this.getCrimes = function() {
    return ["Burglary","Assault","DUI","Outstanding Warrant","Drugs","Domestic violence",
      "Resisting arrest","Alcohol","Gun","False information","Failure to appear","Outstanding warrant",
      "Handicap parking","Solicitation","Obstruction","Theft","License","Disorderly conduct","Coercion",
      "Public intoxication","Reckless driving","Sex","Battery","Public urination","Manslaughter",
      "Breach of peace","Probation violation","Child support","Harassment","Criminal mischief",
      "False name","Sexual assault","Murder","Trespassing","Violating court order",
      "Evading arrest","Leaving scene.","Weapon","Animal neglect","Guns","Child abuse","Resisting officer",
      "Sexual battery","Resisting Arrest","Domestic","Indecent exposure","Interfering with police",
      "Domestic dispute","Fraud","Stalking","Property destruction","Hit-and-Run","Assasult",
      "Reckless endangerment","Disturbing the peace","Animal abuse","Traffic warrants","Animal cruelty",
      "Failure to Appear","Dogfighting","Attempted murder","Pimping","Evading police","Gambling"].sort()
    }
  });