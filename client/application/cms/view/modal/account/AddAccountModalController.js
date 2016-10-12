'use strict';

var AddAccountModalController = function ($scope, $uibModalInstance, account, popUpTitle, okFunction) {

	function initialize() {
		$scope.errorMsg = undefined;
		if (!account) {
			$scope.account = {
				"name": ""
			};
		} else {
			$scope.account = account;
		}
		$scope.popUpTitle = popUpTitle;
	}

	$scope.ok = function () {
		okFunction($scope.account, $scope.roles).then(function (result) {
			console.log(result);
			$uibModalInstance.close(result);
		}, function (err) {
			console.log("err", err);
			$scope.errorMsg = err.message;
			//		$uibModalInstance.dismiss('error');
		});

	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	initialize();
};

module.exports = ['$scope', '$uibModalInstance', 'account', 'popUpTitle', 'okFunction', AddAccountModalController];
