'use strict';

var DeleteNodeModalController = function ($scope, $uibModalInstance, contentId, contentNodeService) {

	$scope.deleteCallback = function () {
		
		contentNodeService.del(contentId).then(function (result) {
			$uibModalInstance.close(result);
		}, function () {
			$uibModalInstance.dismiss('cancel');
		});
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};

module.exports = ['$scope', '$uibModalInstance', 'contentId', 'contentNodeService',DeleteNodeModalController];
