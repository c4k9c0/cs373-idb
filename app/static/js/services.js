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
    return ["Burglary","Assault","DUI","Drugs","Domestic violence",
      "Resisting arrest","Alcohol","Gun","False information","Failure to appear","Outstanding warrant",
      "Handicap parking","Solicitation","Obstruction","Theft","License","Disorderly conduct","Coercion",
      "Public intoxication","Reckless driving","Sex","Battery","Public urination","Manslaughter",
      "Breach of peace","Probation violation","Child support","Harassment","Criminal mischief",
      "False name","Sexual assault","Murder","Trespassing","Violating court order",
      "Evading arrest","Leaving scene.","Weapon","Child abuse",
      "Sexual battery","Indecent exposure","Interfering with police",
      "Fraud","Stalking","Property destruction","Hit-and-Run",
      "Reckless endangerment","Disturbing the peace","Traffic warrants","Animal Cruelty",
      "Dogfighting","Attempted murder","Pimping","Evading police","Gambling"].sort()
    }
  });
  
nflCsServices.service('GetPieChartData',
  function(){
    
    this.getPieChartData = function(tableData, columnToDisplay) {
    
		var data = []
						
		for(var each in tableData) {

			if(tableData[each][columnToDisplay] in data) {
				data[tableData[each][columnToDisplay]].y +=1
			} else {
				data[tableData[each][columnToDisplay]] = 
					{
						name: tableData[each][columnToDisplay],
						y: 1
					};
			}
		}
	
		var formattedData = [];
		for(var each in data) {
			formattedData.push(data[each]);
		}		
	
		return formattedData;
  }
});
