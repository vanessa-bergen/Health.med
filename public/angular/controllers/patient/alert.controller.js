angular.module('module_patient').controller('ctrlr_alert', function($scope, $uibModalInstance, doctor, accessAdded){
	$scope.doctor = doctor;
	$scope.accessAdded = accessAdded;

	$scope.ok = function(){
		$uibModalInstance.close(true);
	};
});