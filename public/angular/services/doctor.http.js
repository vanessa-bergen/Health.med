angular.module("http_doctor")
.factory("httpDoctor", function($http, ENDPOINT){
	var base = ENDPOINT + "/doctor";
	return {
		getIndex : function(){ 
			return $http.get(base);
		},
		invite_add : function(){
			return $http.put(base + "/invite/add");
		},
		cancel_invite : function(patient_id){
			return $http.delete(base + "/cancel_invite/" + patient_id);
		},
		getHasAccessToMe : function(){
			return $http.get(base + "/access/me");
		}
	}
});