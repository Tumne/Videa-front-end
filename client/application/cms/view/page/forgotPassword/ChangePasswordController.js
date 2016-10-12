"use strict";

var ChangePasswordController = function ($scope, $rootScope, $state, $stateParams, $location, forgotPasswordService) {

	function initialize() {
		$scope.pass = {};
		$scope.pass.newPassword = "";
		$scope.pass.confirmPassword  = "";
		$scope.token = $stateParams.t;
		$location.search("t", $scope.token);
		$scope.differentPasswords = false;
		$scope.isTokenValid = true;
		$scope.loading = true;
		forgotPasswordService.verifyToken($scope.token).then(function(){
				$scope.isTokenValid = true;
			},
			function(err){
				$scope.isTokenValid = false;
			});
	}

	$scope.goToHome = function(){
		$state.go('app.home');
	};

	$scope.submit = function() {
		if($scope.pass.newPassword === $scope.pass.confirmPassword && $scope.pass.newPassword !== "") {
			console.log("pass", $scope.pass.newPassword);
			$scope.differentPasswords = false;
			forgotPasswordService.changePassword($scope.token, {newPassword: $scope.pass.newPassword}).then(function (result) {
				$state.go('app.home');
			}).catch(function(err){
				$scope.errorMsg = err;
				$scope.isTokenValid = false;
			});
		}
		else{
			$scope.differentPasswords = true;
		}
	};

	initialize();
};

module.exports = ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'forgotPasswordService', ChangePasswordController];

