console.log("Welcome to Health.med");

angular.module('module_login', [
    'ui.router', 
    'module_config'
])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('signup', {
            url : "/signup",
            templateUrl : '/views/signup.html'
        })
        .state('for_patients', {
            url : "/for_patients",
            templateUrl : '/views/for_patients.html'
        })
        .state('for_doctors', {
            url : "/for_doctors",
            templateUrl : '/views/for_doctors.html'
        })
        .state('login', {
            url : '/login',
            templateUrl : '/views/login.html'
        });

    // $routeProvider.when('/signup', {
    //     templateUrl : "/views/signup.html"
    // });

    // $routeProvider.when('/for_patients', {
    //     templateUrl : "/views/for_patients.html"
    // });

    // $routeProvider.when('/for_doctors', {
    //     templateUrl : "/views/for_doctors.html"
    // });

    // $routeProvider.otherwise({
    //     templateUrl : "/views/login.html"
    // });
});

