angular.module('cover4App.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
})

.controller('PoliciesCtrl', function($scope, Policies) {
    $scope.policies = Policies.getAll();
})

.controller('PolicyDetailCtrl', function($scope, $stateParams, Policies) {
    $scope.policy = Policies.get($stateParams.id);
})