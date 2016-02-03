console.log('ctrlr_doctor');

angular.module('module_doctor')
.controller('ctrlr_doctor', function($scope, $http, $location, $window
, ENDPOINT, httpDoctor){
    
    $scope.deleteLogin = function(){
    	httpDoctor.login.delete().success(function(data){
    		console.log("Successful log out");
    		$window.location.href = ENDPOINT;
    	}).error(function(){
            console.log("Error logging out");
    	});
    }
});
