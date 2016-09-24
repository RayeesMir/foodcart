/*----------------------
	@Author - Shoeb Raza <mail@shoebraza.com>	
	@Version - v1.0
----------------------*/

angular.module('cartCtrl',[])
.controller('cartController', ['$scope','$location', function($scope,$location) {

	$scope.cartCount = 4;
	$scope.grandTotal = 0;
	$scope.step2 = false;
	$scope.step3 = false;
	$scope.cartNavBtn = "CONTINUE";
	$scope.addr_selected = [];

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

	$scope.cartItems = [
		{
			img:"/assets/images/default-crop.jpg",
			name:"PHOTO PRINT 5x7",
			id:"30",
			unitPrice:120,
			total:120,
			pack:20
		},
		{
			img:"/assets/images/default-crop.jpg",
			name:"PHOTO PRINT 4X4",
			id:"31",
			unitPrice:50,
			total:50,
			pack:12
		},
		{
			img:"/assets/images/default-crop.jpg",
			name:"MAGIC MUG",
			id:"32",
			unitPrice:420,
			total:420,
			pack:0
		},
		{
			img:"/assets/images/default-crop.jpg",
			name:"WHITE MUG",
			id:"33",
			unitPrice:220,
			total:220,
			pack:0
		}
	];

	$scope.cartQty = function(index,val) {
		console.log("val",index);
		if($scope.cartItems[index].quantity+val != 0) {
			$scope.cartItems[index].quantity += val;
			if(val > 0) {
				$scope.cartItems[index].total += $scope.cartItems[index].unitPrice;
			} else {
				$scope.cartItems[index].total -= $scope.cartItems[index].unitPrice;
			}
		}
		$scope.calculateTotal();
	};

	$scope.calculateTotal = function() {
		var sum=0;	
		$scope.cartItems.forEach(function(item){
			sum += item.total;
		});
		$scope.grandTotal = sum;
	};

	$scope.calculateTotal();

	$scope.removeCartItem = function(index) {
		var ans = confirm("Do you want to remove this Item from Cart?");
		if(ans) {
			$scope.cartItems.splice(index,1);
			$scope.calculateTotal();
		}	
	};

	$scope.cartAction = function() {
		if($scope.step2==false && $scope.step3==false) {
			$scope.step2 = true;
		} 
		else if($scope.step2==true && $scope.step3==false) {
			$scope.step2 = false;	
			$scope.step3 = true;
			$scope.cartNavBtn = "CHECKOUT";
		}
		else if ($scope.step3==true) {
			if($scope.payment) {
				$location.path('/');
			} else {
				alert("First select mode of payment");
			}
		}
	};

	$scope.addAddress = function(addr) {
		$scope.editAddress = true;
	};

	$scope.addrSelect = function(id) {
		$scope.addresses.forEach(function(item){
			if($scope.addr_selected[item._id]) {
				$scope.addr_selected[item._id]=false;
				return;
			} 
		});	
		$scope.addr_selected[id] = true;
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
