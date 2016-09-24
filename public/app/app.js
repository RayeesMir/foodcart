/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('ReduxApp', ['ui.materialize','angular.filter','ngAnimate', 'app.routes','mainCtrl','homeCtrl','loginCtrl','productCtrl','productlistCtrl','accountCtrl','customizeCtrl','uploadCtrl','cartCtrl','authService','photoService','productService','uploadService','componentDir','cropDir'])

// application configuration to integrate token into requests
.config(function($httpProvider,$locationProvider) {
	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
	$locationProvider.html5Mode(true);

})
.run(function($rootScope,Auth) {
  	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		
		$rootScope.nextUrl=null;

  		Auth.isLoggedIn().then(function(val){
  			if(val.data.status) {
  				$rootScope.userinfo = val.data.result;
  				$rootScope.userinfo.success = true;
  			} else {
  				$rootScope.userinfo = {success:false};
  			}
  			
		}).catch(function(err){
			$rootScope.userinfo = {success:false};
		});
	    $rootScope.navType = toState.navType;
      	document.body.scrollTop = 0;
    	document.documentElement.scrollTop = 0;
	});
});
