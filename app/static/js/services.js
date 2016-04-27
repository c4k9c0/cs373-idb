'use strict';

/* Services */

var nflCsServices = angular.module('nflCsServices', ['ngResource']);

nflCsServices.factory('Players',
  function($resource){
    return $resource('api/players');
  });

nflCsServices.factory('Crimes',
  function($resource){
    return $resource('api/crimes');
  });

nflCsServices.factory('Teams',
  function($resource){
    return $resource('api/teams');
  });

nflCsServices.factory('Search',
  function($resource) {
    return function(searchStr) {
      //return "You got to the factory";
      //console.log("In factory " + searchStr);
      return $resource('search/' + searchStr);
    }
  })
  
nflCsServices.factory('Tests',
  function($resource){
    return $resource('/api/run_tests');
  });
  
nflCsServices.factory('Countries',
  function($resource){
    return $resource('/countries');
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

nflCsServices.service('GetMapData',
  function(){
    
    this.getPopulation = function(data, apiData) {
    
		for(var x in data) {
			for(var y in apiData.countries) {
				if(data[x].name.indexOf(apiData.countries[y].name) > -1) {
					data[x].value = apiData.countries[y].population/1000000;
				} 	
			}
		}
		return data;
  }
  
  this.getCurrencies = function(data, apiData) {
    
		for(var x in data) {
			data[x].value = 1;
		}
		
		for(var x in data) {
			for(var y in apiData.countries) {
				if(data[x].name.indexOf(apiData.countries[y].name) > -1) {
					data[x].value = apiData.countries[y].currencies.length;
				} 	
			}
		}
		return data;
  }
  
  this.getLanguages = function(data, apiData) {
    
		for(var x in data) {
			data[x].value = 1;
		}
		
		for(var x in data) {
			for(var y in apiData.countries) {
				if(data[x].name.indexOf(apiData.countries[y].name) > -1) {
					data[x].value = apiData.countries[y].languages.length;
				} 	
			}
		}
		return data;
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
