console.log('ctrlr_allergy');

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

angular.module('module_patient')
.controller('ctrlr_allergy', function($scope, $http, $location, $window, ENDPOINT){
    $scope.model = {};

    // show probably be a service
    initAlpha($scope.model);
    
/* TODO -> Suggested allergies
    $scope.model.allergies = [
        {
            "name" : "bandanas",
        }, {
            "name" : "aligators"
        }, {
            "name" : "ant-eaters" 
        }, {
            "name" : "bobsledding"
        }
    ];
*/
   
    $scope.model.patient = {};

    $scope.model.newAllergy = {
        allergy : {}    
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

    $scope.http = {
        patient : {
            get : function(){
                console.log('patient.get()');

                $http.get(ENDPOINT + "/patient/me")
                .success(function(res){
                    console.log("    patient.get -> success");
                    console.log(JSON.stringify(res.patient));

                    $scope.model.patient = res.patient;
                })
                .error(function(){
                    console.log("    patient.get -> failure");                        
                });
            },
            allergies : {
                add : function(newAllergy){
                    console.log('patient.allergy.add()');
                    
                    $http.put(ENDPOINT + "/patient/allergy/add", $scope.model.newAllergy)
                    .success(function(patient){
                        console.log('    patient.allergies.add -> success');
                        
                        $scope.view.controller.toggleNewAllergy();
                        $scope.model.patient = patient;
                    })
                    .error(function(err){
                        console.log('    patient.allergies.add -> error');
                        console.log(JSON.stringify(err));
                    });
                }
            }, 
        }
    };

    $scope.http.patient.get();
});

console.log('allergy controller loaded');
