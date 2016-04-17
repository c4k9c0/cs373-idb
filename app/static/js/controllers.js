'use strict';

/* Controllers */

var nflCsControllers = angular.module('nflCsControllers', []);

nflCsControllers.controller('PlayersCtrl', ['$scope', 'Players',
  function($scope, Players) {
  	
  	var dtData = [];
  	
  	Players.get(function(data){
  	
  		for(var each in data) {
  			if(data[each]['team_name'] != undefined)
  				dtData.push([data[each]['name'],data[each]['team_name'],data[each]['pos'],data[each]['num_arrests'],data[each]['last_arrest']]);
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
      $scope.team_img = 'img/Teams/' + $scope.player.team_name + '.gif'
      
    })

    Crimes.get(function(data){

      for(var each in data) {
        if(each == $routeParams.playerName) {
          var player = data[each];
          for(var crime in player) {
            dtData.push([player[crime]['category'],player[crime]['date'],player[crime]['encounter'],player[crime]['description'],player[crime]['outcome']]);
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
            if(player[crime]['category'] == $routeParams.crime) {
              dtData.push([each,player[crime]['team_name'],player[crime]['position'],player[crime]['date'],player[crime]['encounter'],player[crime]['description'],player[crime]['outcome']]);
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
              dtData.push([each,player[crime]['category'],player[crime]['position'],player[crime]['date'],player[crime]['encounter'],player[crime]['description'],player[crime]['outcome']]);
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
          if(data[team]['city'] != undefined){
            dtData.push([team,data[team]['city'],data[team]['state'],data[team]['mascot'],data[team]['division'], data[team]['championships']]);
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
  
nflCsControllers.controller('AboutCtrl', ['$scope', 'Tests',
  function($scope, Tests) {
  	
  	var dtData = [];
  	$scope.results = "Tests will display here.";
  	
  	$scope.getTestResults = function getTestResults() {
      $scope.results = "Running Tests...";

      Tests.get(function(data){
  		$scope.results = "";
  		for(var test in data) {
  			if(typeof test == "string" && test.indexOf("Test") > -1) {
  				$scope.results+=test+": "+data[test]+"\n";
  			}
  		}
	});}
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
            		if(player[crime]['team_name'] == $routeParams.teamAbrv) {
              			dtData.push([each,player[crime]['position'],player[crime]['category'],player[crime]['encounter'],player[crime]['outcome']]);
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
