'use strict';

angular.module('mean.meanStarter').factory('ContactService', ['$http', 
	function ($http) {
	
	return {
		create: function (contact) {
			return $http.post('/api/contact', contact);
		},
		get: function () {
			return $http.get('/api/contact');
		},
		delete: function (id) {
			return $http.delete('/api/contact/' + id);
		}
	};
}]);