'use strict';


var ContentTypeListController = function ($scope, $q, $uibModal, $stateParams, $location, $filter, pageContext, contentTypeService, alignmentService, contentTypeUnicastService) {

	$scope.quickEditType = null;
	$scope.quickEditExpanded = false;
	$scope.quickEditAction = "quickedit";

	function initialize() {

		$scope.hideBreadcrumb = true;
		$scope.loadingType = false;
		pageContext.setTitle("Content Types");

		$scope.contentTypeProperties= [{ field: "name", label : "Type"}, { field: "modifiedDate", label: "Last Modified"}];
		$scope.contentTypes = null;

		var id = $stateParams.id;
		$scope.currentPage = $stateParams.page || 1;
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.asc = true;
		$scope.sort = 'name';

		$scope.loadContentTypes().then(function(){
			if(id){
				populateType(id);
			}
		});
	}

	$scope.sortContentTypes = function(){
		$scope.contentTypes = [];
		$scope.loadContentTypes();
	};

	$scope.pageChanged = function () {
		$scope.loadContentTypes();
	};

	var populateType = function(id){
		var length = $scope.contentTypes.length;
		for (var i = 0; i < length; i++) {
			if ($scope.contentTypes[i].id === id) {
				$scope.quickEditType = $scope.contentTypes[i];
				$location.search("id", id);
				return;
			}
		}
		$scope.loadingType = true;
		contentTypeService.get(id).then(function(type){
			$location.search("id", id);
			$scope.quickEditType = type;
			$scope.loadingType = false;
		});
	};

	$scope.loadContentTypes = function () {
		var deferred = $q.defer();

		contentTypeService.search($scope.query, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc)
			.then(function (results) {
					$scope.contentTypes = results.data;
					$scope.totalItems = $scope.contentTypes.length;
					deferred.resolve();
				},
				function (reason) {
					$scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occurred while loading the list of content types!");
					deferred.reject();
				});
		
		return deferred.promise;
	};

	$scope.openAddContentTypeModal = function () {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/contentType/addContentType.html',
			controller: 'addContentTypeModalController',

			resolve: {}
		});

		modalInstance.result
			.then(function (data) {
				if (data) {
					//loadContentTypes();
					contentTypeUnicastService.broadcastUpdateContentTypesMessage();
				}
			}, function () {
			});
	};

	$scope.$on('handleUpdateContentTypes', function () {
		$scope.loadContentTypes();
	});

	$scope.quickEditExpanded = function () {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/contentType/addContentType.html',
			controller: 'addContentTypeModalController',

			resolve: {}
		});

		modalInstance.result
			.then(function (data) {
				if (data) {
					//loadContentTypes();
					contentTypeUnicastService.broadcastUpdateContentTypesMessage();
				}
			}, function () {
			});
	};

	$scope.deleteContentType = function(contentTypeId){
		var deferred = $q.defer();
		contentTypeService.del(contentTypeId).then(function (result) {
			pageContext.showAlertSuccess("Content type successfully deleted!");
			$scope.quickEditType = null;
			$location.search("id", null);
			deferred.resolve(result);
		}, function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	$scope.openDeleteModal = function (contentTypeId) {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/layout/deleteContentModalController.html',
			controller: 'deleteContentModalController',
			resolve: {
				contentId: function () { return contentTypeId; },
				deleteHandler: function () { return $scope.deleteContentType; }
			}
		});

		modalInstance.result
			.then(function () {
				//		$scope.successMsg = "Content successfully deleted!";leted!";

				$scope.loadContentTypes();

			}, function () {

			});
	};

	$scope.getType = function(obj) {
		populateType(obj.id);
	};

	initialize();
};

module.exports = ['$scope', '$q', '$uibModal', '$stateParams', '$location', '$filter', 'pageContext', 'contentTypeService', 'alignmentService', 'contentTypeUnicastService', ContentTypeListController];
