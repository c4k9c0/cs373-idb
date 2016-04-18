'use strict';

/* Controllers */

var nflCsControllers = angular.module('nflCsControllers', ['ngAnimate', 'ui.bootstrap']);

nflCsControllers.controller('SearchCtrl', ['$scope', '$uibModal',
  function($scope, $uibModal) {
   
    $scope.searchStr = "";

    $scope.open = function open() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "../templates/search_results.html",
        controller: "ModalInstanceCtrl",
        size: "lg",
        resolve: {
          searchStr: function () {
            return $scope.searchStr;
          }
        }
      });
    } 
  }])

nflCsControllers.controller('ModalInstanceCtrl', ['$scope','searchStr', 'Search',
  function($scope, searchStr, Search) {

    $scope.searchDisplay = searchStr;
    var results = Search(searchStr);

    $scope.displayResults = "here are the results";

    // Someone likes to cause problems

    var players_data = [];
    var crimes_data = [];
    var teams_data = [];

    var players_data_OR = [];
    var crimes_data_OR = [];
    var teams_data_OR = [];


    var popTeams = function popTeams(collection) {
      var ary = [];

      for(var teams in collection) {
        var t = collection[teams];
        console.log(t['name']);
        ary.push([t['name'], t['city'], t['state'], t['mascot'], t['division'], t['championships']]);
      }

      return ary;
    }

    var popPlayers = function popPlayers(collection) {
      var ary = [];

      for(var player in collection) {
        var p = collection[player];
        console.log(p['name']);
        ary.push([p['name'], p['first_name'], p['last_name'], p['last_arrest'], p['num_arrests'], p['pos']]);
      }

      return ary;
    }

    var popCrimes = function popCrimes(collection) {
      var ary = [];

      for(var crime in collection) {
        var c = collection[crime];
        console.log(c['id']);
        ary.push([c['category'], c['date'], c['encounter'], c['description'], c['outcome'], c['position']]);
      }

      return ary;
    }

    results.get(function(data) {
      
    if(searchStr.split(/\s+/).length > 1) {
      players_data = popPlayers(data['AND']['players']);
      crimes_data = popCrimes(data['AND']['crimes']);
      teams_data = popTeams(data['AND']['teams']);
      players_data_OR = popPlayers(data['OR']['players']);
      crimes_data_OR = popCrimes(data['OR']['crimes']);
      teams_data_OR = popTeams(data['OR']['teams']);
    } else {
      players_data = popPlayers(data['players']);
      crimes_data = popCrimes(data['crimes']);
      teams_data = popTeams(data['teams']);
    }

    $('#table1').dataTable({
      "responsive": true,
      "aaData": players_data,
      "aoColumnDefs":[{
        "aTargets": [ 0 ]
        , "bSortable": true
        , "mRender": function ( url, type, full )  {
          return  '<a href="#players/'+url+'">' + url + '</a>';}
        }]
    })

    $('#table2').dataTable({
      "responsive": true,
      "aaData": players_data_OR,
      "aoColumnDefs":[{
        "aTargets": [ 0 ]
        , "bSortable": true
        , "mRender": function ( url, type, full )  {
          return  '<a href="#crimes/'+url+'">' + url + '</a>';}
        }]
    })

    $('#table3').dataTable({
      "responsive": true,
      "aaData": crimes_data,
      "aoColumnDefs":[{
        "aTargets": [ 0 ]
        , "bSortable": true
        , "mRender": function ( url, type, full )  {
          return  '<a href="#players/'+url+'">' + url + '</a>';}
        }]
    })

    $('#table4').dataTable({
      "responsive": true,
      "aaData": crimes_data_OR,
      "aoColumnDefs":[{
        "aTargets": [ 0 ]
        , "bSortable": true
        , "mRender": function ( url, type, full )  {
          return  '<a href="#crimes/'+url+'">' + url + '</a>';}
        }]
    })

    $('#table5').dataTable({
      "responsive": true,
      "aaData": teams_data,
      "aoColumnDefs":[{
        "aTargets": [ 0 ]
        , "bSortable": true
        , "mRender": function ( url, type, full )  {
          return  '<a href="#players/'+url+'">' + url + '</a>';}
        }]
    })

    $('#table6').dataTable({
      "responsive": true,
      "aaData": teams_data_OR,
      "aoColumnDefs":[{
        "aTargets": [ 0 ]
        , "bSortable": true
        , "mRender": function ( url, type, full )  {
          return  '<a href="#crimes/'+url+'">' + url + '</a>';}
        }]
    })
  }); 

  // category is some json
  var addProperty = function addProperty(key, category) {

    var str = "";

    for(var each in category) {
      str += each[key];
    }
    return str;
  }
}])

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
