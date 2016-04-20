'use strict';

/* Controllers */

var nflCsControllers = angular.module('nflCsControllers', []);

nflCsControllers.controller('CountriesCtrl', ['$scope', 'GetMapData', 'Countries', '$http',
  function($scope, GetMapData, Countries, $http) {
  	
  	$scope.a = true;
  	$scope.b = false;
  	$scope.c = false;
  	
  	$scope.category = 'Population';
  	
  	$scope.changeChart = function(x) {
  		$scope.a = false;
  		$scope.b = false;
  		$scope.c = false;
  		switch(x) {
  			
  			case 0 :
  				$scope.a = true;
  				break;
  			case 1 :
  				$scope.b = true;
  				break;
  			case 2 :
  				$scope.c = true;
  				break;
  			default :
  				break;
  				
  		}
  	}
  	
  	Countries.get(function(apiData){
  	Highcharts.data({

        googleSpreadsheetKey: '0AoIaUO7wH1HwdFJHaFI4eUJDYlVna3k5TlpuXzZubHc',

        // custom handler when the spreadsheet is parsed
        parsed: function (columns) {

            // Read the columns into the data array
            var data = [];
            $.each(columns[0], function (i, code) {
                data.push({
                    code: code.toUpperCase(),
                    value: parseFloat(columns[2][i]),
                    name: columns[1][i]
                });
            });


            // Initiate the chart
            $('#containerA').highcharts('Map', {
                chart : {
                    borderWidth : 1
                },

                colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
                    'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],

                title : {
                    text : 'Population by Country'
                },

                mapNavigation: {
                    enabled: true
                },

                legend: {
                    title: {
                        text: 'Population in Millions',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    },
                    align: 'left',
                    verticalAlign: 'bottom',
                    floating: true,
                    layout: 'vertical',
                    valueDecimals: 0,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
                    symbolRadius: 0,
                    symbolHeight: 14
                },

                colorAxis: {
                    dataClasses: [{
                        to: 3
                    }, {
                        from: 3,
                        to: 10
                    }, {
                        from: 10,
                        to: 30
                    }, {
                        from: 30,
                        to: 100
                    }, {
                        from: 100,
                        to: 300
                    }, {
                        from: 300,
                        to: 1000
                    }, {
                        from: 1000
                    }]
                },

                series : [{
                    data : GetMapData.getPopulation(data, apiData),
                    mapData: Highcharts.maps['custom/world'],
                    joinBy: ['iso-a2', 'code'],
                    animation: true,
                    name: 'Population',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' Million People'
                    }
                }]
            });
        },
        error: function () {
            $('#container').html('<div class="loading">' +
                '<i class="icon-frown icon-large"></i> ' +
                'Error loading data from Google Spreadsheets' +
                '</div>');
        }
    });});
    
    Countries.get(function(apiData){
  	Highcharts.data({

        googleSpreadsheetKey: '0AoIaUO7wH1HwdFJHaFI4eUJDYlVna3k5TlpuXzZubHc',

        // custom handler when the spreadsheet is parsed
        parsed: function (columns) {

            // Read the columns into the data array
            var data = [];
            $.each(columns[0], function (i, code) {
                data.push({
                    code: code.toUpperCase(),
                    value: parseFloat(columns[2][i]),
                    name: columns[1][i]
                });
            });


            // Initiate the chart
            $('#containerB').highcharts('Map', {
                chart : {
                    borderWidth : 1
                },

                colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
                    'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],

                title : {
                    text : 'Number of Currencies by Country'
                },

                mapNavigation: {
                    enabled: true
                },

                legend: {
                    title: {
                        text: 'Currencies',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    },
                    align: 'left',
                    verticalAlign: 'bottom',
                    floating: true,
                    layout: 'vertical',
                    valueDecimals: 0,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
                    symbolRadius: 0,
                    symbolHeight: 14
                },

                colorAxis: {
                    dataClasses: [{
                        to: 1
                    }, {
                        from: 1,
                        to: 2
                    }, {
                        from: 2,
                        to: 3
                    }, {
                        from: 3,
                        to: 4
                    }, {
                        from: 4,
                        to: 5
                    }, {
                        from: 5,
                        to: 6
                    }, {
                        from: 6
                    }]
                },

                series : [{
                    data : GetMapData.getCurrencies(data, apiData),
                    mapData: Highcharts.maps['custom/world'],
                    joinBy: ['iso-a2', 'code'],
                    animation: true,
                    name: 'Currencies',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    tooltip: {
                        valueSuffix: ''
                    }
                }]
            });
        },
        error: function () {
            $('#container').html('<div class="loading">' +
                '<i class="icon-frown icon-large"></i> ' +
                'Error loading data from Google Spreadsheets' +
                '</div>');
        }
    });});
    Countries.get(function(apiData){
  	Highcharts.data({

        googleSpreadsheetKey: '0AoIaUO7wH1HwdFJHaFI4eUJDYlVna3k5TlpuXzZubHc',

        // custom handler when the spreadsheet is parsed
        parsed: function (columns) {

            // Read the columns into the data array
            var data = [];
            $.each(columns[0], function (i, code) {
                data.push({
                    code: code.toUpperCase(),
                    value: parseFloat(columns[2][i]),
                    name: columns[1][i]
                });
            });


            // Initiate the chart
            $('#containerC').highcharts('Map', {
                chart : {
                    borderWidth : 1
                },

                colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
                    'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],

                title : {
                    text : 'Number of Languages by Country'
                },

                mapNavigation: {
                    enabled: true
                },

                legend: {
                    title: {
                        text: 'Languages',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    },
                    align: 'left',
                    verticalAlign: 'bottom',
                    floating: true,
                    layout: 'vertical',
                    valueDecimals: 0,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
                    symbolRadius: 0,
                    symbolHeight: 14
                },

                colorAxis: {
                    dataClasses: [{
                        to: 1
                    }, {
                        from: 1,
                        to: 2
                    }, {
                        from: 2,
                        to: 3
                    }, {
                        from: 3,
                        to: 4
                    }, {
                        from: 4,
                        to: 5
                    }, {
                        from: 5,
                        to: 6
                    }, {
                        from: 6
                    }]
                },

                series : [{
                    data : GetMapData.getLanguages(data, apiData),
                    mapData: Highcharts.maps['custom/world'],
                    joinBy: ['iso-a2', 'code'],
                    animation: true,
                    name: 'Languages',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    tooltip: {
                        valueSuffix: ''
                    }
                }]
            });
        },
        error: function () {
            $('#container').html('<div class="loading">' +
                '<i class="icon-frown icon-large"></i> ' +
                'Error loading data from Google Spreadsheets' +
                '</div>');
        }
    });});
  }]);

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
