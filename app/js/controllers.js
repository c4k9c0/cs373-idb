'use strict';

/* Controllers */

var nflCsControllers = angular.module('nflCsControllers', []);

nflCsControllers.controller('PlayersCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
  	$('table').dataTable({
	  "aaData":[
		["Ricky Williams","J Walking","Dolphins","RB"],
		["Joe Montana","DWI","Cowboys","QB"],
		["Dez Bryant","Speeding","Cowboys","WR"],
		["Somebody Else","Tickling a cop","Bears","WR"],
		["Odell Beckhem JR.","Something pretty bad","Giants","WR"]
	  ],
	  "aoColumnDefs":[{
			"aTargets": [ 1 ]
		  , "bSortable": false
		  
		  /* Use later for looping to other categories 
		  , "mRender": function ( url, type, full )  {
			  return  '<a href="'+url+'">' + url + '</a>';
		  }*/
	  },{
			"aTargets":[ 3 ]
			
			/* Use later to sort dates
		  , "sType": "date"
		  , "mRender": function(date, type, full) {
			  return (full[2] == "Blog") 
						? new Date(date).toDateString()
						: "N/A" ;
		  }  
		  */
	  }]
	});
  }]);

nflCsControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
