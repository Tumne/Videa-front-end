"use strict";

var SignInController = function ($scope, $rootScope, $state, principal) {

	function initialize() {
		$scope.username = '';
		$scope.password = '';
	}

	$scope.submit = function() {
		console.log($scope.username);

		principal.authenticate({ username: $scope.username, password: $scope.password })
			.then(function() {
				$state.go('app.home');
			}, function(err) {
				console.log("FAILED: ", err);
				$scope.errorMessage = err.message;
			});
	};

	initialize();
};

module.exports = ['$scope', '$rootScope', '$state', 'principal', SignInController];
