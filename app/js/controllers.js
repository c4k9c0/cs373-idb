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
				"aTargets": [ 1 ]
			  , "bSortable": false
			  , "mRender": function ( url, type, full )  {
				  return  '<a href="#teams/'+url+'">' + url + '</a>';
			  }
		  }]
		})
	});
  }]);

nflCsControllers.controller('TeamCtrl', ['$scope', '$routeParams', 'Crimes',
  function($scope, $routeParams, Crimes) {
  	
  	var dtData = [];
  	$scope.teamName = $routeParams.teamAbrv;
  	$scope.img = 'img/teamImg.png';
  	console.log(Crimes);
  	
  	Crimes.get(function(data){
  	
  		for(var each in data) {
  			if(data[each][0] != undefined && data[each][0]['Team'] == $routeParams.teamAbrv)
  				dtData.push([each,data[each][0]['Position'],data[each][0]['Category'],data[each][0]['Encounter'],data[each][0]['Outcome']]);
  		}
  	
		$('table').dataTable({
		  "aaData": dtData,
		  "aoColumnDefs":[{
				"aTargets": [ 1 ]
			  , "bSortable": false
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
