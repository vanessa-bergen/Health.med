console.log('module_doctor');

angular.module('module_doctor', [
    'ui.router',
    'module_config',
    'module_basic_filters'
])
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('invites', {
            url : "/invites",
            templateUrl : "views/doctor/invites"
        })
        .state('patients', {
            url : '/patients',
            templateUrl : "views/doctor/patients_list.html"
        })
        .state("search_patients", {
            url : '/search_patients',
            templateUrl : 'views/doctor/search_patients.html'
        })
        .state('state2.list', {
            url : '/list',
            templateUrl : "views/partials/state2.list.html",
            controller : function($scope){
                $scope.things = ["A", "Set", "Of", "things"];
            }
        });
});
