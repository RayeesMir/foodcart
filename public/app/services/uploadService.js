/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('uploadService', [])

.service('Customize', function($http) {

    //product category for generating menu
	this.saveSelection = function(sid,data,product) {
		return $http.post('/api/v1/customization/',{sid:sid,data:data,product:product}).success(function(res) {
			return res;
		});
	};	

	this.getSelection = function(cid) {
		return $http.get('/api/v1/customization/'+cid).success(function(res) {
			return res;
		});
	};	

});