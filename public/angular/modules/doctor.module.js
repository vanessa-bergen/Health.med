console.log('module_doctor');

angular.module('module_doctor', [
    'ui.router'
    , 'ui.bootstrap'
    , 'module_config'
    , 'module_basic_filters'
    , 'http_doctor'
    , 'http_patient'
])
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('my_patients', {
            url : "/patients",
            templateUrl : "../views/doctor/my_patients/main.html"
        })
        .state('my_patients.list', {
            url : '/list',
            templateUrl : "../views/doctor/my_patients/list.html"
        })
        .state("my_patients.pending", {
            url : '/pending',
            templateUrl : '../views/doctor/my_patients/pending.html'
        })
        .state('my_patients.add', {
            url : '/add',
            templateUrl : "../views/doctor/my_patients/add.html" 
        });
});
