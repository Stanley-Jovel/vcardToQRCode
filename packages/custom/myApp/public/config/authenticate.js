'use strict';

angular.module('mean.meanStarter').run(function ($rootScope, $state, MeanUser) {
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		if (toState.authenticate && !MeanUser.loggedin){
	      $state.transitionTo("auth.login");
	      event.preventDefault(); 
	    }
	})
});