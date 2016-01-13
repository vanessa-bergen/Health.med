console.log("Welcome to Health.med");

angular.module('module_login', ['ngRoute', 'module_config'])
.config(function($routeProvider){
    $routeProvider.when('/signup', {
        templateUrl : "/views/signup.html"
    });

    $routeProvider.when('/for_patients', {
        templateUrl : "/views/for_patients.html"
    });

    $routeProvider.when('/for_doctors', {
        templateUrl : "/views/for_doctors.html"
    });

    $routeProvider.otherwise({
        templateUrl : "/views/login.html"
    });
});

