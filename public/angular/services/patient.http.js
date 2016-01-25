angular.module('http_patient')
.factory('httpPatient', function($http, ENDPOINT){
	var base = ENDPOINT + "/patient";
	return {
		getIndex : function(){
			return $http.get(base + "/index");
		},
		getMe : function(){
			return $http.get(base + "/me");
		}
	}
});