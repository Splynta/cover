angular.module('cover4App.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, Notifications) {
    $scope.unreadCount = Notifications.getUnreadCount();
    
    $scope.$on("unreadCountChange", function() {
        /*if($ionicSideMenuDelegate.isOpenLeft()) {
            $ionicSideMenuDelegate.toggleLeft();
        }*/
        $scope.unreadCount = Notifications.getUnreadCount();
    });
})

.controller('PoliciesCtrl', function($scope, Policies) {
    $scope.policies = Policies.getAll();
    
    $scope.loadUrl = function(id) {
        var policy = Policies.get(id);
        window.open(policy.href, '_system');
    };
})

.controller('PolicyDetailCtrl', function($scope, $stateParams, Policies) {
    $scope.policy = Policies.get($stateParams.id);
})

.controller('AppCheckCtrl', function($scope) {
    $scope.loadTwitter = function(link) {
        var scheme;
        if (device.platform === 'iOS') {
            scheme = 'twitter://';
        } else {
            scheme = 'com.twitter.android';
        }
        
        appAvailability.check(
            scheme,
            function() { // success
                window.open('twitter://user?screen_name=' + link, '_system', 'location=no');
            },
            function() {
                window.open('https://www.twitter.com/' + link, '_system', 'location=no');
            }
        );
    };
    
    $scope.loadFacebook = function(link) {
        var scheme;
        if (device.platform === 'iOS') {
            scheme = 'fb://';
        } else {
            scheme = 'com.facebook.katana';
        }
        appAvailability.check(
            scheme,
            function() { // success
                window.open('fb://facewebmodal/f?href=https://www.facebook.com/' + link, '_system', 'location=no');
            },
            function() {
                window.open('https://www.facebook.com/' + link, '_system', 'location=no');
            }
        );
    };
})

.controller('NotificationCtrl', function($scope, $rootScope, Notifications) {
    $scope.$on('$ionicView.enter', function () {
        Notifications.markAllRead();
        $rootScope.$broadcast("unreadCountChange");
    });
    
    $scope.list = Notifications.getAll(); 
    
    $scope.clearList = function() {
        Notifications.clear();
        $scope.list = Notifications.getAll();
    };
})

.controller('StudentInfoCtrl', function($scope) {
    $scope.links = [
        { title: 'Security Tips: While You\'re Away', href: 'http://www.cover4insurance.com/security-while-away/' },
        { title: 'Living in a Privately Rented Student House', href: 'http://www.cover4insurance.com/private-student-house/'},
        { title: 'Top 5 Security Tips from Greater Manchester Police Twitter Chat', href: 'http://www.cover4insurance.com/top-5-safety-tips-twitter/'},
        { title: 'Safety Advice: On a Night Out', href: 'http://www.cover4insurance.com/night-out-safety-tips/'},
        { title: 'Student Security Tips—Ireland', href: 'http://www.cover4insurance.com/irish-student-security-tips'}
    ];
    
    $scope.openLink = function(link) {
        window.open(link, '_system', 'location=no');
    };
})