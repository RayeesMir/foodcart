/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
   @Version - v1.0
----------------------*/

angular.module('productCtrl', [])
.controller('productController',['$scope','$rootScope','$stateParams','Product','$location', function($scope,$rootScope,$stateParams,Product,$location) {
   
   $scope.product = Product.getDetails($stateParams.productName);
   $scope.getStart = function(id) {
   		if($rootScope.userinfo.success) {
   			$location.path('/selection/'+id);
   		} else {
   			$rootScope.nextUrl='/selection/'+id;
   			$('#modal1').openModal();
   		}
   }

}]);
