'use strict';
/* Directives */
// All the directives rely on jQuery.

var VideaContentHeaderDirective = function () {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'cms/view/directive/layout/videaContentHeaderDirective.html'
	};
};

module.exports = VideaContentHeaderDirective;
