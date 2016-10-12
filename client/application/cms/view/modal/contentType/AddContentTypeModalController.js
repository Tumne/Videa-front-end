'use strict';

var AddContentTypeModalController = function ($scope, $uibModalInstance, contentTypeService) {


	function initialize() {
		$scope.typeName = "";
		$scope.designationLabel = "Title";
		$scope.visibleInLibrary = true;
	}

	$scope.ok = function () {

		var contentType = {
			name: $scope.typeName,
			designationLabel: $scope.designationLabel,
			summaryFieldName: [],
			visible: $scope.visibleInLibrary
		};

		contentType = contentTypeService.initGroupFields(contentType);

		contentTypeService.add(contentType)
			.then(function (result) {

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

module.exports = ['$scope', '$uibModalInstance', 'contentTypeService', AddContentTypeModalController];
