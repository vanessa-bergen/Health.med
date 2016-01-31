console.log('ctrlr_profile');

angular.module('module_patient')
.controller('ctrlr_profile', function($scope, $http, $location, $window, ENDPOINT, httpPatient){
    $scope.hello = "Profile"; 
	
	$scope.model = {};
	$scope.model.profile = {};
	
	
	httpPatient.getMe().success(function(me){
		console.log('httpPatient.getMe -> success');
		$scope.model.profile.patient = me;
	})
		.error(function(err){
		console.log('httpPatient.getMe -> error');
        console.log(JSON.stringify(err));	
	});
});

