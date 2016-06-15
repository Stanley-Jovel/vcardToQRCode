'use strict';

angular.module('mean.meanStarter').factory('ContactService', ['$http', 
	function ($http) {
	
	return {
		create: function (contact) {
			return $http.post('/api/contact', contact);
		},
		get: function (id) {
			return $http.get('/api/contact/' + id);
		},
		delete: function (id) {
			return $http.delete('/api/contact/' + id);
		}
	};
}]);