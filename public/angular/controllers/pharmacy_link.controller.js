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

    
    httpPharmLink.getCurrentPharmLink().success(function(pharm_link){
        console.log('httpPharmLink.getCurrentPharmLink -> success');
        $scope.model.pharmacy_link = pharm_link;
        console.log(pharm_link);
        console.log(JSON.stringify($scope.model.pharmacy_link));
    }).error(function(err){
        console.log('httpPharmLink.getCurrentPharmLink -> error');
        console.log(JSON.stringify(err));
    });
    
});