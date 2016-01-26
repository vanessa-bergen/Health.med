angular.module('module_patient', [
    'ui.router'
    , 'module_config'
    , 'http_doctor'
    , 'http_patient'
    , 'module_basic_filters'
])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/profile');

    $stateProvider
        .state('invites', { // TODO -> change 'invites' to 'record_access'
            url : "/invites",
            templateUrl : "../views/patient/invites.html"
        })
        .state("invites.list", {
            url : "/list",
            templateUrl : "../views/patient/record_access/list.html"
        })
        .state("invites.add", {
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
        .state("medications", {
            url : "/medications",
            templateUrl : "../views/patient/medications.html"
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

