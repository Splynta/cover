angular.module('cover4App', ['ionic','ionic.service.core', 'cover4App.controllers', 'cover4App.services', 'ngCordova', 'ngStorage']) 

.run(function($ionicPlatform, $ionicPopup, $http, $cordovaPush, $rootScope, Notifications) {
    $ionicPlatform.ready(function() {
        /*if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }*/
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        // If connected to the internet send push notification token to add to the database
        if(window.Connection) {
            if(navigator.connection.type != Connection.NONE) {
                var push = new Ionic.Push({
                    "debug": true,
                    "onNotification": function(notification) {
                        var note = {
                            read: false,
                            title: notification.title,
                            message: notification.text
                        }
                        
                        Notifications.add(note);
                        $rootScope.$apply();
                        $rootScope.$broadcast("unreadCountChange");
                        $ionicPopup.alert({ title: 'New Notification', content: notification.text});
                    }
                });

                var deviceToken = null;
                push.register(function(token) {
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
            }
        }
        
        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            if (notification.alert) {
                navigator.notification.alert(notification.alert);
            }
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
        url: '/policydetail/:id',
        params: {
            id: 0
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
                templateUrl: 'views/studentinfo.html',
                controller: 'StudentInfoCtrl'
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
    
    .state('app.notifications', {
        url: '/notifications',
        views: {
            'menuContent': {
                templateUrl: 'views/notifications.html',
                controller: 'NotificationCtrl'
            }
        }
    })
    
    $urlRouterProvider.otherwise('/app/home');
})