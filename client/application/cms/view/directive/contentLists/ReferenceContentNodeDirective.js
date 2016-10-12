'use strict';

var ReferenceContentNodeDirective = function ($uibModal, contentNodeService, Contentnode, mediaService) {

	function link(scope, element, attrs) {

		scope.bulkAction = 0;
		scope.loadedData = [];
		scope.bulkSelection = [];

		if (scope.edit === 'edit') {
			scope.showForm = true;
		}

		scope.tryToEdit = function () {
			if (scope.edit !== 'view') {
				scope.focusInput = true;
				scope.showForm = true;
			}
		};

		//Options for sortable code
		scope.sortableOptions = {
			//Construct method before sortable code
			construct:function(model){
			},
			//Callback after item is dropped
			stop:function(list, dropped_index){
				updateOrderOfReferences();
			}
		};

		function updateOrderOfReferences(){
			var referencesIds = [];

			//get references ids
			for(var i = 0; i < scope.loadedData.length; i++){
				referencesIds.push(scope.loadedData[i].id);
			}

			scope.references = referencesIds;
			scope.onupdate({references: scope.references});
			sortNodesAccordingToReferences();
		}



		scope.openNodePickerModal = function () {
			var modalInstance = $uibModal.open({
				templateUrl: 'cms/view/modal/contentNode/contentNodePickerModal.html',
				controller: 'contentNodePickerModalInstanceCtrl',

				resolve: {
					ids: function () {
						return scope.references;
					},
					values: function () {
						return scope.loadedData;
					},
					contentnodetypes: function () {
						return Object.keys(scope.contentTypes);
					},
					contentTypesData : function(){
						return scope.contentTypes;
					}
				}
			});

			modalInstance.result.then(function (obj) {
				scope.loadedData = obj.values;
				scope.references = obj.ids;
				scope.onupdate({references: scope.references});
			}, function () {

			});
		};

		scope.removeReferenceContent = function (contentNode) {
			var index = scope.references.indexOf(contentNode.Id);
			if (index > -1) {
				scope.references.splice(index, 1);
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

			if (scope.references) {

				contentNodeService.batchGet(scope.references).then(
					function (result) {
						scope.loadedData = Contentnode.apiResponseTransformer(result.data);
						sortNodesAccordingToReferences();
					},
					function (reason) {
						// TODO:
					});
			}
		};

		function markMissingReferences(){
			
			for(var i = 0; i < scope.references.length; i++){
				var referenceId = scope.references[i];
				var notFound = true;
				for(var j = 0; j < scope.loadedData.length; j++){
					if(scope.loadedData[j].id === referenceId){
						notFound = false;
						break;
					}
				}
				
				if(notFound){
					scope.loadedData.push({id: referenceId, designation: "Missing reference"});
				}
			}
		}
		
		function sortNodesAccordingToReferences (){
			var sortedData = [];
			markMissingReferences();

			for(var i = 0; i < scope.references.length; i++){
				var referenceId = scope.references[i];
				for(var j = 0; scope.loadedData.length; j++){
					if(scope.loadedData[j].id === referenceId){
						sortedData.push(scope.loadedData[j]);
						scope.loadedData.splice(j,0);
						break;
					}
				}
			}

			scope.loadedData = sortedData;
		}

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

		scope.$watch('references', function(){
			scope.refreshData();
		});

		scope.removeContentNodeIndex = function(contentNodeIndex){
			var contentNodeId = scope.loadedData[contentNodeIndex].id;
			scope.removeContentNode({contentNodeId : contentNodeId}).then(function(nodeId){
				scope.loadedData.splice(contentNodeIndex, 1);
				var referencesIndex = scope.references.indexOf(nodeId);
				scope.references.splice(referencesIndex, 1);
			});
		};
	}

	return {
		restrict: 'E',
		scope: {
			references: '=references',
			edit: '=edit',
			expanded: '=expanded',
			onupdate: '&onupdate',
			removeContentNode : '&',
			contentTypes: '='
		},
		templateUrl: 'cms/view/directive/contentLists/referenceContentNodeList.html',
		link: link
	};
};

module.exports = ['$uibModal', 'contentNodeService', 'Contentnode', 'mediaService', ReferenceContentNodeDirective];
