'use strict';

var ReferenceContentFieldDirective = function ($uibModal, contentNodeService, Contentnode, mediaService, contentFieldService, contentTypeService) {


	function link(scope, element, attrs) {

		scope.bulkAction = 0;
		scope.loadedData = [];
		scope.bulkSelection = [];

		contentTypeService.list().then(function (results) {
			scope.contentTypes = {};

			//set initial Checkbox filter options (all selected)
			var ctLen = results.data.length;
			for (var i = 0; i < ctLen; i++) {
				var contentType = results.data[i];
				scope.contentTypes[contentType.id] = contentType;
			}
		});

		if (scope.edit === 'edit') {
			scope.showForm = true;
		}
		else{
			//TODO for now should show the form
			scope.showForm = true;
		}

		scope.tryToEdit = function () {
			if (scope.edit !== 'view') {
				scope.focusInput = true;
				scope.showForm = true;
			}
		};

		scope.openNodePickerModal = function () {
			var modalInstance = $uibModal.open({
				templateUrl: 'cms/view/modal/contentNode/contentNodePickerModal.html',
				controller: 'contentNodePickerModalInstanceCtrl',

				resolve: {
					ids: function () {
						return scope.value;
					},
					values: function () {
						return scope.loadedData;
					},
					contentnodetypes: function () {
						return scope.field.referenceTypeIds;
					},
					contentTypesData : function(){
						return scope.contentTypes;
					}
				}
			});

			modalInstance.result.then(function (obj) {
				scope.loadedData = obj.values;
				scope.value = obj.ids;
				scope.onupdate({contentId: scope.contentId, field: scope.field, value: scope.value});
			}, function () {

			});
		};

		scope.removeReferenceContent = function (contentNode) {
			var index = scope.value.indexOf(contentNode.Id);
			if (index > -1) {
				scope.value.splice(index, 1);
			}
			index = scope.loadedData.indexOf(contentNode);
			if (index > -1) {
				scope.loadedData.splice(index, 1);
			}
		};

		// toggle selection for a given node
		scope.toggleSelection = function toggleSelection(node) {
			var idx = scope.bulkSelection.indexOf(node);

			// is currently selected
			if (idx > -1) {
				scope.bulkSelection.splice(idx, 1);
			}

			// is newly selected
			else {
				scope.bulkSelection.push(node);
			}
		};

		scope.toggleAll = function () {


			if (scope.bulkSelection.length < scope.loadedData.length) {
				scope.bulkSelection = [];
				for (var i = 0; i < scope.loadedData.length; i++) {
					scope.bulkSelection.push(scope.loadedData[i]);
				}
			}
			else {
				scope.bulkSelection = [];
			}
		};

		scope.applyBulkAction = function () {

			switch (scope.bulkAction) {
				case "1":
					for (var i = 0; i < scope.bulkSelection.length; i++) {
						scope.removeReferenceContent(scope.bulkSelection[i]);
					}
					scope.bulkSelection = [];
					break;
			}
		};

		scope.refreshData = function () {

			scope.loadedData = [];

			if (scope.value) {

				contentNodeService.batchGet(scope.value).then(
					function (result) {
						scope.loadedData = Contentnode.apiResponseTransformer(result.data);
					},
					function (reason) {
						// TODO:
					});
			}
		};

		scope.removeReference = function(index) {
			var references = JSON.parse(JSON.stringify(scope.loadedData));
			references.splice(index, 1);
			var updateObject = {};

			updateObject.contentId = scope.contentId;
			updateObject.fieldId = scope.field.id;
			updateObject.fieldValue = references;
			
			contentNodeService.updateField(updateObject).then(function(){
				scope.loadedData.splice(index, 1);
			});
		};

		scope.getImageUrl = function (url) {
			return mediaService.getImageUrl(url);
		};

		scope.refreshData();


		scope.allSelected = false;
		scope.toggleAll = function () {
			scope.allSelected = !scope.allSelected;

			scope.loadedData.forEach(function (item) {
				item.selected = scope.allSelected;
			});
		};
	}

	return {
		restrict: 'E',
		scope: {
			contentId: '=contentid',
			value: '=value',
			field: '=field',
			edit: '=edit',
			expanded: '=expanded',
			onupdate: '&onupdate'
		},
		templateUrl: 'cms/view/directive/contentField/contentNode/referenceContentField.html',
		link: link
	};
};

module.exports = ['$uibModal', 'contentNodeService', 'Contentnode', 'mediaService', 'contentFieldService', 'contentTypeService', ReferenceContentFieldDirective];
