angular.module('module_doctor')
.controller('ctrlr_my_patients', function($scope, $http, $location, $window
, $uibModal, ENDPOINT, httpDoctor, httpPatient){

	$scope.model = {};
	
	$scope.model.patient = {};
	$scope.model.patient.queryParams = {};
	$scope.model.patient.query = {};
	$scope.model.patient.queryResults = {};

	$scope.model.doctor = {};

	$scope.view = {};
	$scope.view.model = {};
	$scope.view.model.currentView = -1;

	$scope.view.controller = {
		getTabClass : function(i){
			return i == $scope.view.model.currentView ? "active" : "";
		},
		setCurrentTab : function(i){
			$scope.view.model.currentView = i;
		}
	}

	$scope.goToPatient = function(patient_id){
		console.log('goToPatient(' + patient_id + ')');
	}

    httpDoctor.getMe().success(function(doctor){
        console.log('httpDoctor.getMe -> success');
        $scope.model.doctor.me = doctor;
    }).error(function(err){
        console.log('httpDoctor.getMe -> error');
        console.log(JSON.stringify(err));
    });
});
