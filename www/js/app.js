angular.module('cover4App', ['ionic','ionic.service.core', 'cover4App.controllers', 'cover4App.services', 'ngCordova']) 

.run(function($ionicPlatform, $http) {
    $ionicPlatform.ready(function() {
        /*if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }*/
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        // Setup Ionic push notifications
        var push = new Ionic.Push({
            "debug": true
        });
        var deviceToken = null;
        push.register(function(token) {
            console.log("My Device token:",token.token);
            push.saveToken(token);  // persist the token in the Ionic Platform
            
            // Send token to url to save to database table
            var url = "http://www.standard.dacaninternet.co.uk/registertoken.php";
            var post = $http({
                method: 'POST',
                url: url,
                data: {
                    token: token.token
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            post.success(function(data) {
                console.log('http post success'); 
            });
        });
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