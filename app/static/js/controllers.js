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
		  "responsive": true,
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

nflCsControllers.controller('SinglePlayerCtrl', ['$scope', '$routeParams', 'Crimes', 'Players',
  function($scope, $routeParams, Crimes, Players) {

    var dtData = [];

    $scope.playerName = $routeParams.playerName;
    Players.get(function(data) {
      $scope.player = data[$scope.playerName]
      $scope.team_img = 'img/Teams/' + $scope.player.Team + '.gif'
      
    })

    Crimes.get(function(data){

      for(var each in data) {
        if(each == $routeParams.playerName) {
          var player = data[each];
          for(var crime in player) {
            dtData.push([player[crime]['Category'],player[crime]['Date'],player[crime]['Encounter'],player[crime]['Description'],player[crime]['Outcome']]);
          }
        }
      }
    
      $('table').dataTable({
        "responsive": true,
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
    $scope.crime_img = 'img/Crimes/'+$scope.crimeName+'.png'

    Crimes.get(function(data){

      for(var each in data) {

        if(data[each][0] != undefined) {
          var player = data[each];
          for(var crime in player) {
            if(player[crime]['Category'] == $routeParams.crime) {
              dtData.push([each,player[crime]['Team'],player[crime]['Position'],player[crime]['Date'],player[crime]['Encounter'],player[crime]['Description'],player[crime]['Outcome']]);
            }
          }
        }
      }
    
      $('table').dataTable({
        "responsive": true,
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
              dtData.push([each,player[crime]['Category'],player[crime]['Position'],player[crime]['Date'],player[crime]['Encounter'],player[crime]['Description'],player[crime]['Outcome']]);
          }
        }
      }
    
      $('table').dataTable({
        "responsive": true,
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

    var dtData = [];

    Teams.get(function(data){

      for(var team in data) {
          if(data[team]['City'] != undefined){
            dtData.push([team,data[team]['City'],data[team]['State'],data[team]['Mascot'],data[team]['Division'], data[team]['Championships']]);
          }
        }

      $('table').dataTable({
        "responsive": true,
        "aaData": dtData,
        "aoColumnDefs":[{
            "aTargets": [ 0 ]
            , "bSortable": true
              , "mRender": function ( url, type, full )  {
                  return  '<a href="#teams/'+url+'">' + url + '</a>';}
        }]
      })
    });
  }]);

nflCsControllers.controller('SingleTeamCtrl', ['$scope', '$routeParams', 'Crimes', 'Teams', 'GetPieChartData',
  function($scope, $routeParams, Crimes, Teams, GetPieChartData) {
  	
  	var dtData = [];
  	$scope.teamName = $routeParams.teamAbrv;
    $scope.team_img = 'img/Teams/' + $scope.teamName + '.gif';

    Teams.get(function(data) {
      $scope.team = data[$scope.teamName]
      
    })
  	
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
  		}
  	
		$('table').dataTable({
      "responsive": true,
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
