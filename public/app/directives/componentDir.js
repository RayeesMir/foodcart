/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
  @Version - v1.0
----------------------*/

angular.module('componentDir',[])

.directive('spinner', function() {
  return {
    restrict: 'E',
    scope: {
      percentage: '=value',
      filename: '=name'
    },
    templateUrl: '/app/directives/templates/spinner.html'
  };
});