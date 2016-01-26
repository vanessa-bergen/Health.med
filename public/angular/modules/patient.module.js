angular.module('module_patient', [
    'ngRoute'
    , 'ui.bootstrap'
    , 'module_config'
    , 'http_doctor'
    , 'http_patient'
    , 'module_basic_filters'
])
.config(function($routeProvider){
    $routeProvider.when('/messages', {
        templateUrl : "/views/patient/messages.html"
    });

    $routeProvider.when('/notifications', {
        templateUrl : "/views/patient/notifications.html"
    });

    $routeProvider.when('/invites', {
        templateUrl : "/views/patient/invites.html"
    });
    
    $routeProvider.when('/profile', {
        templateUrl : "/views/patient/profile.html"
    });

    $routeProvider.when('/allergies', {
        templateUrl : "/views/patient/allergies.html"
    });

    $routeProvider.when('/medications', { 
        templateUrl : "/views/patient/medications.html"
    });

    $routeProvider.when('/appointment_notes', {
        templateUrl : "/views/patient/appointment_notes.html"
    });

    $routeProvider.when('/conditions', {
        templateUrl : "/views/patient/conditions.html"
    });

    $routeProvider.when('/test_results', {
        templateUrl : "/views/patient/test_results.html"
    });

    $routeProvider.when('/prescriptions', { 
        templateUrl : "/views/patient/prescriptions.html"
    });

    $routeProvider.otherwise({
        templateUrl : "/views/patient/profile.html"
    });

});
