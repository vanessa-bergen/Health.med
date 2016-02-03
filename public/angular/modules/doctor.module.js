console.log('module_doctor');

angular.module('module_doctor', [
    'ui.router',
    'module_config',
    'module_basic_filters', 
    'http_doctor',
    'http_patient'
])
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('patients', {
            url : "/patients",
            templateUrl : "../views/doctor/patients/main.html"
        })
        .state('patients.list', {
            url : '/list',
            templateUrl : "../views/doctor/patients/list.html"
        })
        .state("patients.pending", {
            url : '/pending',
            templateUrl : '../views/doctor/patients/pending.html'
        })
        .state('patients.add', {
            url : '/add',
            templateUrl : "../views/doctor/patients/add.html" 
        });
});
