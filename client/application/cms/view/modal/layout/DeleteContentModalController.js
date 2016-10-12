'use strict';

var DeleteContentModalController = function ($scope, $uibModalInstance, contentId, deleteHandler) {

	$scope.deleteCallback = function () {
		deleteHandler(contentId).then(function (result) {
				$uibModalInstance.close(result);
			},
			function () {
				$uibModalInstance.dismiss('cancel');
			});
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};

module.exports = ['$scope', '$uibModalInstance', 'contentId', 'deleteHandler', DeleteContentModalController];
