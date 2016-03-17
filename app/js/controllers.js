'use strict';

/* Controllers */

var nflCsControllers = angular.module('nflCsControllers', []);

nflCsControllers.controller('PlayersCtrl', ['$scope', 'Players',
  function($scope, Players) {
  	
  	var dtData = [];
  	
  	Players.get(function(data){
  	
  		for(var each in data) {
  			if(data[each]['Name'] != undefined)
  				dtData.push([data[each]['Name'],data[each]['Team'],data[each]['Pos'],data[each]['Num_Arrests'],data[each]['Last_Arrest']]);
  		}
  	
		$('table').dataTable({
		  "aaData": dtData,
		  "aoColumnDefs":[{
				"aTargets": [ 0, 1 ]
			  , "bSortable": true
			  , "mRender": function ( url, type, full )  {
				  return  '<a href="#teams/'+url+'">' + url + '</a>';
			  }
		  }]
		})
	});
  }]);

nflCsControllers.controller('SingleCrimeCtrl', ['$scope', '$routeParams', 'Crimes',
  function($scope, $routeParams, Crimes) {

    var dtData = [];

    $scope.teamName = $routeParams.crime;
    $scope.img = 'img/crime.png'

    console.log($scope.teamName);

    Crimes.get(function(data){

      for(var each in data) {
        if(data[each][0] != undefined) {
          console.log(data[each][0]['Category']);
        }
        
        if(data[each][0] != undefined && data[each][0]['Category'] == $routeParams.crime)
          dtData.push([each,data[each][0]['Position'],data[each][0]['Category'],data[each][0]['Encounter'],data[each][0]['Outcome']]);
      }
    
      $('table').dataTable({
        "aaData": dtData,
        "aoColumnDefs":[{
          "aTargets": [ 0 ]
          , "bSortable": true
          , "mRender": function ( url, type, full )  {
            return  '<a href="#teams/'+url+'">' + url + '</a>';
          }
        }]
      })
    })
  }]);

nflCsControllers.controller('CrimeCtrl', ['$scope', 'Types',
  function($scope, Types) {

    $scope.crimes = [];
    $scope.img = 'img/crime.png'

    var crimes = Types.getCrimes();

    for(var each in crimes) {

      var crime = {}
      crime.crimeName = crimes[each];
      crime.url = '#crimes/' + crime.crimeName;
      $scope.crimes.push(crime);
    }
  }]);

nflCsControllers.controller('TeamCtrl', ['$scope', 'Teams',
  function($scope, Teams) {

    $scope.teams = [];

    var teams = Teams.getTeams();

    for(var each in teams) {

      var team = {};
      team.teamName = teams[each];
      team.img = 'img/Teams/' + teams[each] + '.gif';
      team.url = '#teams/' + teams[each];

      $scope.teams.push(team);
    }
  }]);

nflCsControllers.controller('SingleTeamCtrl', ['$scope', '$routeParams', 'Crimes',
  function($scope, $routeParams, Crimes) {
  	
  	var dtData = [];
  	$scope.teamName = $routeParams.teamAbrv;
  	$scope.img = 'img/Teams/' + $scope.teamName + '.gif';
  	console.log(Crimes);
  	
  	Crimes.get(function(data){
  	
  		for(var each in data) {
  			if(data[each][0] != undefined && data[each][0]['Team'] == $routeParams.teamAbrv)
  				dtData.push([each,data[each][0]['Position'],data[each][0]['Category'],data[each][0]['Encounter'],data[each][0]['Outcome']]);
  		}
  	
		$('table').dataTable({
		  "aaData": dtData,
		  "aoColumnDefs":[{
				"aTargets": [ 0 ]
			  , "bSortable": true
        , "mRender": function ( url, type, full )  {
          return  '<a href="#teams/'+url+'">' + url + '</a>';
        }
		  }]
		})
		
		// Build the chart
        $('#container').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Number of Crimes Committed'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Crime Categories (Dummy Data will hook it up next time I work)',
                colorByPoint: true,
                data: [{
                    name: 'Rape',
                    y: 56.33
                }, {
                    name: 'Theft',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Car Jacking',
                    y: 10.38
                }, {
                    name: 'Other Crime',
                    y: 4.77
                }, {
                    name: 'And anotheerrrr crime',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }]
            }]
        })
	});
  }]);
