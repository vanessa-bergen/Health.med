console.log('ctrlr_profile_doctor');

angular.module('module_doctor')
.controller('ctrlr_profile_doctor', function($scope, $http, $location, $window, ENDPOINT, httpDoctor){
	
$scope.model = {};
$scope.model.doctor = {};

httpDoctor.getMe().success(function(me){
		console.log('httpDoctor.getMe -> success');
		$scope.model.doctor = me;
		console.log(JSON.stringify(me));
	})
		.error(function(err){
		console.log('httpDoctor.getMe -> error');
        console.log(JSON.stringify(err));	
	});
});