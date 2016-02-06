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
		},
        isQueryEnabled : function(){ 
            if (!$scope.model.patient.queryParams.name_first && 
                !$scope.model.patient.queryParams.name_last){
                return false;
            
            } else if ($scope.model.patient.queryParams.name_first &&
                       $scope.model.patient.queryParams.name_last){
                if (!angular.isUndefined($scope.model.patient.query.name_first) && !angular.isUndefined($scope.model.doctor.query.name_last)){
                    return $scope.model.patient.query.name_first.length >= 1 &&
                            $scope.model.patient.query.name_last.length >= 1;
                } else {
                    return false;
                }
            } else if ($scope.model.patient.queryParams.name_first){
                if (!angular.isUndefined($scope.model.patient.query.name_first)){
                    return $scope.model.patient.query.name_first.length >= 1;
                } else {
                    return false;
                }  
            } else if (!angular.isUndefined($scope.model.patient.query.name_last)){
                return $scope.model.patient.query.name_last.length >= 1;
            } else {
                return false;
            }
        },
        hasSecondaryPhone : function(patient){
        	var isUndefined = angular.isUndefined(patient.phone_number.secondary);
        	return isUndefined;
        }
	}

	$scope.goToPatient = function(patient_id){
		console.log('goToPatient(' + patient_id + ')');
	}

	$scope.queryPatient = function(query){
		httpPatient.queryPatient(query).success(function(patients){
            console.log('httpPatient.queryPatient -> success');

            // filter patients that doctor already has access to

            $scope.model.patient.queryResults = patients;
		}).error(function(err){
            console.log('httpPatient.queryPatient -> error');
            console.log(JSON.stringify(err));
		});
	};

    httpDoctor.getMe().success(function(doctor){
        console.log('httpDoctor.getMe -> success');
        $scope.model.doctor.me = doctor;
    }).error(function(err){
        console.log('httpDoctor.getMe -> error');
        console.log(JSON.stringify(err));
    });
});
