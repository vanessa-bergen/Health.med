console.log('ctrlr_patient');

angular.module('module_patient')
.controller('ctrlr_patient', function($scope, $http, $location, $window, ENDPOINT){
    $scope.deleteLogin = function(){
        $scope.loginFailed = false;

        $scope.deleteLogin = function(){
            console.log('deleteLogin()');
            $http.delete(ENDPOINT + "/patient/login")
            .success(function(data){
                console.log("Successful log out");
                $window.location.href = ENDPOINT; 
            })
            .error(function(error){
                console.log("Error logging out");
            });
        };
    }
});

console.log('patient controller loaded');
