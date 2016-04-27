var nflCsFilters = angular.module('nflCsFilters', ['ngSanitize']);

nflCsFilters.filter('searchFilter', function() {
        return function (input, query) {
        	// input =Ricky Williams query = "Ricky RB"
        	var splitWords = query.split(" ");

        	// console.log(splitWords);

        	if(splitWords.length < 1) {
        		return input.replace(RegExp('('+ query + ')', 'g'), '<span class="bold-match">$1</span>');           
        	} else {
        		for (var w in splitWords) {
        			//console.log(word);
        			input = input.replace(RegExp('('+ splitWords[w] + ')', 'g'), '<span class="bold-match">$1</span>');
        		}
        		return input;
        	}
            
        }
    });