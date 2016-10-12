'use strict';

var ContentNodeListController =  function ($scope, $state, $location, $uibModal, $stateParams, $filter, $q, $timeout, pageContext, contentNodeService,
										   contentTypeService, Contentnode, mediaService, brandService, workflowService, alignmentService, accountService) {

	var availabilityBackup = null;

	$scope.asc = null;
	$scope.sort = null;

	$scope.filteredFields = {
		checkbox: true,
		image: true,
		title: true,
		contentType: true,
		lastModified: true,
		workflow: true
	};
	$scope.filteredFieldsKeys = Object.keys($scope.filteredFields);

	function initialize() {

		var id = $stateParams.id;

		$scope.hideBreadcrumb = true;

		$scope.noneContentTypesSelected = false;
		$scope.allContentTypesSelected = true;

		$scope.state = $state;
		$scope.typeSummaryFieldNameDictionary = {};

		$scope.quickEditNode = null;
		$scope.quickEditAction = "quickedit";
		$scope.quickEditExpanded = false;
		$scope.data = [];
		$scope.query = $stateParams.q || null;
		$scope.currentPage = 1;
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.filteredContentType = $stateParams.type || [];
		$scope.filteredContentTypesId = [];
		$scope.filteredWorkflow = $stateParams.workflow || [];

		var addAllTypes = $scope.filteredContentType.length === 0;
		var addAllWorkflow = $scope.filteredWorkflow.length === 0;

		$scope.asc = true;

		$scope.globalBrandList = null;
		$scope.selectedBrand = null;
		$scope.selectedIndex = 0;
		$scope.initDate = new Date();
		$scope.isAvailabilityTouched = false;
		
		$scope.contentNodeSuggestions = [];
		$scope.waitForsuggestions = 1000;
		$scope.fetchingSuggestions = false;
		
		pageContext.setTitle("Content");
		alignmentService.setRightColDefaultWidth('449px');

		contentTypeService.list().then(function (results) {
			$scope.contentTypes = {};

			//set initial Checkbox filter options (all selected)
			var ctLen = results.data.length;
			for (var i = 0; i < ctLen;) {
				var contentType = results.data[i];
				$scope.contentTypes[contentType.id] = contentType;
				$scope.typeSummaryFieldNameDictionary[contentType.id] = contentType.summaryFieldName;
				$scope.filteredContentTypesId.push(contentType.id);
				
				if(addAllTypes){
					$scope.filteredContentType.push(contentType.name);
					
				}

				contentType.selected = $scope.filteredContentType.indexOf(contentType.name) > -1;
				
				i++;
			}
			
			// load the list
			refreshData().then(function () {
				if (id) {
					alignmentService.showRightCol(true);
					populateNode(id);
				}
			});
		});

		workflowService.getAllWorkflowStates().then(function (results) {

			var workflowList = results;

			$scope.workflowList = {};

			if(addAllWorkflow){
				$scope.filteredWorkflow = workflowList;
			}

			for(var i = 0; i < workflowList.length; i++){
				var workflowName = workflowList[i];
				var selected = $scope.filteredWorkflow.indexOf(workflowName) > -1;
				$scope.workflowList[workflowName] = {selected : selected};
			}
		});
	}

	$scope.$watch('filteredWorkflow', function () {
		refreshData();
	});

	$scope.$watch(function () {
		return accountService.getActiveAccount();
	}, function () {
		$timeout(initialize, 0);
	}, true);

	$scope.getSummaryFieldNames = function (typeId) {
		return $scope.typeSummaryFieldNameDictionary[typeId];
	};

	$scope.getBrandName = function (brandId) {
		if (!$scope.globalBrandList) {return "";}

		for (var i = 0; i < $scope.globalBrandList.length; i++) {
			var brand = $scope.globalBrandList[i];
			if (brandId === brand.id) {
				return brand.name;
			}
		}
		return "";
	};

	$scope.selectedBrandChanged = function () {

		//set new brandId index on selectedIndex

		if ($scope.selectedBrand && typeof $scope.selectedBrand.id !== 'undefined') {

			for (var idx = 0; idx < $scope.globalBrandList.length; idx++) {
				var item = $scope.globalBrandList[idx];
				if (item.id === $scope.selectedBrand.id) {
					$scope.selectedIndex = idx;
					break;
				}
			}
		}
	};

	$scope.getSuggestions = function(){
		var deferred = $q.defer();

		contentNodeService.searchSuggestions($scope.query, 10, $scope.filteredContentTypesId, $scope.filteredWorkflow).then(function(results){
			console.log("RESOLVE");
			deferred.resolve(results);
		}, function(){
			deferred.reject();
		});
		
		return deferred.promise;
	}
	
	$scope.touchAvailabilityToQuickChange = function () {
		$scope.selectedBrand.selected = true;
		$scope.isAvailabilityTouched = true;
	};


	var resetSelectedBrand = function () {
		$scope.selectedIndex = 0;
		$scope.selectedBrand = $scope.globalBrandList[$scope.selectedIndex];
	};

	$scope.cancelCallback = function () {

		//replace from old data
		$scope.globalBrandList = angular.copy(availabilityBackup);
		resetSelectedBrand();
		$scope.isAvailabilityTouched = false;
	};

	$scope.updateAvailability = function () {

		var availabilityList = [];

		for (var i = 0; i < $scope.globalBrandList.length; i++) {
			var brandItem = $scope.globalBrandList[i];

			if (typeof brandItem.selected !== "undefined" && brandItem.selected && typeof brandItem.fromDate !== "undefined") {

				var brandObj = {
					brandId: brandItem.id,
					fromDate: new Date(brandItem.fromDate).toJSON(),
					expireDate: new Date(brandItem.expireDate).toJSON()
				};
				availabilityList.push(brandObj);
			}
		}
		updateAvailabilityCallback(availabilityList);
	};

	var updateAvailabilityCallback = function (availabilityList) {

		$scope.quickEditNode.availability = availabilityList;

		contentNodeService.update($scope.quickEditNode).then(function () {
			$scope.successMsg = "Availability successfully updated!";

			populateNode($scope.quickEditNode.id);

			$scope.isAvailabilityTouched = false;
		});
	};


	var getAllowedTriggers = function (nodeState) {
		workflowService.getAllowedTriggers(nodeState).then(function (result) {
			$scope.stateTriggers = result;
		});
	};


	$scope.fire = function (trigger) {

		workflowService.fire($scope.quickEditNode.id, trigger).then(function () {
			populateNode($scope.quickEditNode.id);
		});
	};

	var updateBrand = function () {

		getAllowedTriggers($scope.quickEditNode.workflowState);

		brandService.list().then(function (results) {
			$scope.globalBrandList = results;

			//add data
			for (var globalIdx = 0; globalIdx < $scope.globalBrandList.length; globalIdx++) {
				var globalItem = $scope.globalBrandList[globalIdx];

				if ($scope.quickEditNode && $scope.quickEditNode.Availability) {
					for (var nodeIdx = 0; nodeIdx < $scope.quickEditNode.Availability.length; nodeIdx++) {
						var nodeItem = $scope.quickEditNode.Availability[nodeIdx];

						if (globalItem.id === nodeItem.brandId) {

							globalItem.selected = true;
							globalItem.fromDate = new Date(nodeItem.FromDate);
							globalItem.expireDate = new Date(nodeItem.ExpireDate);
							break;
						}
					}
				}
			}

			//set initial availability data
			if ($scope.globalBrandList && $scope.globalBrandList.length > 0) {

				$scope.globalBrandList = $filter('orderBy')($scope.globalBrandList, 'Name');
				availabilityBackup = angular.copy($scope.globalBrandList);
				resetSelectedBrand();
			}

		});

	};

	var populateNode = function (id) {
		var length = $scope.data.length;
		for (var i = 0; i < length; i++) {
			if ($scope.data[i].id === id) {
				$scope.quickEditNode = $scope.data[i];
				updateBrand();
				return;
			}
		}

		if(id) {
			contentNodeService.get(id).then(function (result) {
				$scope.quickEditNode = Contentnode.apiResponseTransformer(result);
				updateBrand();
			});
		}
	};

	$scope.setFilterContentType = function (contentType) {

		if (!$scope.filteredContentType) {
			$scope.filteredContentType = [];
		}
		var contentTypeName = contentType.name;
		var indexOfContentType = $scope.filteredContentType.indexOf(contentTypeName);
		if (indexOfContentType > -1) {
			$scope.filteredContentType.splice(indexOfContentType, 1);
		} else {
			$scope.filteredContentType.push(contentTypeName);
		}


		refreshData();
	};

	$scope.showAll = function (allVisible) {
		$scope.allContentTypesSelected = allVisible;
		$scope.noneContentTypesSelected = !allVisible;

		$scope.filteredContentType = [];
		if($scope.contentTypes) {
			for (var id in $scope.contentTypes) {
				if ($scope.contentTypes.hasOwnProperty(id)) {
					var contentType = $scope.contentTypes[id];
					contentType.selected = allVisible;
					if (allVisible) {
						$scope.filteredContentType.push(contentType.name);
						$scope.filteredContentTypesId.push(id);
					}
				}
			}
		}

		refreshData();
	};

	$scope.setFilterWorkflow = function (workflowName) {
		//var workflowTab = '#tab' + (workflowName ? workflowName : 'all-workflow');
		//$(workflowTab).tab('show');

		if(!$scope.filteredWorkflow){
			$scope.filteredWorkflow = [];
		}
		var indexOfWorkflow =  $scope.filteredWorkflow.indexOf(workflowName);
		if(indexOfWorkflow > -1){
			$scope.filteredWorkflow.splice(indexOfWorkflow, 1);
		}
		else{
			$scope.filteredWorkflow.push(workflowName);
		}

		refreshData();
	};

	$scope.setFilterFields = function (filterName) {

		$scope.filteredFields[filterName] = !$scope.filteredFields[filterName];
	};

	$scope.filterVisibleContentTypes = function (contentTypes) {
		var result = {};
		angular.forEach(contentTypes, function(value, key) {
			if (value.visible) {
				result[key] = value;
			}

			if(!value.selected){
				$scope.allContentTypesSelected = false;
			}
			else{
				$scope.noneContentTypesSelected = false;
			}
		});
		return result;
	};



	$scope.getImageUrl = function (field) {
		return mediaService.getImageUrl(field, 'thumb');
	};

	$scope.pageChanged = function () {
		refreshData();
	};

	$scope.showQuickEditForm = function (contentNode) {

		alignmentService.showRightCol();

		$scope.quickEditNode = contentNode;
		$location.search("id", contentNode.id);
		populateNode(contentNode.id);
	};

	$scope.closeQuickEditForm = function () {

		if ($scope.quickEditExpanded) {
			$scope.toggleQuickEditMode();
		}

		alignmentService.hideRightCol();

		$scope.quickEditNode = null;
		$location.search("id", null);
	};

	$scope.performSearch = function () {
		refreshData();
	};

	$scope.onUpdateDesignation = function (contentId, field, value) {

		var fieldObj = {
			contentId: contentId,
			fieldName: field.name,
			fieldValue: value
		};

		contentNodeService.updateField(fieldObj).then(function () {
			$scope.successMsg = "Field " + field.name + " successfully updated!";
			refreshData();
		});
	};

	$scope.sortList = function (sortField) {
		if ($scope.sort === sortField) {
			$scope.asc = !$scope.asc;
		} else {
			$scope.asc = true;
		}

		$scope.sort = sortField;

		refreshData();
	};

	$scope.toggleQuickEditMode = function () {

		//tell ContentNodeDirective that expanded changed
		$scope.quickEditExpanded = !$scope.quickEditExpanded;

		if ($scope.quickEditExpanded) {
			alignmentService.setRightColFullWidth();
		}
		else {
			alignmentService.setRightColDefaultWidth();
		}

	};

	function refreshData() {

		var deferred = $q.defer();

		// wait for content types to load
		if (!$scope.contentTypes) {
			deferred.reject();
			return deferred.promise;
		}

		$scope.data = [];
		$scope.offset = null;
		$scope.loading = true;

		$location.search("q", $scope.query);
		$location.search("type", $scope.filteredContentType);
		$location.search("workflow", $scope.filteredWorkflow);

		var query = $scope.query;
		if (query) {
			query += "*";
		}

		if ($scope.contentTypes) {

			//add selected content types to auxiliar list
			var auxSelectedContentTypeList = [];
			for (var c in $scope.contentTypes) {
				if($scope.contentTypes.hasOwnProperty(c)) {
					var contentType = $scope.contentTypes[c];

					if (contentType.selected && contentType.visible) {
						auxSelectedContentTypeList.push(contentType.id);
					}
				}
			}
			//TODO replace with only one for loop
			var auxLen = auxSelectedContentTypeList.length;
			if (auxLen > 0) {

				for (var j = 0; j < auxLen; j++) {
					var contentTypeId = auxSelectedContentTypeList[j];

					if (j === 0 && !query) {
						query = '(contentTypeId:"' + contentTypeId + '"';
					}
					else if (j === 0 && query) {
						query += ' AND (contentTypeId:"' + contentTypeId + '"';
					}
					else if (j > 0) {
						query += ' OR contentTypeId:"' + contentTypeId + '"';
					}

					if (j === (auxLen - 1)){
						query += ') ';
					}
				}
			} else
			{
				if (query) {
					query += ' AND (contentTypeId:"null")';
				}
				else {
					query = '(contentTypeId:"null")';
				}
			}
		}


		contentNodeService.search({operator: 1, value: query}, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc, $scope.filteredWorkflow)
			.then(function (result) {
					$scope.loading = false;
					$scope.data = Contentnode.apiResponseTransformer(result.data);
					$scope.totalItems = result.total;
					deferred.resolve();
				},
				function (reason) {
					$scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occured while loading the list of content!");
					deferred.reject();
				});
		return deferred.promise;
	}

	$scope.openDeleteModal = function (contentId) {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/contentNode/deleteNodeModal.html',
			controller: 'deleteNodeModalController',
			resolve: {
				contentId: function () {
					return contentId;
				}
			}
		});

		modalInstance.result
			.then(function () {
				$scope.closeQuickEditForm();
				refreshData();

			}, function () {

			});
	};


	initialize();
};
module.exports = ['$scope', '$state', '$location', '$uibModal', '$stateParams', '$filter', '$q', '$timeout', 'pageContext', 'contentNodeService',
	'contentTypeService', 'Contentnode', 'mediaService', 'brandService', 'workflowService', 'alignmentService', 'accountService', ContentNodeListController];
