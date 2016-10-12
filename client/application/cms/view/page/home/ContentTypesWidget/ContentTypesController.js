'use strict';

var ContentTypesController = function ($scope, contentTypeService, accountService) {

	var loadContentTypes = function () {
		contentTypeService.list().then(function (results) {
			$scope.contentTypes = results.data;
		});
	};

	$scope.$watch(function () {
		return accountService.getActiveAccount();
	}, function (account) {
		loadContentTypes();
	}, true);

	function initialize() {
		loadContentTypes();
	}

	initialize();
};

module.exports = ['$scope', 'contentTypeService', 'accountService', ContentTypesController];
