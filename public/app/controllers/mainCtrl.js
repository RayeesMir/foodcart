/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('mainCtrl', ['productService','authService','userService'])

.controller('mainController',['$window','$location','$document','$scope','$rootScope','Product','Auth','User', function($window,$location,$document,$scope,$rootScope,Product,Auth,User) {
    
    $scope.step1= true;
	$scope.step2=false;
	$scope.signup=false;

    //login form object initialization
	$scope.loginDetail = {};  

	//get productCategory list | output arrayobject [{name,slug,imageUrl}]
	Product.getCategory().then(function(res){
		$scope.productCategory = res.data.result;
	}); 

	//Global back btn function 
	$scope.$back = function() { 
	    $window.history.back();
  	};

  	//send OTP code
	$scope.sendOTP = function(num) {
        console.log(num);
    };

    //login data submit and authenticate
	$scope.login = function(loginDetail){
	   $scope.login_error = "";
	   if(loginDetail.username=="") {
	   		$scope.wobble();
	   		$scope.login_error = "Please enter your email";
	   		return;
	   } 
	   if(loginDetail.password=="") {
	   		$scope.wobble();
	   		$scope.login_error = "Please enter your password";
	   		return;
	   }	
	   Auth
	   .login(loginDetail.username,loginDetail.password)
	   .success(function(res) {
				if (res.status="success") {		
					$rootScope.userinfo = res.result.user;
					$rootScope.userinfo.success = true;
					$('#modal1').closeModal();
					$scope.loginDetail.username="";
					$scope.loginDetail.password="";
					if($rootScope.nextUrl!=null) {
						$location.path($rootScope.nextUrl);
					}
				} else {
					$scope.wobble();
					$scope.login_error = res.message;
				}    
			})
	   .catch(function(err){
			$scope.wobble();
			$scope.login_error = err.data.result;
	   }); 
	};

    //logout function
	$scope.logout = function() {
		Auth.logout();
		$rootScope.userinfo = {success:false};
		$location.path('/');	
	};

    //animation effect to show form errors
	$scope.wobble = function(txt) {
	  $("#modal1").addClass('jello');
	  setTimeout(function(){$("#modal1").removeClass('jello')},1000);
	};

	//send OTP code
	$scope.sendOtp = function(num) {
		User.sendOTP(num)
			.then(function(res) {
				if(res.data.status=="success") {
					$scope.step1=false;
					$scope.step2=true;
				} else {
					alert("Network Error");
				}
			});
	};

	//verify OTP code
	$scope.verifyOtp = function(num,otp) {
		User.verifyOTP(num,otp)
			.then(function(res) {
				if(res.data.status=="success") {
					$scope.step2=false;
					$scope.step3=true;
				} else {
					alert("Network Error");
				}
			});
		
	};

	//create user
	$scope.createUser = function(otp,user) {
		User.createUser(otp,user)
			.then(function(res) {
				if(res.data.status=="success") {
					$scope.signup=false;
					$scope.step3=false;
					$scope.step1=true;
					user.name=null;
					user.email=null;
					user.password=null;
				} else {
					alert("Network Error");
				}
			});
		
	};

	(function(){
	    var cnt=0;
	    //scroll function
	    $(window).scroll(function(){
	      var winScroll = $(window).scrollTop();

	      if(winScroll>300) {
	        $('nav.top.home').addClass('reduced');
	      } else {
	        $('nav.top.home').removeClass('reduced');
	      }

	      if(winScroll-cnt > 0) {
	        $('nav.top').removeClass('slideInDown');
	        $('nav.top').addClass('slideOutUp');
	      } else {
	        $('nav.top').removeClass('slideOutUp');
	        $('nav.top').addClass('slideInDown');
	      }
	      cnt = winScroll;

	    });
	}()); 


}]);