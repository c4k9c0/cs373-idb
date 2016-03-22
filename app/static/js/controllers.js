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
				"aTargets": [ 0 ]
			  , "bSortable": true
			  , "mRender": function ( url, type, full )  {
				  return  '<a href="#players/'+url+'">' + url + '</a>';}
			  },
			  {
				"aTargets": [ 1 ]
			  , "bSortable": true
			  , "mRender": function ( url, type, full )  {
				  return  '<a href="#teams/'+url+'">' + url + '</a>';}
		  }]
		})
	});
  }]);

nflCsControllers.controller('SinglePlayerCtrl', ['$scope', '$routeParams', 'Crimes',
  function($scope, $routeParams, Crimes) {

    var dtData = [];

    $scope.playerName = $routeParams.playerName;
    //Use if we mine pictures for every player
    //$scope.img

    Crimes.get(function(data){

      for(var each in data) {
        //why are we checking undefined?
        //data[each][0] != undefined && 
        if(each == $routeParams.playerName) {
          var player = data[each];
          for(var crime in player) {
            dtData.push([player[crime]['Category'],player[crime]['Date'],player[crime]['Encounter'],player[crime]['Description'],player[crime]['Outcome']]);
          }
        }
      }
    
      $('table').dataTable({
        "aaData": dtData,
        "aoColumnDefs":[{
          "aTargets": [ 0 ]
          , "bSortable": true
          , "mRender": function ( url, type, full )  {
            return  '<a href="#crimes/'+url+'">' + url + '</a>';
          }
        }]
      })
    })
  }]);

nflCsControllers.controller('SingleCrimeCtrl', ['$scope', '$routeParams', 'Crimes',
  function($scope, $routeParams, Crimes) {

    var dtData = [];

    $scope.crimeName = $routeParams.crime;
    $scope.img = 'img/crime.png'

    Crimes.get(function(data){

      for(var each in data) {

        if(data[each][0] != undefined) {
          var player = data[each];
          for(var crime in player) {
            if(player[crime]['Category'] == $routeParams.crime) {
              dtData.push([each,player[crime]['Position'],player[crime]['Encounter'],player[crime]['Outcome']]);
            }
          }
          // old
          //dtData.push([each,data[each][0]['Position'],data[each][0]['Encounter'],data[each][0]['Outcome']]);
        }
      }
    
      $('table').dataTable({
        "aaData": dtData,
        "aoColumnDefs":[{
          "aTargets": [ 0 ]
          , "bSortable": true
          , "mRender": function ( url, type, full )  {
            return  '<a href="#players/'+url+'">' + url + '</a>';
          }
        }]
      })
    })
  }]);

nflCsControllers.controller('CrimeCtrl', ['$scope', 'Crimes',
  function($scope, Crimes) {

    $scope.crimes = [];
    $scope.img = 'img/crime.png'

    var dtData = [];
    
    Crimes.get(function(data){

      for(var each in data) {

        if(data[each][0] != undefined) {
          var player = data[each];
          for(var crime in player) {
              dtData.push([each,player[crime]['Category'],player[crime]['Position'],player[crime]['Encounter'],player[crime]['Outcome']]);
          }
          // old
          //dtData.push([each,data[each][0]['Position'],data[each][0]['Encounter'],data[each][0]['Outcome']]);
        }
      }
    
      $('table').dataTable({
        "aaData": dtData,
        "aoColumnDefs":[{
          "aTargets": [ 0 ]
          , "bSortable": true
          , "mRender": function ( url, type, full )  {
            return  '<a href="#players/'+url+'">' + url + '</a>';}
          },
          {
          "aTargets": [ 1 ]
          , "bSortable": true
          , "mRender": function ( url, type, full )  {
            return  '<a href="#crimes/'+url+'">' + url + '</a>';}
          }]
      })
    })
  }]);

nflCsControllers.controller('TeamCtrl', ['$scope', 'Teams',
  function($scope, Teams) {

    //$scope.teams = [];

    var dtData = [];

    Teams.get(function(data){

      for(var team in data) {
          if(data[team]['City'] != undefined){
            dtData.push([team,data[team]['City'],data[team]['State'],data[team]['Mascot'],data[team]['Division'], data[team]['Championships']]);
          }
        }

      $('table').dataTable({
        "aaData": dtData,
        "aoColumnDefs":[{
            "aTargets": [ 0 ]
            , "bSortable": true
              , "mRender": function ( url, type, full )  {
                  return  '<a href="#teams/'+url+'">' + url + '</a>';}
        }]
      })
      });



    // for(var each in teams) {

    //   var team = {};
    //   team.teamName = teams[each];
    //   team.img = 'img/Teams/' + teams[each] + '.gif';
    //   team.url = '#teams/' + teams[each];

    //   $scope.teams.push(team);
    // }
  }]);

nflCsControllers.controller('SingleTeamCtrl', ['$scope', '$routeParams', 'Crimes', 'GetPieChartData',
  function($scope, $routeParams, Crimes, GetPieChartData) {
  	
  	var dtData = [];
  	$scope.teamName = $routeParams.teamAbrv;
  	$scope.img = 'img/Teams/' + $scope.teamName + '.gif';
  	
  	Crimes.get(function(data){
  	
  		for(var each in data) {
  			
        if(data[each][0] != undefined) {
          var player = data[each];
          for(var crime in player) {
            if(player[crime]['Team'] == $routeParams.teamAbrv) {
              dtData.push([each,player[crime]['Position'],player[crime]['Category'],player[crime]['Encounter'],player[crime]['Outcome']]);
            }
          }
        }

        // old if
        //if(data[each][0] != undefined && data[each][0]['Team'] == $routeParams.teamAbrv)
  			//	dtData.push([each,data[each][0]['Position'],data[each][0]['Category'],data[each][0]['Encounter'],data[each][0]['Outcome']]);
  		}
  	
		$('table').dataTable({
		  "aaData": dtData,
		  "aoColumnDefs":[{
				  "aTargets": [ 0 ]
			  	, "bSortable": true
        		, "mRender": function ( url, type, full )  {
          			return  '<a href="#players/'+url+'">' + url + '</a>';}
		  },
		  {
				  "aTargets": [ 2 ]
			    , "bSortable": true
       		  	, "mRender": function ( url, type, full )  {
          			return  '<a href="#crimes/'+url+'">' + url + '</a>';}
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
                pointFormat: '{series.name}: <b>{point.y}</b><br>{point.percentage:.1f}%</br>'
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
                name: 'Crime Categories',
                colorByPoint: true,
                data: GetPieChartData.getPieChartData(dtData, 2)
            }]
        })
	});
  }]);
