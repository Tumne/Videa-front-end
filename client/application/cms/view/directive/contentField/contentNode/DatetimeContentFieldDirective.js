'use strict';

var DatetimeContentFieldDirective = function () {

	function link(scope, element, attrs) {

		var escapePressed = false;

		if (scope.edit === 'edit'){
			scope.showForm = true;
		}

		scope.tryToEdit = function () {
			if (scope.edit !== 'view') {
				scope.focusInput = true;
				scope.showForm = true;
			}
		};

		if (scope.value) {
			scope.value = new Date(scope.value);
			scope.value.setHours(0, 0, 0, 0);
		} else {
			scope.value = null;
		}

		scope.today = function () {
			scope.value = new Date();
		};

		scope.clear = function () {
			scope.value = null;
		};

		// Disable weekend selection
		scope.disabled = function (date, mode) {
			return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
		};

		scope.open = function ($event) {

			$event.preventDefault();
			$event.stopPropagation();

			scope.opened = true;
		};

		scope.$watch('opened', function (newValue, oldValue) {
			if (scope.edit !== 'edit' && newValue === false && newValue !== oldValue){
				scope.saveCallback();
			}
		});


		scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1,
			initDate: new Date()
		};

		scope.initDate = new Date();
		scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd'];
		scope.format = scope.formats[4];

		scope.saveCallback = function () {

			if (!escapePressed) {
				scope.onupdate({contentId: scope.contentId, field: scope.field, value: scope.value});
				scope.showForm = false;
				escapePressed = false;
			}
		};

		scope.cancelCallback = function () {
			scope.value = undefined;
			escapePressed = true;
			scope.showForm = false;
		};
	}

	return {
		restrict: 'E',
		scope: {
			contentId: '=contentid',
			value: '=value',
			field: '=field',
			edit: '=edit',
			expanded: '=expanded',
			onupdate: '&onupdate'
		},
		templateUrl: 'cms/view/directive/contentField/contentNode/datetimeContentField.html',
		link: link
	};
};

module.exports = DatetimeContentFieldDirective;
