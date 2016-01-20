console.log('ctrlr_patient');

angular.module('module_patient')
.controller('ctrlr_patient', function($scope, $http, $location, $window, ENDPOINT){
    $scope.view = {
        model : {
            logoutFailed : false
        }
    };

    // view controllers 
    var updateLogoutFailed = function(failed){
        $scope.view.model.logoutFailed = failed;
    }

    $scope.data = {};
    
    $scope.patient = {};

    $scope.deleteLogin = function(){
        updateLogoutFailed(false);

        $scope.deleteLogin = function(){
            console.log('deleteLogin()');
            $http.delete(ENDPOINT + "/patient/login")
            .success(function(data){
                console.log("Successful log out");
                $window.location.href = ENDPOINT; 
            })
            .error(function(error){
                updateLogoutFailed(true);

                console.log("Error logging out");
            });
        };
    }
});

console.log('patient controller loaded');
