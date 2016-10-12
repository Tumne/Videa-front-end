'use strict';

var UserController = function ($scope, $stateParams, $location, $window, pageContext, userService) {

	function initialize() {
		var id = $stateParams.id;

		$scope.data = null;
		if (id) {
			pageContext.setTitle("Edit User");
			userService.get(id).then(function (result) {
				$scope.data = result;
			});
		}
		else {
			pageContext.setTitle("Add User");
			$scope.data = userService.createInstance();
		}
	}

	$scope.saveCallback = function () {
		console.log("SAVE CALLBACK USER CONTROLLER");
		userService.saveUser($scope.data).then(function (result) {
			$scope.successMsg = result.successMsg;
			$scope.data.id = result.id;
		});
	};

	$scope.saveAndCloseCallback = function () {
		console.log("SAVE AND CLOSE CALLBACK USER CONTROLLER");
		userService.saveUser($scope.data).then(function (result) {
			$scope.successMsg = result.successMsg;
			$scope.data.id = result.id;
			$location.url('/users');
		});
	};


	$scope.deleteCallback = function () {
		console.log("DELETE CALLBACK USER CONTROLLER");
		userService.del($scope.data.id).then(function () {
			$scope.successMsg = "User successfully deleted!";
			$location.url('/users');
		});
	};

	$scope.cancelCallback = function () {
		$window.history.back();
	};

	initialize();

};

module.exports = ['$scope', '$stateParams', '$location', '$window', 'pageContext', 'userService', UserController];
