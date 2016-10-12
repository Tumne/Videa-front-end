'use strict';

var ContentLibraryDirective = function () {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'cms/view/directive/home/ContentLibraryWidget/contentLibraryDirective.html',
		controller: 'contentLibraryController'
	};
};

module.exports = ContentLibraryDirective;
