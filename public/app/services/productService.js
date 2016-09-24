/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('productService', [])

.service('Product', ['$http', function($http) {	

	//Individual product detail
	this.getDetails = function(pid) {
		function findByUrl(object) {
			return object.url === pid;
		}
		return data.find(findByUrl);
	};


	//product list for product page
	this.getList = function() {
		return $http.get('/products')
			.then(function(res) {
				console.log(res);
				return res;
			});
	};

	//product category for generating menu
	this.getCategory = function() {
		return $http.get('/products').then(function(res) {
			return res;
		});
	};

}]);