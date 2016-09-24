/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('loginCtrl', ['authService'])

.controller('loginController', ['Auth','$rootScope','$scope','$location', function(Auth,$rootScope,$scope,$location) {
	
	//login data submit and authenticate
	$scope.loginMain = function(loginDetail){
	   $scope.login_error_main = "";
	   if(loginDetail.username=="") {
	   		$scope.login_error_main = "Please enter your email";
	   		return;
	   } 
	   if(loginDetail.password=="") {
	   		$scope.login_error_main = "Please enter your password";
	   		return;
	   }	
	   Auth
	   .login(loginDetail.username,loginDetail.password)
	   .success(function(res) {
				if (res.status=="success") {			
					$scope.loginDetail.username="";
					$scope.loginDetail.password="";
					$location.path('/');
				} else {
					$scope.login_error_main = res.message;
				}    
			})
	   .catch(function(err){
			$scope.login_error_main = err.data.result;
	   });
	};

}]);