'use strict';

var ContentTypesDirective = function () {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'cms/view/directive/home/ContentTypesWidget/contentTypesDirective.html',
		controller: 'contentTypesController'
	};
};

module.exports = ContentTypesDirective;
