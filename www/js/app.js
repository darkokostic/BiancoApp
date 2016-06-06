// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngStorage', 'ionic-zoom-view'])

.run(function($ionicPlatform, $localStorage, $rootScope, $http) {
  //navigator.splashscreen.hide();
  $rootScope.featureFavorite = false;

  $http.get('http://b-nero.com/app/public/api/extras', {
     headers: {}
     })
  .then(function(response) {
      if(response.data[0].fav == 1) {
          $rootScope.featureFavorite = true;
      }
      $rootScope.loadTabs = true;
  });

  $ionicPlatform.ready(function() {
    if($localStorage.favorites == undefined) {
        $localStorage.favorites = [];
    }
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
        url: '/home',
        views: {
          'home-tab': {
              templateUrl: 'templates/home.html',
              controller: 'HomeCtrl'
          }
        }
    })

    .state('tabs.shop', {
        url: '/shop',
        views: {
          'shop-tab': {
              templateUrl: 'templates/shop.html',
              controller: 'ShopCtrl'
          }
        }
    })

    .state('tabs.shop-sub-categories', {
        url: '/shop-sub-categories/:shopCatID',
        views: {
          'shop-tab': {
              templateUrl: 'templates/shop-sub-categories.html',
              controller: 'ShopSubCategoriesCtrl'
          }
        }
    })

    .state('tabs.shop-single-view', {
      url: '/shop-single-view/:id',
      views: {
        'shop-tab': {
            templateUrl: 'templates/shop-single-view.html',
            controller: 'ShopSingleViewCtrl'
        }
      }
    })

    .state('tabs.gallery', {
        url: '/gallery',
        views: {
          'gallery-tab': {
              templateUrl: 'templates/gallery.html',
              controller: 'GalleryCtrl'
          }
        }
    })

    .state('tabs.our-designs', {
      url: '/our-designs',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/our-designs.html',
            controller: 'OurDesignsCtrl'
        }
      }
    })

    .state('tabs.homes', {
      url: '/our-designs/homes',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/homes.html',
            controller: 'HomesCtrl'
        }
      }
    })

    .state('tabs.companies', {
      url: '/our-designs/companies',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/companies.html',
            controller: 'CompaniesCtrl'
        }
      }
    })

    .state('tabs.offices', {
      url: '/our-designs/offices',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/offices.html',
            controller: 'OfficesCtrl'
        }
      }
    })

    .state('tabs.other-designs', {
      url: '/other-designs',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/other-designs.html',
            controller: 'OtherDesignsCtrl'
        }
      }
    })

    .state('tabs.gallery-sub-category', {
      url: '/gallery-sub-category/:id',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/gallery-sub-category.html',
            controller: 'GallerySubCategoryCtrl'
        }
      }
    })

    .state('tabs.insiteProject-sub-category', {
      url: '/insiteProject-sub-category/:id',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/insiteProject-sub-category.html',
            controller: 'InsiteProjectSubCategoryCtrl'
        }
      }
    })

    .state('tabs.finishedProjects-sub-category', {
      url: '/finishedProjects-sub-category/:id',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/finishedProjects-sub-category.html',
            controller: 'FinishedProjectsSubCategoryCtrl'
        }
      }
    })

    .state('tabs.projects-insite', {
      url: '/projects-insite',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/projects-insite.html',
            controller: 'ProjectsInsiteCtrl'
        }
      }
    })

    .state('tabs.finished-projects', {
      url: '/finished-projects',
      views: {
        'gallery-tab': {
            templateUrl: 'templates/finished-projects.html',
            controller: 'FinishedProjectsCtrl'
        }
      }
    })

    .state('tabs.contact', {
        url: '/contact',
        views: {
          'contact-tab': {
              templateUrl: 'templates/contact.html',
              controller: 'ContactCtrl'
          }
        }
    })

    .state('tabs.favorites', {
        url: '/favorites',
        views: {
          'favorites-tab': {
              templateUrl: 'templates/favorites.html',
              controller: 'FavoritesCtrl'
          }
        }
    })

    .state('tabs.about', {
        url: '/about',
        views: {
          'about-tab': {
              templateUrl: 'templates/about.html',
              controller: 'AboutCtrl'
          }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

})
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})
.directive('onFinishRender', function ($timeout) {
 return {
     restrict: 'A',
     link: function (scope, element, attr) {
         if (scope.$last === true) {
             $timeout(function () {
                 scope.$emit('ngRepeatFinished');
             });
         }
     }
 }
});
