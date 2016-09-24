

angular.module('app.routes',['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to notfound page
   $urlRouterProvider.otherwise("/notfound");

  // set up routes
   $stateProvider
    .state('home', {
      url: '/',
      views:{
        "headerView": {templateUrl: "/app/views/header.html"},
        "contentView": {
            templateUrl: "/app/views/pages/home.html",
            controller : "homeController"
        },
        "footerView": {templateUrl: "/app/views/footer.html"}
      },
      navType : "home"
    })
    .state('products', {
      url: '/products',
      views:{
        "headerView": {templateUrl: "/app/views/header.html"},
        "contentView": {
            templateUrl: "/app/views/pages/product-list.html",
            controller : 'productlistController'
        },
        "footerView": {templateUrl: "/app/views/footer.html"}
      }
    })
    .state('product', {
      url: '/product/:productName',
      views:{
        "headerView": {templateUrl: "/app/views/header.html"},
        "contentView": {
            templateUrl: "/app/views/pages/product.html",
            controller : 'productController'
        },
        "footerView": {templateUrl: "/app/views/footer.html"}
      }
    })
    .state('selection', {
      url: '/selection/:sid',
      views:{
        contentView:{templateUrl: "/app/views/pages/uploader.html",controller : 'uploadController'}
      }
    })
    .state('customize', {
      url: '/customize/:sid',
      views:{
        contentView:{templateUrl: "/app/views/pages/customize.html",controller : 'customizeController'}
      }
    })
    .state('cart', {
      url: '/cart',
      views:{
        contentView:{templateUrl: "/app/views/pages/cart.html",controller : 'cartController'}
      }
    })
    .state('login', {
      url: '/login',
      views:{
        "headerView": {templateUrl: "/app/views/header.html"},
        "contentView": {
            templateUrl: "/app/views/pages/login.html",
            controller : 'loginController'
        },
        "footerView": {templateUrl: "/app/views/footer.html"}
      }
    })
    .state('account', {
      url: '/account',
      views:{
        "headerView": {templateUrl: "/app/views/header.html"},
        "contentView": {
            templateUrl: "/app/views/pages/account.html",
            controller : 'accountController'
        },
        "footerView": {templateUrl: "/app/views/footer.html"}
      }
    })
    .state('notfound', {
      url: '/notfound',
      views:{
        "headerView": {templateUrl: "/app/views/header.html"},
        "contentView": {
            templateUrl: "/app/views/pages/home.html"
        },
        "footerView": {templateUrl: "/app/views/footer.html"}
      } 
    })
    .state('contact', {
      url: '/contact',
      views:{
        "headerView": {templateUrl: "/app/views/header.html"},
        "contentView": {
            templateUrl: "/app/views/pages/static/contact.html"
        },
        "footerView": {templateUrl: "/app/views/footer.html"}
      } 
    })
    .state('jobs', {
      url: '/jobs',
      views:{
        "headerView": {templateUrl: "/app/views/header.html"},
        "contentView": {
            templateUrl: "/app/views/pages/static/jobs.html"
        },
        "footerView": {templateUrl: "/app/views/footer.html"}
      }
    });

});
