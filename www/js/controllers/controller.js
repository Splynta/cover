angular.module('cover4App.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
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