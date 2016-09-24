/*----------------------
  @Author - Shoeb Raza <mail@shoebraza.com>  
  @Version - v1.0
----------------------*/

angular.module('uploadCtrl',['flow'])
.controller('uploadController', function($scope,Photo,Customize,Auth,$http,$location,$stateParams,Product) {
    
    $scope.product = Product.getDetailsById($stateParams.sid);

    $scope.photos = [];
    $scope.user = [];
    $scope.selectPhotos = [];
    $scope.pics_select = [];

    //selection config
    $scope.pics_total = $scope.product.product_config[0].packSize;
    $scope.pics_selected = 0;
    $scope.enContinue = true;
    $scope.nextPageMsg = "Select photos to continue";

    //get user photos
    Photo.getLinks().then(function(res) {
      console.log(res);
        $scope.photos = res.data;
    });

    //authenticate user to get user detail
    Auth.getUser().then(function(res){
      $scope.user = res.data;  
    });

    //go to next page
    $scope.next = function() {
        if(!$scope.enContinue) {
          Customize.saveSelection($stateParams.sid,$scope.selectPhotos,$scope.product);
          $location.path('/customize/'+$stateParams.sid); 
        }
    };

    //select photo  
    $scope.addPics = function(index,photo) {
      photo.data = {x:0,y:0,angle:0};

      if($scope.pics_selected == ($scope.pics_total-1)) {
          $scope.enContinue = false;
          $scope.pics_select[index]++;
          $scope.pics_selected++;
          photo.data; 
          $scope.selectPhotos.push(photo); 
          Materialize.toast('go to next page', 2000, 'rounded');
          $scope.nextPageMsg = "Click next to continue";
      }
      else if($scope.pics_selected >= $scope.pics_total) {
          return;
      } else {
          $scope.enContinue = true;
          $scope.pics_select[index]++;
          $scope.pics_selected++;
          photo.data; 
          $scope.selectPhotos.push(photo);
          $scope.nextPageMsg = "Add "+($scope.pics_total-$scope.pics_selected)+" more photos to continue";
      }
    };

    //find value by id in obj array
    var indexData = function(arrObj,value) {
      for (var key in arrObj) {
          if(arrObj[key]._id==value) {
              return key;
          }
      }
    };

    //remove photo
    $scope.removePics = function(index,data) {
      $scope.pics_select[index]--; 
      $scope.pics_selected--;
      $scope.selectPhotos.splice(indexData($scope.selectPhotos,index),1); 
      if($scope.pics_selected < $scope.pics_total) {
          $scope.enContinue = true;
      } 
      $scope.nextPageMsg = "Add "+($scope.pics_total-$scope.pics_selected)+" more photos to continue";
    };

    //deselect all photos
    $scope.deselect = function() {
      $scope.pics_selected=0;
      $scope.photos.forEach(function(item) {
          $scope.pics_select[item._id] = 0;
          $scope.selectPhotos = [];
      });
      $scope.enContinue = true;
      $scope.nextPageMsg = "Select photos to continue";
    };

    //select all photos
    $scope.select = function() {
      var totPhoto = $scope.photos.length;
      if(tot < 1) {
        return;
      }
      var i=0;
      while($scope.pics_selected < $scope.pics_total) {
         i = i%totPhoto; 
         $scope.addPics($scope.photos[i]._id,$scope.photos[i]);
         i++;  
      }
  
    };
    
    $scope.fileSuccess = function(x,y,z) { 
      $http.post('/api/v1/uploader/confirm', {
          identifier: x.uniqueIdentifier,
          filename: x.name
      })
      .success(function(res) {
         if(res.success) {   
           $scope.photos.push(res.data);
         }  
      });      
    };

    Customize.getSelection($stateParams.sid).then(function(res){
        if(res.data.success) {
          res.data.result.selection.forEach(function(item) {
              $scope.addPics(item._id,item);
          });
        }
    });

            
})
.config(['flowFactoryProvider', function (flowFactoryProvider) {

    flowFactoryProvider.defaults = {
      target: '/api/v1/uploader',
      permanentErrors: [500, 501],
      maxChunkRetries: 2,
      simultaneousUploads:5
    };
    // flowFactoryProvider.on('catchAll', function (event) {
    //   console.log('catchAll', arguments);
    // });

}]);