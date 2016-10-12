'use strict';
var DatePickerController = function ($scope, $filter) {
	$scope.today = function () {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	};

	$scope.toggleMin = function () {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function ($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	$scope.dateOptions = {
		showWeeks: false,
		formatYear: 'yy',
		startingDay: 1,
		class: 'datepicker',
		datepickerMode: 'day'
	};

	$scope.initDate = new Date();
	$scope.formats = ['yyyy-MM-dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];


};

	


module.exports = ['$scope', '$filter', DatePickerController];
