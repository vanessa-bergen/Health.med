angular.module("http_doctor")
.factory("httpDoctor", function($http, ENDPOINT){
	var base = ENDPOINT + "/doctor";
	return {
		getMe : function(){
			return $http.get(base + "/me");
		},
		getHasAccessToMe : function(){
			return $http.get(base + "/access/me");
		},
		queryDoctor : function(queryParams){
			return $http.get(base, {
				params : queryParams,
			});
		},
		access : {
			put : function(doctor_id){
				return $http.put(base + "/access/" + doctor_id);
			},
			delete : function(doctor_id){
				return $http.delete(base + "/access/" + doctor_id);
			}
		},
		login : {
			delete : function(){
				return $http.delete(base + "/login");
			}
		},
		createPrescription : function(body) {
			console.log(body);
			return $http.post(ENDPOINT + "/prescription", body);
		},
		getPatientPrescriptions : function(patient_id){
			return $http.get(ENDPOINT + "/prescription/" + patient_id);
		}
	}
});
