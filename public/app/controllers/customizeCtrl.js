/*----------------------
    @Author - Shoeb Raza <mail@shoebraza.com>    
    @Version - v1.0
----------------------*/

angular.module('customizeCtrl',['imageCropper'])
.controller('customizeController', ['$scope','Customize','Auth','$http','$location','$stateParams', function($scope,Customize,Auth,$http,$location,$stateParams) {  

    $scope.user = [];
    $scope.photos = [];
    $scope.loader=false;
    $scope.save_process = "SAVE";
    
    //authenticate user to get user detail
    Auth.getUser().then(function(res){
      $scope.user= res.data;  
    });

    //get customized data
    Customize.getSelection($stateParams.sid).then(function(res){
      $scope.photos = res.data.result.selection; 
      $scope.product = res.data.result.product;
      $scope.config_height = 250*($scope.product.product_config[0].photo_height/$scope.product.product_config[0].photo_width);
      $scope.printBorder = $scope.product.product_config[0].isBorder || '15'; 
      $scope.borderColor = $scope.product.product_config[0].borderColor || "hsl(0,0%,100%)";
    });

    //save current state
    $scope.save = function() {
        $scope.save_process = "SAVING...";
        $scope.product.product_config[0].isBorder = $scope.printBorder;
        $scope.product.product_config[0].borderColor = $scope.borderColor; 
        Customize.saveSelection($stateParams.sid,$scope.photos,$scope.product).then(function(res){
            $scope.save_process = "SAVED";
        });
    };

    //image border settings
    $scope.changeBorder = function(h,s,l) {
        $scope.borderColor = "hsl("+h+","+s+"%,"+l+"%)"; 
        $scope.save_process = "SAVE";
    }

    $scope.addCart = function(){
        $scope.product.product_config[0].isBorder = $scope.printBorder;
        $scope.product.product_config[0].borderColor = $scope.borderColor; 
        Customize.saveSelection($stateParams.sid,$scope.photos,$scope.product).then(function(res){
            $location.path('/cart');
        });
    };

    // $scope.croppedImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

    // $scope.showCropper = function(index,photo) {
    //     $scope.cropApi.add(photo.mediumPhoto,$scope.product.product_config[0]);
    //     $scope.current_index = index;
    //     $scope.isCrop = true;
    //     $scope.loader = true;
    // };

    // $scope.closeCrop = function(){
    //     $scope.isCrop=false;
    //     $scope.loader=false;
    // };
        
    // $scope.updateResultImage = function(data) {
    //     //$scope.photos[$scope.current_index].thumbPhoto = base64;
    //     // $scope.photos[$scope.current_index].data = data;
    //     // $scope.$apply(); // Apply the changes.
    //     // $scope.save_process = "SAVE";
    //     //console.log("data",data);
    // };

    $scope.findClass = function(pic) {
        return (pic.data.degrees%180==0)?(pic.height>pic.width):(pic.height<pic.width); 
    };
          
}]);