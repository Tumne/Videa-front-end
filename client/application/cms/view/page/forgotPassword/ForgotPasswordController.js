	"use strict";

	var ForgotPasswordController = function ($scope, $rootScope, $state, forgotPasswordService) {

		function initialize() {
            $scope.email = '';
			$scope.errorMessage  = null;
		}

		$scope.submit = function() {

            forgotPasswordService.forgotPasswordRequest($scope.email)
                .then(function() {
					$state.go('access.forgotPasswordReq');
                }, function(err) {
					$scope.errorMessage = err.message;
                });
		};

		$scope.goToHome = function() {
			$state.go('app.home');
		};

		initialize();
	};
module.exports = ['$scope', '$rootScope', '$state', 'forgotPasswordService', ForgotPasswordController];
