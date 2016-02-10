console.log('ctrlr_prescription');

angular.module('module_patient')
.controller('ctrlr_prescription', function($scope, $http, $location, $window, 
$uibModal, $timeout, ENDPOINT, httpDoctor, httpPatient){

    var pharmacy_link_generated_alert= '' +
    '<div class="modal-header">' +
        '<h3 ng-show="pharmLinkGen" class="modal-title">Pharmacy Link Generated</h3>' +
    '</div>' +
    '<div class="modal-body">' +
        '<p>New Pharmacy Link Generated. The link will remain active for 24 hours. {{ pharm_link_w_endpoint }}</p>' +
    '</div>' +
    '<div class="modal-footer">' +
        '<button class="btn btn-primary" type="button" ng-click="ok()">OK</button>' +
    '</div>';
    
    $scope.model = {};
    $scope.model.doctor = {};
    $scope.model.patient = {};
    $scope.model.pharmacy_link ={};
    
    $scope.controller = {};
    
    $scope.view = {};
    $scope.view.model = {};

    httpPatient.getMe().success(function(me){
        console.log('httpPatient.getMe -> success');
        $scope.model.patient = me;

        httpPatient.getPrescriptions().success(function(prescriptions){
            console.log('httpPatient.getPrescriptions -> success');
            $scope.model.patient.prescriptions = prescriptions;
            console.log(JSON.stringify(prescriptions));
        }).error(function(err){
            console.log('httpPatient.getPrescriptions -> error');
            console.log(JSON.stringify(err));
        });
    }).error(function(err){
        console.log('httpPatient.getMe -> error');
        console.log(JSON.stringify(err));
    });
   
    $scope.controller.createPharmaryLink = function(prescription_id){
      httpPatient.pharmacy_link.post(prescription_id).success(function(newPharmacyLink){
        console.log('httpPatient.pharmacy_link.post -> success');
        $scope.model.pharmacy_link = newPharmacyLink;
        
        console.log(JSON.stringify(newPharmacyLink));
        var pharm_link_w_endpoint = ENDPOINT + newPharmacyLink.pharmacy_link_url;
        
        console.log(pharm_link_w_endpoint);
        $scope.controller.openPharmacyLinkGenAlert(pharm_link_w_endpoint, true)
      }).error(function(err){
        console.log('httpPatient.pharmacy_link.post -> failure');
        console.log(JSON.stringify(err));
      });
  };
  $scope.controller.openPharmacyLinkGenAlert = function(pharm_link_w_endpoint, pharmLinkGen){
        $uibModal.open({
            animation : true, 
            template : pharmacy_link_generated_alert,
            controller :'ctrlr_pharm_link_alert',
            resolve : {
                pharm_link_w_endpoint : function(){
                    return pharm_link_w_endpoint;
                }, 
                pharmLinkGen : function(){
                    return pharmLinkGen
                }
            }

        });
    };   
});

console.log("prescription controller loaded");