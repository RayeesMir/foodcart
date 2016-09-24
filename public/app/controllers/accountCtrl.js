/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('accountCtrl',[])
.controller('accountController', ['$scope', function($scope) {

	$scope.tabUrl='orders.html';

	$scope.addresses = [
		{	
			_id:"3445",
			name:"Shoeb Raza",
			pincode:226016,
			location:"sec 9/238, Indira Nagar",
			landmark: "Pani Gaon Palace",
			city:"Lucknow",
			state:"Uttar Pradesh",
			mobile:"9087766545",
			type:"Home",
			default:true
		},
		{
			_id:"3467",
			name:"Akash Singh",
			pincode:226016,
			location:"sec 9/238, Indira Nagar",
			landmark: "Pani Gaon Palace",
			city:"Lucknow",
			state:"Uttar Pradesh",
			mobile:"9087766545",
			type:"Office",
			default:false
		},
		{
			_id:"3490",
			name:"Kumar Divya Rajat",
			pincode:228878,
			location:"#54, Gandhi Bazar,west anjaneya road, basvangudi",
			landmark: "Mc Donalds",
			city:"Bangaluru",
			state:"Karnataka",
			mobile:"9087766545",
			type:"Office",
			default:false
		}
	];

	$scope.addAddress = function(addr) {
		$scope.editAddress = true;
	};

	$scope.addrEdit = function($event,$index) {
		$event.stopPropagation();
		$scope.editAddress = true;
		$scope.addr = $scope.addresses[$index];
	}

	$scope.addrDelete = function($event,$index) {
		$event.stopPropagation();
		var ans = confirm("Do you want to delete this address?");
		if(ans) {
			$scope.addresses.splice($index,1);
		}
	}

	$scope.addrSave = function(addr) {
		if(addr._id) {
			if(addr.default) {
				$scope.addresses.forEach(function(item){
					if(item.default==true && addr.default==true) {
						item.default=false;
					}
					if(item._id == addr._id) {
						item.default = true;
					}
				});	
			}
		} else {
			$scope.addresses.push(addr);
		}
		$scope.addr = {};
		$scope.editAddress = false;
	};


}]);