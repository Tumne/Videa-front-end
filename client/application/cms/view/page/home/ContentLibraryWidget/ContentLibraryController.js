'use strict';

var ContentLibraryController = function ($scope, contentNodeService, contentTypeService, Contentnode) {


	var loadContentNodes = function () {

		$scope.contentNodes = [];

		var MAX_TOTAL_ITEMS = 14,
			sort = "modifiedDate",
			asc = false,
			query = "";

		contentNodeService.search(query, 0, MAX_TOTAL_ITEMS, sort, asc)
			.then(function (result) {
				$scope.contentNodes = Contentnode.apiResponseTransformer(result.data);
				console.log($scope.contentNodes);
			}, function (reason) {

			});
		$scope.contentTypesNames = {};

		contentTypeService.list().then(function (results) {

			var ctLen = results.data.length;
			for (var i = 0; i < ctLen; i++) {
				var contentType = results.data[i];
				$scope.contentTypesNames[contentType.id] = contentType.name;
			}
		});


	};

	function initialize() {
		loadContentNodes();
	}

	initialize();
};

module.exports = ['$scope', 'contentNodeService', 'contentTypeService', 'Contentnode', ContentLibraryController];
