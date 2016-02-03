console.log('ctrlr_doctor');

angular.module('module_doctor')
.controller('ctrlr_doctor', function($scope, $http, $location, $window, ENDPOINT){
    $scope.view = {
        getClass : function(path){
            if ($location.path().substr(0, path.length) === path){
                return 'active';
            } else {
                return '';
            }
        }
    };
});
