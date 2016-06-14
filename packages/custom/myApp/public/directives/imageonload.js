'use strict';

angular.module('mean.meanStarter').directive('imageonload', function () {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('load', function() {
        //call the function that was passed
        scope.$apply(attrs.imageonload);
      });
		}
	};
})