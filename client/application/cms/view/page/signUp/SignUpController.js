"use strict";

var SignUpController =  function ($scope, $rootScope, $state, signUpService) {

	function initialize() {

		$scope.user = {
			username :'',
			password : '',
			email : '',
			firstName : '',
			lastName :''
		};

		$scope.account = {
			name : ''
		};
		$scope.differentPasswords = false;
		$scope.agreeTermsAndPrivacyPolicy = false;
	}

	$scope.submit = function() {
		if($scope.agreeTermsAndPrivacyPolicy) {
			if ($scope.user.password === $scope.user.confirmPassword && $scope.user.password !== "") {
				$scope.differentPasswords = false;
				signUpService.signUp($scope.account, $scope.user)
					.then(function () {
						$state.go('access.signUpReq');
					}, function (err) {
						$scope.errorMessage = err.message;
					});
			}
			else {
				$scope.differentPasswords = true;
			}
		}
	};

	$scope.updateTermsAndPolicy = function(){
		if($scope.agreeTermsAndPrivacyPolicy) {
			document.getElementById("signUpSubmit").disabled = false;
		}
		else{
			document.getElementById("signUpSubmit").disabled = true;
		}
	};

	$scope.goToHome = function() {
		$state.go('access.signin');
	};

	initialize();
};

module.exports =  ['$scope', '$rootScope', '$state', 'signUpService', SignUpController];
