'use strict';

var AddBucketModalController = function ($scope, $uibModalInstance, bucket,  okFunction) {

	function initialize() {
		if(!bucket) {
			$scope.bucket = {
				"name": ""
			};
		}else{
			$scope.bucket = bucket;
		}
		$scope.popUpTitle = "Add Catalog";
	}

	$scope.ok = function () {
		okFunction($scope.bucket).then(function (result) {
			$uibModalInstance.close(result);
		}, function (err) {
			$scope.errorMsg = err.message;
			//		$uibModalInstance.dismiss('error');
		});

	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	initialize();
};

module.exports = ['$scope', '$uibModalInstance', 'bucket', 'okFunction',AddBucketModalController];
