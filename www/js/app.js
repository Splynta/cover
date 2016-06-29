angular.module('cover4App', ['ionic','ionic.service.core', 'cover4App.controllers', 'cover4App.services', 'ngCordova', 'ngStorage']) 

.run(function($ionicPlatform, $ionicPopup, $ionicHistory, $http, $cordovaPush, $cordovaBadge, $rootScope, Notifications, StudentInfo) {
    var pushnote = null;
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
                            message: notification._raw.message,
                            timestamp: notification._payload.timestamp
                        }
                        
                        // If when called the notification has not been added to the list
                        // then add it to the list
                        if(!Notifications.isDuplicate(note)) {
                            Notifications.add(note);
                            if(notification._raw.additionalData.foreground) {
                                $ionicPopup.alert({ title: 'Notification Received', content: notification.text});
                                if($ionicHistory.currentStateName() == 'app.notifications') {
                                    Notifications.markAllRead();
                                }
                            }
                        }
                        
                        if(Notifications.getUnreadCount() && $cordovaBadge.hasPermission()) {
                            $cordovaBadge.set(Notifications.getUnreadCount());
                        }
                        
                        $rootScope.$apply();
                        $rootScope.$broadcast("unreadCountChange");
                    },
                    "pluginConfig": { 
                        "android":{
                            "icon":"c4icon",
                            "iconColor": "black"
                        },
                        "ios": {
                            "badge": true,
                            "sound": true,
                            "alert":true
                        }
                    } 
                });

                /*push.register(function(token) {
                    push.saveToken(token);  // persist the token in the Ionic Platform

                    // Send token to url to save to the database table
                    var url = "http://www.standard.dacaninternet.co.uk/registertoken.php";
                    var post = $http({
                        method: 'POST',
                        url: url,
                        data: {
                            token: token.token
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    });
                });*/
                
                // If app is resumed on the notifications page then mark all as read and refresh unread count
                document.addEventListener('resume', function() {
                    if($ionicHistory.currentStateName() == 'app.notifications') {
                        Notifications.markAllRead();
                        $cordovaBadge.clear();
                        $rootScope.$broadcast("unreadCountChange");
                    }
                });
            }
        }
        
        StudentInfo.populateFileInfo();
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
    
    .state('app.studentinfo.details', {
        url: '/studentinfo/details/:id',
        views: {
            'menuContent@app': {
                templateUrl: 'views/studentinfodetails.html',
                controller: 'StudentInfoDetailsCtrl'
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

.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])