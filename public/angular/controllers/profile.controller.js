console.log('ctrlr_profile');

angular.module('module_patient')
.controller('ctrlr_profile', function($scope, $http, $location, $window, ENDPOINT){
    $scope.hello = "profile";    
});
