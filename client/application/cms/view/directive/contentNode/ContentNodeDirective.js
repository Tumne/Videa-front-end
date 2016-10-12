'use strict';

var ContentNodeDirective = function ($window, $filter, $q, pageContext, contentNodeService, bucketService, alignmentService, Contentnode) {

	function link(scope, element, attrs) {

		function initialize() {

			var id = scope.contentId;
			scope.viewMode = scope.action === 'add' ? 'edit' : scope.action;
			scope.PreventSave = false;

			scope.availabilityField = {
				id: "availability",
				title: "Availability"
			};

			scope.designationField = {
				id: "designation",
				title: "Designation"
			};

			if (scope.action !== 'add') {
				if (id) {
					scope.isLoading = true;
					contentNodeService.get(id).then(function (result) {
						scope.isLoading = false;
						reload(result);
					});
				} else if (scope.content) {
					if (!scope.content.isStructureLoaded()) {
						reloadStructure(scope.content);
					} else {
						scope.data = scope.content;
						scope.designationField.title = scope.data.type.designationLabel;
					}
				}
			} else {
				if (id) {
					scope.isLoading = true;
					contentNodeService.instantiate(id)
						.then(function (result) {
							scope.isLoading = false;
							reload(result);
						}, function (reason) {
							scope.isLoading = false;
							pageContext.showAlertDanger(reason, "An error occured while creating the new content of type " + id);
						});
				} else {
					pageContext.showAlertDanger("Missing content type id parameter.");
				}
			}

			bucketService.list().then(function (results) {
				scope.bucketsData = results.data;
				scope.bucketsNames = {};
				for(var i = 0; i <  scope.bucketsData.length; i++){
					scope.bucketsNames[ scope.bucketsData[i].id] =  scope.bucketsData[i].name;
				}
			});
		}

		// TODO: Maybe check if content node structure doesn't change
		scope.$watch('content', function (newValue, oldValue) {
			if (newValue && (!oldValue || newValue.id !== oldValue.id)) {
				initialize();
			}
		});

		// TODO: Maybe check if content node structure doesn't change
		scope.$watch('contentId', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				initialize();
			}
		});


		scope.showTab = function (t) {
			alignmentService.showTab(t);
		};

		scope.saveCallback = function () {

			//console.log("DATA",scope.data);

			if(scope.data && (!scope.data.availabilities || scope.data.availabilities.length === 0)){
				pageContext.showAlertDanger("Add at least one bucket!");
				return;
			}

			if (scope.action === 'add') {
				contentNodeService.add(scope.data).then(function (result) {
					pageContext.showAlertSuccess("Content successfully created!");
					reload(result);
				});
			}
			else {
				contentNodeService.update(scope.data).then(function (result) {
					pageContext.showAlertSuccess("Content successfully updated!");
					reload(result);
				});
			}
		};

		scope.saveAndCloseCallback = function () {
			if (scope.Add) {
				if(scope.data && (!scope.data.availabilities || scope.data.availabilities.length === 0)){
					pageContext.showAlertDanger("Add at least one bucket!");
					return;
				}

				contentNodeService.add(scope.data).then(function (result) {

					pageContext.showAlertSuccess("Content successfully created!");
					reload(result);
					//location.path('/content');
				});
			}
			else {
				contentNodeService.update(scope.data).then(function (result) {
					pageContext.showAlertSuccess("Content successfully updated!");
					reload(result);
					//$location.path('/content');
				});
			}
		};

		scope.deleteCallback = function () {
			contentNodeService.del(scope.data.id).then(function () {
				pageContext.showAlertSuccess("Content successfully deleted!");

				//$location.path('/content');
			});
		};

		scope.cancelCallback = function () {
			$window.history.back();
		};

		scope.onUpdateDesignation = function (contentId, field, value) {

			if (scope.action === 'add') {
				return;
			}

			var fieldObj = {
				designation: value
			};

			contentNodeService.update(contentId, fieldObj).then(function () {
				pageContext.showAlertSuccess("Designation successfully updated!");

			}, function (reason) {
				pageContext.showAlertDanger(reason, "An error occured while updating designation");
			});
		};

		scope.onUpdateAvailability = function (contentId, availabilityList) {

			var deferred = $q.defer();
			if(scope.data && !scope.data.availabilities){
				scope.data.availabilities = [];
			}

			var prevAvailabilities = JSON.parse(JSON.stringify(scope.data.availabilities));
			availabilityList.fromDate = $filter('date')(availabilityList.fromDate, "yyyy-MM-dd");
			availabilityList.expireDate = $filter('date')(availabilityList.expireDate, "yyyy-MM-dd");
			
			scope.data.availabilities = availabilityList;

			if (scope.action === 'quickedit') {
				var fieldObj = {
					availabilities: availabilityList
				};

				contentNodeService.update(contentId, fieldObj).then(function (result) {
					pageContext.showAlertSuccess("Availability dates successfully updated!");
					deferred.resolve(result);

				}, function (reason) {
					pageContext.showAlertDanger(reason, "An error occured while updating availability dates");
					scope.data.availabilities = prevAvailabilities;
					deferred.reject(reason);
				});
			}
			else{
				deferred.resolve();
			}
			return deferred.promise;
		};

		scope.onUpdateField = function (contentId, field, value) {
		
			if (scope.action === 'add') {
				return;
			}

			var fieldObj = {
				contentId: contentId,
				fieldId: field.id,
				fieldValue: value
			};

			contentNodeService.updateField(fieldObj).then(function () {
				pageContext.showAlertSuccess("Field " + field.title + " successfully updated!");
				scope.isLoading = true;
				contentNodeService.get(contentId).then(function (result) {
					scope.isLoading = false;
					reload(result);
				});
			}, function (reason) {
				pageContext.showAlertDanger(reason, "An error occured while updating the field " + field.title);
			});
		};

		scope.onUpdateWorkflow = function (contentId, state, trigger) {

			contentNodeService.nextState(contentId, trigger).then(function (result) {
				pageContext.showAlertSuccess("Content's state successfully updated!");
				if (scope.data && scope.data.id === contentId) {
					scope.data.workflowState = result;
				}
			}, function (reason) {
				pageContext.showAlertDanger(reason, "An error occured while updating content's state");
			});
		};

		function reloadStructure(content) {
			scope.isLoading = true;
			content.loadStructure().then(
				function (result) {

					result.setupFieldDirectives(scope.viewMode, 'field', 'data', 'expanded', 'onUpdateField');

					scope.isLoading = false;
					scope.data = result;
					scope.designationField.title = scope.data.type.designationLabel;
					
					scope.data.type.fieldGroups.forEach(function (group) {
						group.rows = [];
						
						var width = 0;
						var rowIndex = 0;
						for (var i = 0; i < group.fields.length; i++) {
							
							if (group.rows[rowIndex] && group.rows[rowIndex].cols && group.rows[rowIndex].cols.length > 0 && (width >= 12 || (width + group.fields[i].Size > 12))) {
								width = 0;
								rowIndex = rowIndex + 1;
							}
							width = width + group.fields[i].Size;

							if (!group.rows[rowIndex]) {
								group.rows[rowIndex] = {cols: []};
							}
							group.rows[rowIndex].cols.push(group.fields[i]);
						}
					});
				},
				function (reason) {
					scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occured while loading the content!");
				});
		}

		function reload(result) {
			var content = Contentnode.apiResponseTransformer(result);
			reloadStructure(content);
		}

		initialize();
	}


	return {
		restrict: 'E',
		scope: {
			contentId: '=',
			content: '=',
			action: '=',
			expanded: '@expanded'
		},
		templateUrl: 'cms/view/directive/contentNode/contentNodeDirective.html',
		link: link
	};
};

module.exports = ['$window', '$filter', '$q', 'pageContext', 'contentNodeService', 'bucketService', 'alignmentService', 'Contentnode', ContentNodeDirective];
