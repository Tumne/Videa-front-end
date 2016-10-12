'use strict';

var UserProfileEditController = function ($scope, $http, $routeParams, $location, $window, pageContext, userService) {

	function initialize() {

		$scope.data = null;
		pageContext.setTitle("User Profile");

		$http({
			url: '/LoggedUser',
			method: "GET"
		}).then(function (results) {
			$scope.data = results.data;
		});

	}

	$scope.saveCallback = function () {

		if ($scope.data.Id) {
			userService.update($scope.data).then(function () {
				$scope.successMsg = "User successfully updated!";
			});
		}
	};

	$scope.saveAndCloseCallback = function () {

		if ($scope.data.Id) {
			userService.update($scope.data).then(function () {
				$scope.successMsg = "User successfully updated!";
				$window.history.back();
			});
		}
	};

	$scope.cancelCallback = function () {
		$window.history.back();
	};

	initialize();

};

module.exports = ['$scope', '$http', '$routeParams', '$location', '$window', 'pageContext', 'userService', UserProfileEditController];
