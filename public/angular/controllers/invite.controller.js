console.log('ctrlr_invite');


angular.module('module_patient')
.controller('ctrlr_invite', function($scope, $http, $location, $window, ENDPOINT){

    $scope.http = {};

    $scope.model = {};

    $scope.http.patient = {

        get : function(){
            console.log('http.patient.get()');
            $http.get(ENDPOINT + "/patient/me")
            .success(function(res){
                console.log("http.patient.get -> success");
                $scope.model.patient = res.patient;
            })
            .error(function(){
                console.log("http.patient.get -> failure");
            });
        }
    };

    $scope.http.patient.get();

    $scope.http.patient.cancel_invite = {
       delete : function(){
            console.log('http.patient.cancel_invite()');
            $http.get(ENDPOINT + '/patient/cancel_invite')
            .success(function(res){
                console.log("http.patient.cancel_invite -> success");              
                $scope.model.patient = res.patient; 
            })
            .error(function(){
                console.log("http.patient.cancel_invite -> failure");
            });
       }
    };
            

});
console.log("invite controller loaded");
