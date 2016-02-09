angular.module('module_doctor').controller('ctrlr_request_access_alert'
, function($scope, $uibModalInstance, patient, accessRequested){
	$scope.patient = patient;
	$scope.accessRequested = accessRequested;

	$scope.ok = function(){
		$uibModalInstance.close(true);
	};

	$scope.apostropheS = function(name){
		return (name.charAt(name.length - 1) == "s" ? "'" : "'s");
	};
});