console.log('ctrlr_recordAccess');

angular.module('module_patient')
.controller('ctrlr_recordAccess', function($scope, $http, $location, $window, 
$uibModal, ENDPOINT, httpDoctor, httpPatient){
    var access_added_alert = '' +
    '<div class="modal-header">' +
        '<h3 ng-show="accessAdded" class="modal-title">Medical Records Access Granted</h3>' +
        '<h3 ng-hide="accessAdded" class="modal-title">Medical Records Access Revoked</h3>' +
    '</div>' +
    '<div class="modal-body">' +
        '<p ng-show="accessAdded">Access to your medical records has been granted to Dr. {{ doctor.name_first + " " + doctor.name_last }}.</p>' +
        '<p ng-hide="accessAdded">Dr. {{ doctor.name_first + " " + doctor.name_last }}\'s access to your medical records has been revoked. Access can be granted back at any time.</p>' +
    '</div>' +
    '<div class="modal-footer">' +
        '<button class="btn btn-primary" type="button" ng-click="ok()">OK</button>' +
    '</div>';

    $scope.model = {};
    $scope.model.doctor = {};
    $scope.model.doctor.queryParams = {};
    $scope.model.doctor.query = {};
    $scope.model.doctor.queryResults = {};
    $scope.model.patient = {};

    $scope.view = {};
    $scope.view.model = {};
    $scope.view.model.current_view = -1; 

    $scope.view.controller = {
        getTabClass : function(i){
            return i == $scope.view.model.current_view ? "active" : "";
        },
        setCurrentView : function(i){
            $scope.view.model.current_view = i;
        },
        isQueryEnabled : function(){ 
            if (!$scope.model.doctor.queryParams.name_first && 
                !$scope.model.doctor.queryParams.name_last){
                return false;
            
            } else if ($scope.model.doctor.queryParams.name_first &&
                       $scope.model.doctor.queryParams.name_last){
                if (!angular.isUndefined($scope.model.doctor.query.name_first) && !angular.isUndefined($scope.model.doctor.query.name_last)){
                    return $scope.model.doctor.query.name_first.length >= 1 &&
                            $scope.model.doctor.query.name_last.length >= 1;
                } else {
                    return false;
                }
            } else if ($scope.model.doctor.queryParams.name_first){
                if (!angular.isUndefined($scope.model.doctor.query.name_first)){
                    return $scope.model.doctor.query.name_first.length >= 1;
                } else {
                    return false;
                }  
            } else if (!angular.isUndefined($scope.model.doctor.query.name_last)){
                return $scope.model.doctor.query.name_last.length >= 1;
            } else {
                return false;
            }
        },
        openAccessChangedAlert : function(doctor, accessAdded){
            $uibModal.open({
                animation : true, 
                template : access_added_alert,
                controller : 'ctrlr_alert',
                resolve : {
                    doctor : function(){
                        return doctor;
                    }, 
                    accessAdded : function(){
                        return accessAdded
                    }
                }

            });
        }
    };

    $scope.queryDoctor = function(queryParams){
        httpDoctor.queryDoctor(queryParams).success(function(results){
            console.log('httpDoctor.queryDoctor -> success');
            
            // see which doctors have access or not
            var hash = {};
            for (var i = 0; i < $scope.model.doctor.hasAccessToMe.length; i += 1){
                hash[$scope.model.doctor.hasAccessToMe[i]._id] = true;
            }

            for (var i = 0; i < results.length; i += 1){
                console.log(results[i].name_first + " " + hash[results[i]._id]);
                results[i].hasAccessToMe = hash[results[i]._id] ? true : false; 
            }
            // end 

            $scope.model.doctor.queryResults = results;

            console.log(JSON.stringify(results));
        }).error(function(err){
            console.log('httpDoctor.queryDoctor -> error');
            console.log(JSON.stringify(err));
        });
    };

    $scope.addAccessTo = function(doctor_id){
        httpDoctor.access.put(doctor_id).success(function(resDoctor){
            console.log('httpDoctor.access.add -> success');

            // update query results doctors
            for (var i = 0; i < $scope.model.doctor.queryResults.length; i += 1){
                if ($scope.model.doctor.queryResults[i]._id == resDoctor._id){
                    $scope.model.doctor.queryResults[i].hasAccessToMe = true;
                }
            }

            $scope.view.controller.openAccessChangedAlert(resDoctor, true);
            getMe();
        }).error(function(err){
            console.log('httpDoctor.access.add -> error');
            console.log(JSON.stringify(err));
        });
    }

    $scope.revokeAccessTo = function(doctor_id){
        httpDoctor.access.delete(doctor_id).success(function(resDoctor){
            console.log('httpDoctor.access.delete -> success');
            
            // update doctors that hasAccessTo
            for (var i = 0; i < $scope.model.doctor.hasAccessToMe.length; i += 1){
                if ($scope.model.doctor.hasAccessToMe[i]._id == resDoctor._id){
                    $scope.model.doctor.hasAccessToMe.splice(i, 1);
                    break;
                }
            }

            // update query results doctors
            for (var i = 0; i < $scope.model.doctor.queryResults.length; i += 1){
                if ($scope.model.doctor.queryResults[i]._id == resDoctor._id){
                    $scope.model.doctor.queryResults[i].hasAccessToMe = false;
                }
            }

            $scope.view.controller.openAccessChangedAlert(resDoctor, false);
        }).error(function(err){
            console.log('httpDoctor.access.delete -> error');
            console.log(JSON.stringify(err));
        });
    }

    var getMe = function(){
        httpPatient.getMe().success(function(me){
            console.log('httpPatient.getMe -> success');
            $scope.model.patient = me;
        }).error(function(err){
            console.log('httpPatient.getMe -> error');
            console.log(JSON.stringify(err));
        });
    }

    var getHasAccessToMe = function(){
        httpDoctor.getHasAccessToMe().success(function(doctors){
            $scope.model.doctor.hasAccessToMe = doctors;
            console.log('httpDoctor.getHasAccessToMe -> success');
        }).error(function(err){
            console.log("httpDoctor.getHasAccessToMe -> error");
            console.log(JSON.stringify(err));
        });
    }

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
    
    getMe();
    getHasAccessToMe();
    
});

console.log("invite controller loaded");
