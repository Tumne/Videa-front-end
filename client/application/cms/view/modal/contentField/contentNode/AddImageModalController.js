'use strict';

var AddImageModalController = function ($scope, $uibModalInstance, mediaService, contentId, field) {

	function initialize() {
		$scope.fileUploads = [];
		$scope.uploadedImages = {};
		$scope.completedUploads = 0;
		$scope.imageTypes = [];
		$scope.imageType = {name: ""};

		//get all image types
		mediaService.listImageTypes().then(function (results) {
			$scope.imageTypes = results.data;
			$scope.imageType = $scope.imageTypes.length > 0 ? $scope.imageTypes[0] : {name: ""};
		});
	}

	// upload files
	$scope.onFileSelect = function ($files) {

		for (var i = 0; i < $files.length; i++) {
			var file = $files[i];
			$scope.fileUploads.push({
				file: file,
				progress: 0,
				uploading: false,
				completed: false,
				imageType: $scope.imageType
			});
		}
	};

	$scope.uploadFiles = function () {

		for (var i = 0; i < $scope.fileUploads.length; i++) {
			var upload = $scope.fileUploads[i];

			if (!upload.uploading && !upload.completed) {
				uploadFile(upload);
			}
		}
	};

	function uploadFile(upload) {
		upload.uploading = true;

		mediaService.uploadImage(contentId, field.id, upload.file.name, $scope.imageType.id, upload.file).then(
			function (data) { // success
				upload.progress = 100;
				upload.uploading = false;
				upload.completed = true;

				$scope.uploadedImages[data.imageType] = data;

				$scope.completedUploads++;
			},
			function () { // error
				upload.progress = 0;
				upload.uploading = false;
				upload.completed = true;

				$scope.completedUploads++;
			},
			function (progress) { // notify
				upload.progress = progress;
			});
	}

	$scope.closeUploadFiles = function () {
		$scope.fileUploads = [];
	};

	$scope.selectImageType = function (imgType) {
		$scope.imageType = imgType;
	};

	$scope.ok = function () {

		if ($scope.fileUploads && $scope.fileUploads.length > 0) {
			if ($scope.completedUploads === $scope.fileUploads.length) {
				$uibModalInstance.close($scope.uploadedImages);
			}
			else {
				$scope.uploadFiles();
			}
		}
		else {
			$scope.cancel();
		}
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	initialize();
};

module.exports = ['$scope', '$uibModalInstance', 'mediaService', 'contentId', 'field', AddImageModalController];
