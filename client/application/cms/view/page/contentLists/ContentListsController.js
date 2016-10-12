'use strict';

var ContentListsController = function ($scope, $stateParams, $uibModal, $location, $q, contentListService, pageContext, contentTypeService) {

	function initialize() {

		$scope.loading = false;
		$scope.loadingContentList = false;
		$scope.offset = null;
		$scope.batchSize = 10;

		var id = $stateParams.id;
		$scope.query = null;
		$scope.currentPage = $stateParams.page || 1;
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.asc = true;
		$scope.sort = 'name';

		
		pageContext.setTitle("Collections");
		$scope.hideBreadcrumb = true;

		$scope.data = [];
		$scope.contentListProperties= [{ field: "name", label : "Content List"}, { field: "modifiedDate", label: "Last Modified"}];
		$scope.quickEditExpanded = false;
		$scope.quickEditContentList = null;

		$scope.populateContentListList().then(function(){
			if(id){
				populateContentList(id);
			}
		}, function(){

		});

		contentTypeService.list().then(function (results) {
			$scope.contentTypes = {};

			//set initial Checkbox filter options (all selected)
			var ctLen = results.data.length;
			for (var i = 0; i < ctLen; i++) {
				var contentType = results.data[i];
				$scope.contentTypes[contentType.id] = contentType;
			}
		});
	}

	$scope.pageChanged = function () {
		$scope.populateContentListList();
	};

	$scope.sortContentLists = function () {
		$scope.offset = null;
		$scope.data = [];
		$scope.populateContentListList();
	};

	$scope.populateContentListList = function () {
		var deferred = $q.defer();

		if ($scope.offset && jQuery.isEmptyObject($scope.offset)){
			deferred.resolve();
			return deferred.promise;
		}

		$scope.loading = true;

		$location.search("page", $scope.currentPage);

		contentListService.search($scope.query, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc)
			.then(function (result) {
					$scope.loading = false;
					$scope.data = result.data;
					$scope.totalItems = result.total;
					deferred.resolve();
				},
				function (reason) {
					$scope.loading = false;
					pageContext.showAlertDanger(reason, "An error occurred while loading the list of content lists!");
					deferred.reject();
				});

		return deferred.promise;
	};


	$scope.deleteContentList = function(id){
		var deferred = $q.defer();

		contentListService.del(id).then(function (result) {
				pageContext.showAlertSuccess("Content list successfully deleted!");
				$scope.quickEditContentList = null;
				$location.search("id", null);
				deferred.resolve(result);
			},
			function(err){
				deferred.reject(err);
			});
		return deferred.promise;
	};

	$scope.deleteContentListModal = function(id){
		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/layout/deleteContentModalController.html',
			controller: 'deleteContentModalController',
			resolve: {
				contentId: function () { return id; },
				deleteHandler : function() {return $scope.deleteContentList;}

			}
		});

		modalInstance.result
			.then(function () {
				$scope.populateContentListList();
			}, function () {

			});
	};

	$scope.getContentList = function (obj){
		populateContentList(obj.id);
	};

	var populateContentList = function(id){

		var length = $scope.data.length;
		for (var i = 0; i < length; i++) {
			if ($scope.data[i].id === id) {
				$scope.quickEditContentList = $scope.data[i];
				$location.search("id", id);
				$scope.loadingContentList = false;
				return;
			}
		}
		$scope.loadingContentList = true;

		contentListService.get(id).then(function(contentList){
			$location.search("id", id);
			$scope.quickEditContentList = contentList;
			$scope.loadingContentList = false;
		});
	};

	$scope.addNewContentList = function(contentList){

		var deferred = $q.defer();

		contentListService.add(contentList)
			.then(function (result) {

				deferred.resolve(result);
			}, function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	$scope.openAddContentListModal = function () {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/contentLists/addContentList.html',
			controller: 'addContentListModalController',

			resolve: {
				okFunction: function(){return $scope.addNewContentList;},
				contentList : function(){ return {};}
			}
		});

		modalInstance.result
			.then(function (data) {
				if (data) {
					$scope.pageChanged();
				}
			});
	};

	initialize();
};

module.exports =  ['$scope', '$stateParams', '$uibModal', '$location', '$q', 'contentListService', 'pageContext', 'contentTypeService', ContentListsController ];
