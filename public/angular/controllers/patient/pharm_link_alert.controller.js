console.log('ctrlr_pharm_link_alert');
angular.module('module_patient').controller('ctrlr_pharm_link_alert', function($scope, $uibModalInstance, pharm_link_w_endpoint, pharmLinkGen){
	$scope.pharm_link_w_endpoint = pharm_link_w_endpoint;
	$scope.pharmLinkGen = pharmLinkGen;

	$scope.ok = function(){
		$uibModalInstance.close(true);
	};
});

