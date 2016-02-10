angular.module('module_doctor')
.controller('ctrlr_patient_prescriptions'
, function($scope, $state, $stateParams, $uibModal, httpDoctor){
	$scope.model = {};
	$scope.model.prescription = {};
	$scope.model.patient_prescriptions = [];
	$scope.controller = {};
	$scope.view = {};

	var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];
	var patient_id = $stateParams.patient_id;

	$scope.controller.getPatientPrescriptions = function(){
		httpDoctor.getPatientPrescriptions(patient_id).success(function(prescriptions){
            console.log('httpDoctor.getPrescriptions -> success');
            prescriptions = format_date(prescriptions);
            $scope.model.patient_prescriptions = prescriptions;
            console.log(JSON.stringify(prescriptions));
        }).error(function(err){
            console.log('httpDoctor.getPrescriptions -> error');
            console.log(JSON.stringify(err));
        });
    };
//todo = make this so that it doesn't run on the first time.
	$scope.controller.createPrescription = function(prescription){
		prescription.patient = patient_id;
		console.log(prescription);
		httpDoctor.createPrescription(prescription).success(function(createdprescription){
			console.log("httpDoctor.createPrescription -> success");
			console.log(JSON.stringify(createdprescription));
			$scope.controller.getPatientPrescriptions();
			$scope.model.prescription = {};
		}).error(function(err){
			console.log('httpDoctor.createPrescription -> error');
	        console.log(JSON.stringify(err));
		});
	};

	$scope.view.toggleShowNewPrescription = function(){
        $scope.view.showNewPrescription = !$scope.view.showNewPrescription;
    }
	$scope.controller.getPatientPrescriptions();

	var format_date = function(data){
		for(var i = 0; i < data.length; i++)
		{
			var date = new Date(data[i].date);
			var day = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();
			var formatted = day + ' ' + monthNames[monthIndex] + ' ' + year;
			data[i].date = formatted;
		}
		return data;
	};
});