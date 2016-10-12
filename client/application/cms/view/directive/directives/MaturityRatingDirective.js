'use strict';

var MaturityRatingDirective = function () {
	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {
			ngModel:'='
		},
		template: '<select class="form-control" ng-options="ro.name for ro in ratingOptions" ng-model="rating"></select>',
		link: function (scope, element, attr, ngModelCtrl) {

			scope.ratingOptions = [
				{ name: "C", value: 0 },
				{ name: "C8", value: 1 },
				{ name: "G", value: 2 },
				{ name: "PG", value: 3 },
				{ name: "14+", value: 4 },
				{ name: "18+", value: 5 },
			];

			if (scope.ngModel) {
				scope.rating = scope.ratingOptions[scope.ngModel];
			}

			scope.$watch('ngModel', function () {

				var newRating = scope.ratingOptions[scope.ngModel];
				if (newRating !== scope.rating) {
					scope.ignoreRatingUpdate = true;
					scope.rating = newRating;
				}

			}, true);

			scope.$watch('rating', function () {

				if (scope.ignoreRatingUpdate) {
					scope.ignoreRatingUpdate = false;
					return;
				}

				if (scope.rating) {
					ngModelCtrl.$setViewValue(scope.rating.value);
				}
			}, true);
		}
	};
};

module.exports = MaturityRatingDirective;
