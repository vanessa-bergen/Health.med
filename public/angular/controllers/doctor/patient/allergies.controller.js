var nextChar = function(c){
    return String.fromCharCode(c.charCodeAt(0) + 1);
};

var initAlpha = function(model){
    model.alpha = [];
    var a = 'a';
    for (var i = 0; i < 26; i += 1){
        model.alpha.push(a);
        a = nextChar(a);
    }
};

angular.module('module_doctor')
.controller('ctrlr_patient_allergies'
, function($scope, $state, $stateParams, $uibModal, $http, ENDPOINT, httpPatient){

	
    // show probably be a service
    initAlpha($scope.model);

    $scope.model.newAllergy = {
        allergy : {
            symptoms : {}
        },
        addSymptom : function(symptom){
            if (symptom._id){
                $scope.model.newAllergy.allergy.symptoms[symptom._id] = symptom;
            }
            console.log(JSON.stringify($scope.model.newAllergy.allergy));
        },
        removeSymptom : function(symptom){
            if (symptom._id && $scope.model.newAllergy.allergy.symptoms[symptom._id]){
                delete $scope.model.newAllergy.allergy.symptoms[symptom._id];
            }
            console.log(JSON.stringify($scope.model.newAllergy.allergy));
        }
    };

    $scope.view = {};

    $scope.view.model = {
        showNewAllergy : false,
    };

    $scope.view.controller = {
        toggleNewAllergy : function(){
            console.log("toggleNewAllergy()");
            $scope.view.model.showNewAllergy = !$scope.view.model.showNewAllergy;
        }
    };
    $scope.http = {};
   	$scope.http.allergies = {
        add : function(newAllergy){
            console.log('http.allergies.add()');
            var list = [];
            for (var id in $scope.model.newAllergy.allergy.symptoms){
                console.log("  " + id);
                if ($scope.model.newAllergy.allergy.symptoms.hasOwnProperty(id)){
                    console.log("    " + id);
                    list.push(id);
                }
            }

            $scope.model.newAllergy.allergy.symptoms = list;
            console.log("    " + JSON.stringify($scope.model.newAllergy.allergy));

            $http.put(ENDPOINT + "/patient/allergy/add", $scope.model.newAllergy)
            .success(function(patient){
                console.log('http.allergies.add -> success');
                
                $scope.view.controller.toggleNewAllergy();
                $scope.model.patient = patient;
                $scope.model.newAllergy.allergy = {};
                $scope.model.newAllergy.allergy.symptoms = {};
            })
            .error(function(err){
                console.log('http.allergies.add -> error');
                console.log(JSON.stringify(err));
            });
        }
    }; 
    
    $scope.http.symptoms = {
        get : function(){
            console.log('http.symptoms.get()');

            $http.get(ENDPOINT + "/symptom?sort=true")
            .success(function(symptoms){
                console.log('http.symptoms.get -> success');

                $scope.model.symptoms = symptoms;
            })
            .error(function(err){
                console.log('http.symptoms.get() -> error');
                console.log(JSON.stringify(err));
            });
        }        
    };
    $scope.http.symptoms.get();
    console.log($scope.model.patient);
});
