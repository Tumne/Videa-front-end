'use strict';

var AddContentFieldModalController = function ($scope, $uibModalInstance, editType, contentfield, contentType, selectedFieldGroup, contentFieldService, contentTypeService) {


	function initialize() {
		$scope.editType = editType;
		$scope.valuesList = [];
		$scope.fieldsSizes = [{value: 3, title: 'Small'}, {value: 6, title: 'Medium'}, {
			value: 12,
			title: 'Large'
		}];

		$scope.choosedField = false;
		$scope.fieldsList = [];
		$scope.loading = false;
		$scope.fieldSelectedObj = undefined;
		$scope.isNewField = true;

		$scope.populateFieldsList();


		contentFieldService.getFieldTypes()
			.then(function (result) {

				if ($scope.editType === 'add') {
					$scope.data = {};
					$scope.data.fieldName = "";
					$scope.data.fieldSize = $scope.fieldsSizes[0].value;
					$scope.data.fieldType = "Loading types...";
					$scope.data.itemsList = "";
					$scope.data.isMandatory = false;
				} else {
					$scope.data = {};
					$scope.data.id = contentfield.id;
					$scope.data.fieldName = contentfield.name;
					$scope.data.fieldSize = contentfield.size;
					$scope.data.itemsList = contentfield.possibleValues && contentfield.possibleValues.length > 0 ? contentfield.possibleValues.join(',') : "";
					$scope.data.isMandatory = contentfield.isMandatory;
				}


				$scope.valuesList = result;
				if ($scope.editType === 'add') {
					$scope.data.fieldType = $scope.valuesList[0];
				} else {
					$scope.data.fieldType = contentfield.fieldType;
				}
			}, function () {
				$scope.valuesList = [];
				$scope.data.fieldType = "";
			});
	}

	$scope.del = function () {
		if ($scope.data.id) {


			contentTypeService.deleteContentField(contentType.id, $scope.data.id)
				.then(function (result) {
					$uibModalInstance.close(result);
				}, function () {
					$uibModalInstance.dismiss('error');
				});
		}
	};

	$scope.ok = function () {

		var contentField = {
			name: $scope.data.fieldName,
			title: $scope.data.fieldName,
			size: $scope.data.fieldSize,
			fieldType: $scope.data.fieldType,
			isMandatory: $scope.data.isMandatory
		};

		if ($scope.isDropDown($scope.data.fieldType)) {

			if ($scope.data.itemsList) {
				contentField.possibleValues = $scope.data.itemsList.split(",");
			}
		}

		var contentFieldGroup = selectedFieldGroup;

		if (!contentFieldGroup.fields) {
			contentFieldGroup.fields = [];
		}

		if($scope.isNewField) {
			if ($scope.editType === 'add') {
				contentFieldService.add(contentField).then(function (result) {
					contentField = result.data;
					contentTypeService.addContentField(contentType.id, contentField.id, contentFieldGroup.name)
						.then(function (result) {
							$uibModalInstance.close(result);
						}, function (reason) {
							$uibModalInstance.dismiss({
								error: reason
							});
						});
				}, function (reason) {
					$uibModalInstance.dismiss({
						error: reason
					});
				});
			}
			else if ($scope.editType === 'edit') {
				contentFieldService.update($scope.data.id, contentField).then(function (result) {
					contentField = result;
					$uibModalInstance.close(result);
				}, function (reason) {
					$uibModalInstance.dismiss({
						error: reason
					});
				});
			}
		}
		else{
			contentTypeService.addContentField(contentType.id, $scope.data.id, contentFieldGroup.name)
				.then(function (result) {
					$uibModalInstance.close(result);
				}, function (reason) {
					$uibModalInstance.dismiss({
						error: reason
					});
				});
		}

	};

	$scope.populateFieldsList = function () {

		$scope.loading = true;

		$scope.fieldsList = [];
		contentTypeService.getPossibleFields(contentType.id)
			.then(function (result) {

					$scope.loading = false;
					$scope.fieldsList = result;
					$scope.totalItems = result.length;

				},
				function () {
					$scope.loading = false;
				});
	};

	$scope.selectedField = function(){

		$scope.choosedField = true;

		if($scope.fieldSelectedObj !== 'new'){
			var selected = JSON.parse($scope.fieldSelectedObj);
			$scope.data.id = selected.id;
			$scope.data.fieldName = selected.name;
			$scope.data.fieldSize = selected.size;
			$scope.data.fieldType = selected.fieldType;
			$scope.isNewField = false;
		}
		else{
			$scope.data.id = undefined;
			$scope.data.fieldName = "";
			$scope.data.fieldSize = 3;
			$scope.data.fieldType = "";
			$scope.isNewField = true;
		}
		
	};

	$scope.isDropDown = function (fieldType) {
		return (fieldType === 'Dropdown' || fieldType === 'DropdownMultiple');
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	initialize();
};

module.exports = ['$scope', '$uibModalInstance', 'editType', 'contentfield', 'contentType', 'selectedFieldGroup', 'contentFieldService', 'contentTypeService', AddContentFieldModalController];
