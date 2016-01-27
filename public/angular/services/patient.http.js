angular.module('http_patient')
.factory('httpPatient', function($http, ENDPOINT){
	var base = ENDPOINT + "/patient";
	return {
		getIndex : function(){
			return $http.get(base + "/index");
		},
		getMe : function(){
			return $http.get(base + "/me");
		},
		deleteLogin : function(){
			return $http.delete(base + "/login");
		},
		getPrescriptions : function(){
			return $http.get(base + "/getPrescription")
		}	
	}
});