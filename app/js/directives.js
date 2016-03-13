'use strict';

/* Directives */
angular.module('directive',[]).directive('crimeCategoriesPie', function() {
  return {
  	restrict : 'E',
    template: '<div id="container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>'
  };
});
