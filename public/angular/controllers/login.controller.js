console.log('ctrlr_login');

angular.module('module_login')
.controller('ctrlr_login', function($scope, $http, $location, $window, ENDPOINT){
    console.log("ENDPOINT = " + ENDPOINT);

    $scope.login = {};
    $scope.account_type = 'patient';

    $scope.loginFailed = false;

    $scope.postLogin = function(body){
        $scope.loginFailed = false;

        if ($scope.account_type == 'patient'){
            $http.post(ENDPOINT + "/patient/login", body)
            .success(function(data){
                if (data.logged_in){
                    console.log('logging in successful');
                    $window.location.href = ENDPOINT + "/patient";
                } else {
                    $scope.loginFailed = true;
                    console.log('patient logging in failed');
                }
            })
            .error(function(error){
                if (error){
                    console.log('post log in error: ' + JSON.stringify(error));
                }
                $scope.loginFailed = true;
            });
        } else if ($scope.account_type == 'doctor') {
            $http.post(ENDPOINT + '/doctor/login', body)
            .success(function(data){
                if (data.logged_in){
                    console.log('doctor logging in successful');
                    $window.location.href = ENDPOINT + "/doctor";
                } else {
                    $scope.loginFailed = true;
                    console.log('logging in failed');
                }
            })
            .error(function(error){
                console.log('post log in error: ' + JSON.stringify(error));
                $scope.loginFailed = true;
            });
        
        }
    };
});
