'use strict';

var ContentHeaderController = function ($scope, pageContext) {

	function initialize() {

		$scope.alert = pageContext.getAlert();
		$scope.showAlert = false;
	}

	$scope.dismissAlert = function () {
		$scope.showAlert = false;
		pageContext.dismissAlert();
	};

	$scope.$watch(function () {
			return pageContext.getAlert();
		},
		function (newValue) {
			$scope.alert = newValue;
			if (newValue && newValue.message) {
				$scope.showAlert = true;
			}
		}, true);

	initialize();

};

module.exports = ['$scope', 'pageContext', ContentHeaderController];
