'use strict';

var CustomizeSummaryModalController = function ($scope, $uibModalInstance, contentId, contentTypeService, Contenttype){

	$scope.contentType = null;
	$scope.allSelected = false;

	function initialize() {

		contentTypeService.get(contentId, true).then(function (result) {
			var content = Contenttype.apiResponseTransformer(result);
			$scope.contentType = content;
			reloadStructure(content);
		});
	}

	function reloadStructure(content) {
		$scope.isLoading = true;
		content.loadStructure().then(
			function (result) {
				$scope.isLoading = false;
				$scope.fields = getAllFields(result);
			},
			function (reason) {
				$scope.isLoading = false;
				$uibModalInstance.dismiss({
					error: reason
				});
			}
		);
	}

	function getAllFields(contentType) {
		var fields = [];
		for (var group in contentType.fieldGroups) {
			if(contentType.fieldGroups.hasOwnProperty(group)) {
				fields = fields.concat(contentType.fieldGroups[group].fields);
			}
		}
		return fields;
	}

	$scope.ok = function () {

		$scope.contentType.summaryFieldName = []; //clean

		//update SummaryFieldName
		$scope.fields.map(function (field) {
			if (field.selected) {
				$scope.contentType.summaryFieldName.push(field.id);
			}
		});

		//saves field Type
		contentTypeService.update(contentId, { summaryFieldName: $scope.contentType.summaryFieldName })
			.then(function (result) {
				$uibModalInstance.close(result);
			}, function (reason) {
				$uibModalInstance.dismiss({
					error: reason
				});
			});
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.toggleAll = function () {
		$scope.allSelected = !$scope.allSelected;

		return $scope.fields.map(function (field) {
			field.selected = $scope.allSelected;
			return field.selected;
		});
	};

	$scope.initSelected = function (field, summaryList) {
		if (summaryList) {
			field.selected = summaryList.some(function (summaryField) {
				return field.id === summaryField;
			});
		} else {
			return false;
		}
	};

	initialize();

};

module.exports = ['$scope', '$uibModalInstance', 'contentId', 'contentTypeService', 'Contenttype', CustomizeSummaryModalController];
