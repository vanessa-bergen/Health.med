console.log('ctrlr_recordAccess');

angular.module('module_patient')
.controller('ctrlr_recordAccess', function($scope, $http, $location, $window, 
ENDPOINT, httpDoctor, httpPatient){
    $scope.model = {};
    $scope.model.doctor = {};
    $scope.model.doctor.queryParams = {};
    $scope.model.doctor.query = {};
    $scope.model.doctor.queryResults = {};
    $scope.model.patient = {};

    $scope.view = {};
    $scope.view.model = {};
    $scope.view.model.current_view = 0;

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
        }
    };

    $scope.queryDoctor = function(queryParams){
        httpDoctor.queryDoctor(queryParams).success(function(results){
            console.log('httpDoctor.queryDoctor -> success');
            $scope.model.doctor.queryResults = results;

            console.log(JSON.stringify(results));
        }).error(function(err){
            console.log('httpDoctor.queryDoctor -> error');
            console.log(JSON.stringify(err));
        });
    };

    $scope.addAccessTo = function(doctor_id){
        httpDoctor.access.put(doctor_id).success(function(results){
            console.log('httpDoctor.addAccessTo -> success');
            console.log(JSON.stringify(results));
        }).error(function(err){
            console.log('httpDoctor.addAccessTo -> error');
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
    
    httpPatient.getMe().success(function(me){
        console.log('httpPatient.getMe -> success');
        $scope.model.patient = me;
        console.log("length = " + $scope.model.patient.has_access_to.length);
    }).error(function(err){
        console.log('httpPatient.getMe -> error');
        console.log(JSON.stringify(err));
    });

    httpDoctor.getHasAccessToMe().success(function(doctors){
        $scope.model.doctor.hasAccessToMe = doctors;
        console.log('httpDoctor.getHasAccessToMe -> success');
    }).error(function(err){
        console.log("httpDoctor.getHasAccessToMe -> error");
        console.log(JSON.stringify(err));
    });

    httpDoctor.getIndex().success(function(doctors){
        console.log("httpDoctor.getIndex -> success");
        $scope.model.doctor.index = doctors;
    }).error(function(err){
        console.log("httpDoctor.getIndex -> error");
        console.log(JSON.stringify(err));
    });
});

console.log("invite controller loaded");
