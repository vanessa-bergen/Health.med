angular.module('http_patient')
.factory('httpPatient', function($http, ENDPOINT){
	var base = ENDPOINT + "/patient";
	return {
		queryPatient : function(queryParams){
			return $http.get(base, {
				params : queryParams
			});
		},
		getById : function(patient_id){
			return $http.get(base + "/id/" + patient_id);
		},
		getMe : function(){
			return $http.get(base + "/me");
		},
		deleteLogin : function(){
			return $http.delete(base + "/login");
		},
		getPrescriptions : function(){
			return $http.get(base + "/getPrescription");
		},
		pharmacy_link : {
			post : function(prescription_id){
				return $http.post(base + "/pharmacy_link", {
					"prescription_id" : prescription_id
				});
			}		
		},
		test_results : {
			get : function(patient_id){
				return $http.get(ENDPOINT + "/testresult/patient_id/" + patient_id);
	        },
	        post : function(patient_id, test_result){
	        	return $http.post(ENDPOINT + "/testresult/" + patient_id, test_result);
	        }
	    },
		access : {
			put : function(patient_id){
				return $http.put(base + "/access/" + patient_id);
			},
			delete : function(patient_id){
				return $http.delete(base + "/access/" + patient_id);
			}
		}
	}
});
