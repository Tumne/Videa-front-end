'use strict';

var ContentFieldController = function ($scope) {

	var initialValue,
		escapePressed = false;

	$scope.isDirty = false;

	function hasSameValue(v1, v2) {
		return v1.contentId === v2.contentId && v1.field === v2.field && v1.value === v2.value;
	}

	$scope.saveCallback = function () {

		if (!escapePressed) {
			var fieldValue = {contentId: $scope.contentId, field: $scope.field, value: $scope.value};
			if ($scope.isDirty ||
				(!this.lastSaved && $scope.value)||
				(this.lastSaved && !hasSameValue(this.lastSaved, fieldValue))) {
				$scope.onupdate(fieldValue);
			}
			$scope.isDirty = false;
			this.lastSaved = fieldValue;
			$scope.showForm = false;
			escapePressed = false;
		}
	};

	$scope.cancelCallback = function () {
		$scope.value = initialValue;
		escapePressed = true;
		$scope.showForm = false;
	};

	$scope.setEscapeToDefault = function () {
		escapePressed = false;
	};

	$scope.tryToEdit = function () {
		if ($scope.edit !== 'view') {
			initialValue = $scope.value;
			$scope.focusInput = true;
			$scope.showForm = true;
		}
	};

	$scope.$watch('value', function (newValue, oldValue) {
		if (oldValue && newValue !== oldValue) {
			$scope.isDirty = true;
		}
	});

	$scope.$watch('contentid', function () {
		initialize();
	});

	function initialize() {

		initialValue = angular.copy($scope.value);

		if ($scope.edit === 'edit'){
			$scope.showForm = true;
		}
	}

	initialize();
};

module.exports = ['$scope', ContentFieldController];
