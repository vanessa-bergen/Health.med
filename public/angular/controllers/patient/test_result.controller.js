console.log('ctrlr_test_result');

angular.module('module_patient')
.controller('ctrlr_test_result', function($scope, $stateParams
, ENDPOINT, httpDoctor, httpPatient){

	$scope.model = {};
    $scope.model.patient = {};
    $scope.model.test_result = {};
    
    $scope.controller = {};
    
    $scope.view = {};
    $scope.view.model = {};
    $scope.model.data = [[],[],[],[],[]];
    $scope.labels = [];
    $scope.series = ['Red Blood Cell Count', 'Hemoglobin', 'Hemotocrit', 'White Blood Cell Count', 'Platelet'];
    
    var patient_id = $stateParams.patient_id;

    var setupTestResults = function(test_results){
        console.log
        $scope.model.patient.test_results  = test_results;
        for(var i = 0; i < $scope.model.patient.test_results.length; i++){
            $scope.labels[i] = $scope.model.patient.test_results[i].date;
            $scope.model.data[0][i] = $scope.model.patient.test_results[i].red_blood_cell_count;
            $scope.model.data[1][i] = $scope.model.patient.test_results[i].hemoglobin;
            $scope.model.data[2][i] = $scope.model.patient.test_results[i].hemotocrit;
            $scope.model.data[3][i] = $scope.model.patient.test_results[i].white_blood_cell_count;
            $scope.model.data[4][i] = $scope.model.patient.test_results[i].platelet_count;
        };
    };
        
    $scope.colours = [{ // grey
        fillColor: 'rgba(148,159,177,0.2)',
        strokeColor: 'rgba(148,159,177,1)',
        pointColor: 'rgba(148,159,177,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,177,0.8)'
    }, { // dark grey
        fillColor: 'rgba(77,83,96,0.2)',
        strokeColor: 'rgba(77,83,96,1)',
        pointColor: 'rgba(77,83,96,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(77,83,96,1)'
    }];

    var getTestResults = function(){
        if (patient_id){
            httpPatient.test_results.get(patient_id).success(function(test_results){
                console.log('httpPatient.test_results.get -> success');
                setupTestResults(test_results);
            }).error(function(err){
                console.log("httpPatient.test_results.get -> error");
                console.log(JSON.stringify(err));
            });
        } else {
            console.log('accessed from patient');
            httpPatient.getMe().success(function(me){
                console.log('httpPatient.getMe -> success');
                $scope.model.patient = me;
                patient_id = $scope.model.patient._id;
                console.log($scope.model.patient);
                
                httpPatient.test_results.get($scope.model.patient._id).success(function(test_results){
                    console.log('httpPatient.test_results.get -> success');
                    setupTestResults(test_results);
                }).error(function(err){
                    console.log('httpPatient.test_results.get -> error');
                    console.log(JSON.stringify(err));
                });
            }).error(function(err){
                console.log('httpPatient.getMe -> error');
                console.log(JSON.stringify(err));
            });
        }
    };

    getTestResults();

    // $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // $scope.data = [
    //   [65, 59, 80, 81, 56, 55, 40],
    //   [28, 48, 40, 19, 86, 27, 90]
    // ];

    // $scope.randomize = function () {
    //   $scope.data = $scope.data.map(function (data) {
    //     return data.map(function (y) {
    //       y = y + Math.random() * 10 - 5;
    //       return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
    //     });
    //   });
    // };
});

