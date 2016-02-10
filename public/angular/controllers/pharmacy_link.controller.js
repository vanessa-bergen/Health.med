console.log('ctrlr_pharmacy_link');

angular.module('module_pharm_link')
.controller('ctrlr_pharmacy_link', function($scope, $http, $location, $window, ENDPOINT, 
	httpPharmLink){

	$scope.model = {};
    $scope.model.doctor = {};
    $scope.model.patient = {};
    $scope.model.pharmacy_link ={};
    
    $scope.controller = {};
    
    $scope.view = {};
    $scope.view.model = {};
    
    var monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];

    
    httpPharmLink.getCurrentPharmLink().success(function(pharm_link){
        console.log('httpPharmLink.getCurrentPharmLink -> success');
        var formatted_date = formatDate(pharm_link.prescription_id.date);
        pharm_link.prescription_id.date = formatted_date;
        var formatted_birthday = formatDate(pharm_link.prescription_id.patient.birthday);
        pharm_link.prescription_id.patient.birthday = formatted_birthday;
        $scope.model.pharmacy_link = pharm_link;
        console.log(pharm_link);
        console.log(JSON.stringify($scope.model.pharmacy_link));
    }).error(function(err){
        console.log('httpPharmLink.getCurrentPharmLink -> error');
        console.log(JSON.stringify(err));
    });
    
    var formatDate = function(dateToBeFormatted){
        var date = new Date(dateToBeFormatted);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var formatted = day + ' ' + monthNames[monthIndex] + ' ' + year;
        return formatted;
    };
});