/*----------------------
  @Author - Shoeb Raza <mail@shoebraza.com>  
  @Version - v1.0
----------------------*/

angular.module('cropDir',[])

.directive('cropper', ['$document',function($document) {
  return {
    restrict: 'E',
    bindToController:true,
    scope: {
      image: '=',	
      width: '@',
      height: '@'
    },
    controller:function() {
    	this.pic = this.image.thumbPhoto || '/assets/images/default-crop.jpg';
    },
    controllerAs: 'vm',
    templateUrl: '/app/directives/templates/cropper.html',
    'link': function(scope, element, attr) {
    	
      var self = scope.vm;
		  var orientation=false;

    	var photo = element[0].getElementsByClassName('cropper-image')[0];
    	
      init();

	    function setTransform(transform) {
        element.css('-ms-transform', transform);
        element.css('-webkit-transform', transform);
        element.css('-moz-transform', transform);
        element.css('transform', transform);
      }
      
      function init() {
        fixOrientation();
        photo.style.left = self.image.data.x+ 'px';
        photo.style.top =  0;//-self.image.data.y+'px';
      }

    	function fixOrientation() {
	    	orientation = (self.image.data.angle%180==0)?(self.image.height<self.image.width):(self.image.height>self.image.width); 
	    	if(orientation) {
	    		photo.style.height = '100%';
	    		photo.style.width = 'auto';
	    	} else {
	    		photo.style.height = 'auto';
	    		photo.style.width = '100%';
	    	}
    	}

    	var startX = 0, startY = 0, x = 0, y = 0;
      	element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
	        event.preventDefault();
	        startX = event.pageX - self.image.data.x;
	        startY = event.pageY - self.image.data.y;
	        $document.on('mousemove', mousemove);
	        $document.on('mouseup', mouseup);
      	});

      	function mousemove(event) {
	        y = event.pageY - startY;
	        x = event.pageX - startX;

	        console.log("wid",self.image.data.x,self.image.data.y);

    		self.image.data.x = ((self.width-x) < photo.offsetWidth)? ((x < 0)?x:0) : -(photo.offsetWidth-self.width); 
    		self.image.data.y = ((self.height-y) < photo.offsetHeight)? ((y < 0)?y:0) : -(photo.offsetHeight-self.height);

			if(orientation) {
				photo.style.left = self.image.data.x+ 'px';
			} else {
				photo.style.top = -self.image.data.y+'px';
			}

    }

		function mouseup() {
			scope.$apply();

			$document.off('mousemove', mousemove);
			$document.off('mouseup', mouseup);
		}

		scope.vm.rotate = function(degree) {

		  self.image.data.angle = (self.image.data.angle+degree)%360;

		  fixOrientation();
		  
		  photo.style.transform = 'rotate(' + self.image.data.angle + 'deg)';
		  photo.style.webkitTransform = 'rotate(' + self.image.data.angle + 'deg)';
		  photo.style.mozTransform = 'rotate(' + self.image.data.angle + 'deg)';
		  photo.style.msTransform = 'rotate(' + self.image.data.angle + 'deg)';
		  photo.style.oTransform = 'rotate(' + self.image.data.angle + 'deg)';
		};

    }
  };
}]);