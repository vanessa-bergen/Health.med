console.log('ctrlr_test_result');

angular.module('module_patient')
.controller('ctrlr_test_results', function($scope, $stateParams
, ENDPOINT, httpDoctor, httpPatient){

    $scope.model = {};
    $scope.model.patient = {};
    $scope.model.test_result = {};
    
    $scope.controller = {};
    
    $scope.view = {};
    $scope.view.model = {};

    // chart models
    $scope.model.data = [[],[],[],[],[]];
    $scope.labels = [];
    $scope.series = ['Red Blood Cell Count', 'Hemoglobin', 'Hemotocrit', 'White Blood Cell Count', 'Platelet'];

    var patient_id = $stateParams.patient_id;

    // start: should be the same as patient/test_results.controller.js
    var setupTestResults = function(test_results){
        $scope.model.patient.test_results = test_results;
        for(var i = 0; i < $scope.model.patient.test_results.length; i++){
            $scope.labels[i] = $scope.model.patient.test_results[i].date;
            $scope.model.data[0][i] = $scope.model.patient.test_results[i].red_blood_cell_count;
            $scope.model.data[1][i] = $scope.model.patient.test_results[i].hemoglobin;
            $scope.model.data[2][i] = $scope.model.patient.test_results[i].hemotocrit;
            $scope.model.data[3][i] = $scope.model.patient.test_results[i].white_blood_cell_count;
            $scope.model.data[4][i] = $scope.model.patient.test_results[i].platelet_count;
        };
    };
    
    var transparent = 'rgba(0, 0, 0, 0)';
    var red = 'rgba(255, 0, 0, 1)';
    var redLight = 'rgba(255, 127, 127, 1)';
    var green = 'rgba(0, 255, 0, 1)'
    var greenLight = 'rgba(127, 255, 127, 1)';
    var orange = 'rgba(255, 127, 0, 1)';
    var orangeLight = 'rgba(255, 191, 127, 1)';
    var grey = 'rgba(120, 130, 140, 1)';
    var greyLight = 'rgba(180, 190, 200, 1)';
    var brown = 'rgba(104, 53, 32, 1)';
    var brownLight = 'rgba(231, 180, 159, 1)';

    $scope.colours = [
    { // Red Blood Cell Count
        fillColor: transparent,
        strokeColor: red,
        pointColor: red,
        pointStrokeColor: red,
        pointHighlightFill: redLight,
        pointHighlightStroke: redLight
    }, { // Hemoglobin
        fillColor: transparent,
        strokeColor: green,
        pointColor: green,
        pointStrokeColor: green,
        pointHighlightFill: greenLight,
        pointHighlightStroke: greenLight
    }, { // Hemotocrit
        fillColor: transparent,
        strokeColor: orange,
        pointColor: orange,
        pointStrokeColor: orange,
        pointHighlightFill: orangeLight,
        pointHighlightStroke: orangeLight
    }, { // White Blood Cell Count
        fillColor: transparent,
        strokeColor: grey,
        pointColor: grey,
        pointStrokeColor: grey,
        pointHighlightFill: greyLight,
        pointHighlightStroke: greyLight
    }, { // Platelet
        fillColor: transparent,
        strokeColor: brown,
        pointColor: brown,
        pointStrokeColor: brown,
        pointHighlightFill: brownLight,
        pointHighlightStroke: brownLight
    }];
    // end: same

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

    // same as in doctor/patient/test_results.controller.js
    $scope.view.getChartClass = function(){
        return "col-sm-12";
    }

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

