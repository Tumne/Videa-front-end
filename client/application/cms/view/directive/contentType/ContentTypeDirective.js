'use strict';

var ContentTypeDirective = function ($window, $uibModal, pageContext, contentTypeService, alignmentService, Contenttype) {

	function link(scope, element, attrs) {
		var needsUpdateFields =  false;

		function initialize() {

			scope.selectedFieldGroup = null;

			var id = null;
			if (scope.content) {
				id = scope.content.id;
			}

			scope.viewMode = scope.action === 'add' ? 'edit' : scope.action;
			scope.preventSave = false;

			if (scope.action !== 'add') {
				if (id) {
					scope.isLoading = true;
					contentTypeService.get(id).then(function (result) {
						scope.isLoading = false;
						reload(result);
					});
				}
			}
		}

		scope.$watch('content', function () {
			initialize();
		});

		scope.$watch('group.fields', function () {
			console.log("goup fields changed");
		});

		//Options for sortable code
		scope.sortableOptions = {
			//Construct method before sortable code
			construct:function(model){
			},
			//Callback after item is dropped
			stop:function(list, dropped_index){
				updateOrderOfFields();
			}
		};

		scope.printListOrder = function () {
			if (!scope.fields) {
				scope.fields = scope.data.fieldGroups[0].fields;
			}

			scope.valueList = "";
			for (var i = 0; i < scope.data.fieldGroups[0].fields.length; i++) {
				scope.valueList = scope.valueList + " - " + scope.data.fieldGroups[0].fields[i].name;
			}
		};

		scope.openCustomizeSummaryModal = function (contentId) {

			var modalInstance = $uibModal.open({
				templateUrl: 'cms/view/modal/contentType/customizeSummaryModal.html',
				controller: 'customizeSummaryModalController',

				resolve: {
					contentId: function () {
						return contentId;
					}
				}
			});

			modalInstance.result
				.then(function (data) {


					//		if (data) {
					//do something
					//	}

				}, function () {

				});
		};

		scope.openEditContentFieldModal = function (editType, contentfield) {

			var modalInstance = $uibModal.open({
				templateUrl: 'cms/view/modal/contentField/contentType/addContentField.html',
				controller: 'addContentFieldModalController',

				resolve: {
					editType: function () {
						return editType;
					},
					contentfield: function () {
						return contentfield;
					},
					contentType: function () {
						return scope.data;
					},
					selectedFieldGroup: function () {
						return scope.selectedFieldGroup;
					}
				}
			});

			modalInstance.result
				.then(function () {
					scope.isLoading = true;
					contentTypeService.get(scope.data.id).then(function (result) {
						scope.isLoading = false;
						reload(result);
					});
				}, function (reason) {
					if (reason && reason.error) {
						pageContext.showAlertDanger(reason.error.message);
					}
				});
		};

		scope.onVisibleChange = function () {
			scope.saveCallback();
		};

		scope.saveCallback = function () {

			if (scope.action === 'add') {
				contentTypeService.add(scope.data).then(function (result) {
					reload(result);
					scope.successMsg = "Content successfully created!";
				});
			}
			else {

				contentTypeService.update(scope.data.id, scope.data).then(function () {
					pageContext.showAlertSuccess("Content successfully updated!");
					//reload(result);
				}, function (reason) {
					pageContext.showAlertDanger(reason.message);
				});

			}
		};

		scope.cancelCallback = function () {
			$window.history.back();
		};


		scope.selectGroupTab = function (group) {
			scope.selectedFieldGroup = group;
		};


		function reloadStructure(content) {
			scope.isLoading = true;
			content.loadStructure().then(
				function (result) {

					result.setupFieldDirectives(scope.viewMode, 'field', 'data', 'expanded', 'onUpdateField');

					scope.isLoading = false;
					scope.data = result;
					scope.selectedFieldGroup = (result.fieldGroups && result.fieldGroups.length > 0) ? result.fieldGroups[0] : null;
				},
				function (reason) {
					scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occured while loading the content!");
				});
		}

		function reload(result) {
			var content = Contenttype.apiResponseTransformer(result);
			reloadStructure(content);
		}

		function updateOrderOfFields(){
			//console.log("FIELDS PREV", scope.selectedFieldGroup.fields);
			var fields = JSON.parse(JSON.stringify(scope.selectedFieldGroup.fields));

			//removed unwanted properties
			for(var i = 0; i < fields.length; i++){
				delete fields[i].initialValue;
				delete fields[i].createdDate;
				delete fields[i].modifiedDate;
				delete fields[i].directive;
			}

			contentTypeService.updateOrderOfFields(scope.content.id, scope.selectedFieldGroup.name, fields).then(
				function(){
					pageContext.showAlertSuccess("Updated fields", "Update");
				},
				function(reason){
					pageContext.showAlertDanger(reason, "An error occured while updating fields order!");
				});
		}
	}

	return {
		restrict: 'E',
		scope: {
			content: '=',
			action: '=',
			expanded: '@expanded'
		},
		templateUrl: 'cms/view/directive/contentType/contentTypeDirective.html',
		link: link
	};
};

module.exports = ['$window', '$uibModal', 'pageContext', 'contentTypeService', 'alignmentService', 'Contenttype', ContentTypeDirective];
