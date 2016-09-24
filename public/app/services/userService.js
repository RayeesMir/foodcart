/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>
	@Version - v1.0
----------------------*/

angular.module('userService', [])

.factory('User', function($http) {

	// create a new object
	var userFactory = {};

    // send OTP code
	userFactory.sendOTP = function(num) {
		return $http.post('/api/v1/users/getotp/',{mobile:num});
	};

	// send OTP code
	userFactory.verifyOTP = function(num,otp) {
		return $http.post('/api/v1/users/validateotp/',{mobile:num,otptoken:otp});
	};

	// create user
	userFactory.createUser = function(otp,user) {
		return $http.post('/api/v1/users/signup/',{otptoken:otp,user:user});
	};

	// update a user
	userFactory.update = function(id, userData) {
		return $http.put('/api/user/' + id, userData);
	};

	// delete a user
	userFactory.delete = function(id) {
		return $http.delete('/api/user/' + id);
	};

	// return our entire userFactory object
	return userFactory;

});