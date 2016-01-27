console.log('ctrlr_prescription');

angular.module('module_patient')
.controller('ctrlr_prescription', function($scope, $http, $location, $window, 
ENDPOINT, httpDoctor, httpPatient){
    $scope.model = {};
    $scope.model.doctor = {};
    $scope.model.patient = {};

    $scope.view = {};
    $scope.view.model = {};
    $scope.view.model.current_view = 0;

    httpPatient.getMe().success(function(me){
        console.log('httpPatient.getMe -> success');
        $scope.model.patient = me;
    }).error(function(err){
        console.log('httpPatient.getMe -> error');
        console.log(JSON.stringify(err));
    });

    httpPatient.getPrescriptions().success(function(prescriptions){
        console.log('httpPatient.getPrescriptions -> success');
        $scope.model.patient.prescriptions = prescriptions;
        st = prescriptions[0];
         console.log(st);
        console.log(st._id);
    }).error(function(err){
        console.log('httpPatient.getPrescriptions -> error');
        console.log(JSON.stringify(err));
    });
    
});

console.log("prescription controller loaded");