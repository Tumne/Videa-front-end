'use strict';

var ContentNodeEditController = function ($scope, $stateParams) {

	function initialize() {
		$scope.id = $stateParams.id;
		$scope.action = $stateParams.action;
	}

	initialize();
};

module.exports = ['$scope', '$stateParams', ContentNodeEditController];
