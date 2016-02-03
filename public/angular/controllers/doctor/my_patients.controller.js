angular.module('module_doctor')
.controller('ctrlr_my_patients', function($scope, $http, $location, $window
, $uibModal, ENDPOINT, httpDoctor, httpPatient){

	$scope.model = {};
	$scope.model.patient = {};

	$scope.view = {};
	$scope.view.model = {};
	$scope.view.model.currentView = -1;

	$scope.view.controller = {
		getTabClass : function(i){
			return i == $scope.view.model.currentView ? "active" : "";
		},
		setCurrentTab : function(i){
			$scope.view.model.currentView = i;
		}
	}

});