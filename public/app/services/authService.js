/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('authService', [])

// ===================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ===================================================
.factory('Auth', function($http,$location,$q, AuthToken) {

	// create auth factory object
	var authFactory = {};

	// log a user in
	authFactory.login = function(username, password) {
		// return the promise object and its data
		return $http.post('/api/v1/authentication/login', {
			email: username,
			password: password
		})
		.success(function(data) {
			AuthToken.setToken(data.result.token);
			return data;
		});
	};

	// log a user out by clearing the token
	authFactory.logout = function() {
		// clear the token
		AuthToken.setToken();
		return true;
		// return $http.get('/api/v1/authentication/logout').success(function(res){
		// 	AuthToken.setToken();
		// 	return true;
		// });
	};

	// check if a user is logged in
	// checks if there is a local token
	authFactory.isLoggedIn = function(){	

		return $http.get('/api/v1/authentication/isloggedIn').then(function(res) {
			if(res.data.status != "success") {
				AuthToken.setToken();
				return res;
			} else {
				return res;
			}
		});
	};

	// get the logged in user
	authFactory.getUser = function() {
		if (AuthToken.getToken())
			return $http.get('/api/v1/authentication/me', { cache: true });
		else
			return $q.reject({ message: 'User has no token.' });		
	};

	// return auth factory object
	return authFactory;

})

// ===================================================
// factory for handling tokens
// inject $window to store token client-side
// ===================================================
.factory('AuthToken', function($window) {

	var authTokenFactory = {};

	// get the token out of local storage
	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	};

	// function to set token or clear token
	// if a token is passed, set the token
	// if there is no token, clear it from local storage
	authTokenFactory.setToken = function(token) {
		if (token)
			$window.localStorage.setItem('token', token);
	 	else
			$window.localStorage.removeItem('token');
	};

	return authTokenFactory;

})

// ===================================================
// application configuration to integrate token into requests
// ===================================================
.factory('AuthInterceptor', function($q, AuthToken) {

	var interceptorFactory = {};

	// this will happen on all HTTP requests
	interceptorFactory.request = function(config) {

		// grab the token
		var token = AuthToken.getToken();

		// if the token exists, add it to the header as x-access-token
		if (token) 
			config.headers['x-access-token'] = token;
		
		return config;
	};

	// happens on response errors
	interceptorFactory.responseError = function(response) {
         
		// if our server returns a 403 forbidden response
		if (response.status == 403 || response.status == 400) {
			AuthToken.setToken();
		}

		// return the errors from the server as a promise
		return $q.reject(response);
	};

	return interceptorFactory;
	
});