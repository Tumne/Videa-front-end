'use strict';

var AddImageTypeModalController = function ($scope, $uibModalInstance, mediaService) {

	function initialize()
	{
		$scope.imageName = "teste";
		$scope.imageWidth = 0;
		$scope.imageHeight = 0;
	}

	$scope.ok = function () {

		var imgType = {
			name: $scope.imageName,
			width: $scope.imageWidth,
			height: $scope.imageHeight
		};

		mediaService.addImageType(imgType)
			.then(function (result) {
				$uibModalInstance.close(result);
			}, function () {
				$uibModalInstance.dismiss('error');
			});

	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	initialize();
}; 

module.exports = ['$scope', '$uibModalInstance', 'mediaService', AddImageTypeModalController];
