console.log('ctrlr_recordAccess');

angular.module('module_patient')
.controller('ctrlr_recordAccess', function($scope, $http, $location, $window, 
ENDPOINT, httpDoctor, httpPatient){
    $scope.model = {};
    $scope.model.doctor = {};
    $scope.model.patient = {};

/*
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
*/
    
    httpPatient.getMe().success(function(me){
        console.log('httpPatient.getMe -> success');
        $scope.model.patient = me;

        console.log("length = " + $scope.model.patient.has_access_to.length);
    }).error(function(err){
        console.log('httpPatient.getMe -> error');
        console.log(JSON.stringify(err));
    });

    httpDoctor.getIndex().success(function(doctors){
        console.log("httpDoctor.getIndex -> success");
        $scope.model.doctor.list = doctors;
    }).error(function(err){
        console.log("httpDoctor.getIndex -> error");
        console.log(JSON.stringify(err));
    });
});

console.log("invite controller loaded");
