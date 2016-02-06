angular.module('module_doctor')
.controller('ctrlr_my_patients', function($scope, $http, $location, $window
, $uibModal, ENDPOINT, httpDoctor, httpPatient){

    var accessRequestedAlert = '' +
    '<div class="modal-header">' +
        '<h3 ng-show="accessRequested" class="modal-title">Medical Records Access Requested</h3>' +
        '<h3 ng-hide="accessRequested" class="modal-title">Medical Records Access Request Cancelled</h3>' +
    '</div>' +
    '<div class="modal-body">' +
        '<p ng-show="accessRequested">Access to {{ patient.name_first + " " + patient.name_last + apostropheS(patient.name_last) }} medical records has been requested.</p>' +
        '<p ng-hide="accessRequested">Your request to access {{ patient.name_first + " " + patient.name_last + apostropheS(patient.name_last) }} medical records has been cancelled.</p>' +
    '</div>' +
    '<div class="modal-footer">' +
        '<button class="btn btn-primary" type="button" ng-click="ok()">OK</button>' +
    '</div>';

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
        },
        openAccessRequestedAlert : function(patient, accessRequested){
            $uibModal.open({
                animation : true,
                template : accessRequestedAlert,
                controller : 'ctrlr_request_access_alert',
                resolve : {
                    patient : function() {
                        return patient;
                    },
                    accessRequested : function() {
                        return accessRequested;
                    }
                }
            });
        }
	}

	$scope.goToPatient = function(patient_id){
		console.log('goToPatient(' + patient_id + ')');
	}

	$scope.queryPatient = function(query){
		httpPatient.queryPatient(query).success(function(patients){
            console.log('httpPatient.queryPatient -> success');

            // filter patients that doctor already has access to

            
            // filter patients that doctor already requested access to
            var hash = {};
            for (var i = 0; i < $scope.model.doctor.me.pending.length; i += 1){
                hash[$scope.model.doctor.me.pending[i]._id] = true; 
            }
            for (var i = 0; i < patients.length; i += 1){
                var accessPending = hash[patients[i]._id] ? true : false;
                patients[i].accessPending = accessPending; 
            }

            $scope.model.patient.queryResults = patients;
		}).error(function(err){
            console.log('httpPatient.queryPatient -> error');
            console.log(JSON.stringify(err));
		});
	};

    $scope.requestAccess = function(patient_id){
        httpPatient.access.put(patient_id).success(function(patient){
            console.log('httpPatient.access.put -> success');

            // update query results patients to see pending sent
            for (var i = 0; i < $scope.model.patient.queryResults.length; i += 1){
                if ($scope.model.patient.queryResults[i]._id == patient._id){
                    $scope.model.patient.queryResults[i].accessPending = true;
                }
            }

            $scope.view.controller.openAccessRequestedAlert(patient, true);
            getMe();
        }).error(function(err){
            console.log('httpPatient.access.put -> error');
            console.log(JSON.stringify(err));
        });
    };

    $scope.cancelAccessRequest = function(patient_id){
        httpPatient.access.delete(patient_id).success(function(patient){
            console.log('httpPatient.access.delete -> success');

            // update query results patients to see pending sent
            for (var i = 0; i < $scope.model.patient.queryResults.length; i += 1){
                if ($scope.model.patient.queryResults[i]._id == patient._id){
                    $scope.model.patient.queryResults[i].accessPending = false;
                }
            }

            $scope.view.controller.openAccessRequestedAlert(patient, false);
            getMe();
        }).error(function(err){
            console.log('httpPatient.access.delete -> error');
            console.log(JSON.stringify(err));
        });
    }

    var getMe = function(){
        httpDoctor.getMe().success(function(doctor){
            console.log('httpDoctor.getMe -> success');
            $scope.model.doctor.me = doctor;
        }).error(function(err){
            console.log('httpDoctor.getMe -> error');
            console.log(JSON.stringify(err));
        });
    };

    getMe();
});
