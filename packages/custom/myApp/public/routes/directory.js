'use strict';

angular.module('mean.meanStarter').config(['$meanStateProvider',
	function ($meanStateProvider) {
	
	//states for directory
	$meanStateProvider
		.state('directory', {
			url: '/directory',
			templateUrl: 'meanStarter/views/directory/index.html',
			authenticate: true,
		});
}]);