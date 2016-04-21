
angular.module('cover4App', ['ionic', 'cover4App.controllers', 'cover4App.services']) 

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'views/menu.html',
        controller: 'AppCtrl'
    })
    
    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'views/home.html',
                controller: 'PoliciesCtrl'
            } 
        }
    })
    .state('app.home.policydetail', {
        url: '/policydetail/:pid',
        params: {
            pid: 0
        },
        views: {
            'menuContent@app': {
                templateUrl: 'views/policydetail.html',
                controller: 'PolicyDetailCtrl'
            }
        }
    })
    
    .state('app.studentinfo', {
        url: '/studentinfo',
        views: {
            'menuContent': {
                templateUrl: 'views/studentinfo.html'
            }
        }
    })
    
    .state('app.contact', {
        url: '/contact',
        views: {
            'menuContent': {
                templateUrl: 'views/contact.html'
            }
        }
    })
    
    $urlRouterProvider.otherwise('/app/home');
})