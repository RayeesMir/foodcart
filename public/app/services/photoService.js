/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('photoService', [])

.service('Photo', function($http) {

    //product category for generating menu
	this.getLinks = function() {
		return $http.get('/api/v1/photos/');
	};		

});