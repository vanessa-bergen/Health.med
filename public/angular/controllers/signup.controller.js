console.log('ctrlr_signup');

angular.module('module_login')
.controller('ctrlr_signup', function($scope, $http, $location, $window, ENDPOINT){
    $scope.signup = {
        doctor : {},
        patient : {}
    };

    $scope.signupFailed = false;

    $scope.postSignup = function(body){
        $scope.signupFailed = false;

        if ($scope.account_type == 'patient'){
            $http.post(ENDPOINT + "/patient", body)
            .success(function(data){
                console.log('account creation is a GO!!!');
                $window.location.href = ENDPOINT + "/app/patient";
            })
            .error(function(error){
                console.log('post patient error: ' + JSON.stringify(error));
                $scope.signupFailed = true;
            });
        } else if ($scope.account_type == 'doctor') {
            $http.post(ENDPOINT + "/doctor", body)
            .success(function(data){
                console.log('doctor creation is also a GOogle');
                $window.location.href = ENDPOINT + "/app/doctor";
            })
            .error(function(error){
                console.log('post doctor error: ' + JSON.stringify(error));
                $scope.signupFailed = true;
            }); 
        }
    };
    
});
