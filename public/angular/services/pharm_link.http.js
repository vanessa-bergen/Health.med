angular.module('http_pharm_link')
.factory('httpPharmLink', function($http, ENDPOINT){
	var base = ENDPOINT + "/pharmacy_link";

	return {
		getCurrentPharmLink : function(){
			return $http.get(base + "/current");
		}
	}
});