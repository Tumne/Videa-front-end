"use strict";

var ContentNodePickerModalController =  function ($scope, $uibModalInstance, ids, values, contentnodetypes, contentTypesData, pageContext, contentNodeService, Contentnode, mediaService) {

	$scope.data = [];
	$scope.offset = null;
	$scope.itemsPerPage = 5;
	$scope.asc = null;
	$scope.sort = null;
	$scope.query = "";
	$scope.valuesClone = [];
	$scope.idsClone = [];


	$scope.saveChanges = function () {
		$scope.values = [];
		$scope.ids = [];
		var len = $scope.valuesClone.length;
		for (var i = 0; i < len; i++) {
			$scope.values.push($scope.valuesClone[i]);
			$scope.ids.push($scope.valuesClone[i].id);
		}
		//	$('#' + $scope.modalName).modal('hide');
	};

	$scope.changeSelection = function (contentNode) {
		var index = $scope.idsClone.indexOf(contentNode.id);
		if (contentNode.selected) {
			if (index === -1) {
				$scope.valuesClone.push(contentNode);
				$scope.idsClone.push(contentNode);
			}
		} else {
			if (index > -1) {
				$scope.valuesClone.splice(index, 1);
				$scope.idsClone.splice(index, 1);
			}
		}
	};
	$scope.sortContentNodes = function () {
		$scope.offset = null;
		$scope.data = [];
		$scope.populateContentNodeList();
	};

	$scope.pageChanged = function () {
		$scope.populateContentNodeList();
	};

	$scope.populateContentNodeList = function () {
		$scope.data = [];
		$scope.offset = null;
		var query = {};

		if ($scope.contentnodetypes) {
			query.operator = 1;
			if ($scope.query) {
				query.value = $scope.query + " AND contentTypeId:(" + $scope.contentnodetypes.join(' ') + ")";
			}
			else {
				query.value = "contentTypeId:(" + $scope.contentnodetypes.join(' ') + ")";
			}
		}
		else {
			if ($scope.query) {
				query = {operator: 1, value: $scope.query};
			}
		}

		contentNodeService.search(query, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc)
			.then(function (result) {
					$scope.loading = false;
					$scope.data = Contentnode.apiResponseTransformer(result.data);
					$scope.totalItems = result.total;

					var len = $scope.data.length;
					for (var i = 0; i < len; i++) {
						if (!$scope.ids) {
							$scope.data[i].selected = false;
							continue;
						}
						var values_len = $scope.ids.length;
						for (var j = 0; j < values_len; j++) {
							if ($scope.ids[j] === $scope.data[i].id) {
								$scope.data[i].selected = true;
								break;
							}
						}
					}
				},
				function (reason) {
					$scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occured while loading the list of content!");
				});
	};

	$scope.getImageUrl = function (url) {
		return mediaService.getImageUrl(url);
	};

	function initialize() {

		$scope.ids = ids;
		$scope.values = values;
		$scope.contentnodetypes = contentnodetypes;
		$scope.contentTypesData = contentTypesData;

		console.log("PICKER IDS", $scope.ids);
		console.log("PICKER values", $scope.values);
		console.log("PICKER contentnodetypes", $scope.contentnodetypes);

		//	$scope.modalName = 'modal' + Math.floor((Math.random() * 100000) + 1);

		if ($scope.values) {
			var len = $scope.values.length;
			for (var i = 0; i < len; i++) {
				$scope.idsClone.push($scope.values[i].id);
				$scope.valuesClone.push($scope.values[i]);
			}
			$scope.populateContentNodeList();
		}
	}

	initialize();

	$scope.performSearch = function () {
		$scope.populateContentNodeList();
	};

	$scope.ok = function () {
		$scope.saveChanges();

		var obj = {};
		obj.values = $scope.values;
		obj.ids = $scope.ids;
		$uibModalInstance.close(obj);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};

module.exports = ['$scope', '$uibModalInstance', 'ids', 'values', 'contentnodetypes', 'contentTypesData', 'pageContext', 'contentNodeService', 'Contentnode', 'mediaService', ContentNodePickerModalController];
