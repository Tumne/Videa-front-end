'use strict';

var AppConfigurationController = function appConfigurationController($scope, $filter, brandService) {

	$scope.brandList = [];

	var loadBrandList = function () {

		brandService.list().then(function (results) {
			$scope.brandList = results.data;
		});

	};

	function initialize() {

		loadBrandList();
	}

	initialize();
};

module.exports = ['$scope', '$filter', 'brandService', AppConfigurationController];
