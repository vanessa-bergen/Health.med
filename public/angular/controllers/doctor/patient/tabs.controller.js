angular.module('module_doctor')
.controller('ctrlr_patient_tabs', function($scope, $state, $stateParams, httpPatient){
	$scope.model = {};

	$scope.view = {};
	$scope.view.model = {};

    var patient_id = $stateParams.patient_id;
    var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];


	$scope.view.controller = {
		getTabClass : function(i) {
			return i == $scope.view.model.currentView ? "active" : "";
		},
		setCurrentTab : function(i){
			$scope.view.model.currentView = i;
		},
	};

	var getPatient = function(patient_id){
		httpPatient.getById(patient_id).success(function(patient){
			$scope.model.patient = patient;

			var formatted_birthday = formatDate(patient.birthday);
			patient.birthday = formatted_birthday;

			console.log(patient);
		}).error(function(err){
			console.log("httpPatient.getById -> error");
			console.log(JSON.stringify(err));
		});
	};

	$scope.view.controller.setCurrentTab(-1);
	getPatient(patient_id);

	var formatDate = function(dateToBeFormatted){
		var date = new Date(dateToBeFormatted);
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var formatted = day + ' ' + monthNames[monthIndex] + ' ' + year;
		return formatted;
	};
});