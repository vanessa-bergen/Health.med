angular.module('module_patient', [
    'ui.router'
    , 'ui.bootstrap'
    , 'module_config'
    , 'http_doctor'
    , 'http_patient'
    , 'http_pharm_link'
    , 'module_basic_filters'

])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/profile');

    $stateProvider
        .state('record_access', { 
            url : "/record_access",
            templateUrl : "../views/patient/record_access/main.html"
        })
        .state("record_access.list", {
            url : "/list",
            templateUrl : "../views/patient/record_access/list.html"
        })
        .state("record_access.new_requests", {
            url : "/new_requests",
            templateUrl : "../views/patient/record_access/new_requests.html"
        })
        .state("record_access.add", {
            url : "/add",
            templateUrl : "../views/patient/record_access/add.html"
        })
        .state("profile", {
            url : "/profile",
            templateUrl : "../views/patient/profile.html"
        })
        .state("allergies", {
            url : "/allergies",
            templateUrl : "../views/patient/allergies.html"
        })
        .state("test_results", {
            url : "/test_results",
            templateUrl : "../views/patient/test_results.html"
        })
        .state("prescriptions", {
            url : "/prescriptions",
            templateUrl : "../views/patient/prescriptions.html"
        });
});


    // $routeProvider.when('/invites', {
    //     templateUrl : "/views/patient/invites.html"
    // });
    
    // $routeProvider.when('/profile', {
    //     templateUrl : "/views/patient/profile.html"
    // });

    // $routeProvider.when('/allergies', {
    //     templateUrl : "/views/patient/allergies.html"
    // });

    // $routeProvider.when('/medications', { 
    //     templateUrl : "/views/patient/medications.html"
    // });

    // $routeProvider.when('/test_results', {
    //     templateUrl : "/views/patient/test_results.html"
    // });

    // $routeProvider.when('/prescriptions', { 
    //     templateUrl : "/views/patient/prescriptions.html"
    // });

    // $routeProvider.otherwise({
    //     templateUrl : "/views/patient/profile.html"
    // });

// - - - - - Not going to do anymore for now - - - - -
/*  
    $routeProvider.when('/messages', {
        templateUrl : "/views/patient/messages.html"
    });

    $routeProvider.when('/notifications', {
        templateUrl : "/views/patient/notifications.html"
    });

    $routeProvider.when('/appointment_notes', {
        templateUrl : "/views/patient/appointment_notes.html"
    });

    $routeProvider.when('/conditions', {
        templateUrl : "/views/patient/conditions.html"
    });
*/
// - - - - - - - - - - - - - - - - - - - - - - - - - - 

