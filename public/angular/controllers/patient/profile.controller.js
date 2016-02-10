console.log('ctrlr_profile');

angular.module('module_patient')
.controller('ctrlr_profile', function($scope, $http, $location, $window, ENDPOINT, httpPatient){
    $scope.hello = "Profile"; 
	
	$scope.disabled= true;
	
	$scope.model = {};
	$scope.model.profile = {};

	var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];

	
	httpPatient.getMe().success(function(me){
		console.log('httpPatient.getMe -> success');
		var formatted_date = formatDate(me.birthday);	
		me.birthday = formatted_date;
		$scope.model.profile.patient = me;
		console.log(JSON.stringify(me));
	})
		.error(function(err){
		console.log('httpPatient.getMe -> error');
        console.log(JSON.stringify(err));	
	});
	
	$scope.edit = (function(body){
		$scope.disabled = false;
		console.log('Field Ready for Edit');
		
	});
	$scope.http = {};
	$scope.http.profile = {
        save : function(body){
            console.log('http.profile.save()'); 
					
		$http.put(ENDPOINT + "/patient/edit", (JSON.stringify(body)))
		 .success(function(body){
        console.log('http.profile.save -> sucess');
       	var formatted_date = formatDate(body.birthday);
       	body.birthday = formatted_date;
		$scope.model.profile.patient = body;
        
		})
		.error(function(error){
            console.log('put patient error: ' + JSON.stringify(error));
            $scope.saveFailed = true;
            }); 
		$scope.disabled = true;
		}
	}; 

	var formatDate = function(dateToBeFormatted){
		var date = new Date(dateToBeFormatted);
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var formatted = day + ' ' + monthNames[monthIndex] + ' ' + year;
		return formatted;
	};
});

