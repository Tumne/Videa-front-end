'use strict';

var BucketsController = function ($scope, $stateParams, $uibModal, $location, $q, bucketService, pageContext) {

	function initialize() {

		$scope.loading = false;
		$scope.loadingBucket = false;
		$scope.offset = null;
		$scope.batchSize = 10;

		var id = $stateParams.id;
		$scope.query = null;
		$scope.currentPage = $stateParams.page || 1;
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.asc = true;
		$scope.sort = 'name';
		$scope.hideBreadcrumb = true;

		pageContext.setTitle("Catalogs");

		$scope.data = [];
		$scope.bucketProperties= [{ field: "name", label : "Bucket"}, { field: "modifiedDate", label: "Last Modified"}];
		$scope.quickEditExpanded = false;
		$scope.quickEditBucket = null;

		$scope.populateBucketList().then(function(){
			if(id){
				populateBucket(id);
			}

		}, function(){

		});
	}

	$scope.pageChanged = function () {
		$scope.populateBucketList();
	};

	$scope.sortBuckets = function () {
		$scope.offset = null;
		$scope.data = [];
		$scope.populateBucketList();
	};

	$scope.populateBucketList = function () {
		var deferred = $q.defer();

		if ($scope.offset && jQuery.isEmptyObject($scope.offset)){
			deferred.resolve();
			return deferred.promise;
		}

		$scope.loading = true;

		$location.search("page", $scope.currentPage);


		bucketService.search($scope.query, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc)
			.then(function (result) {
					$scope.loading = false;
					$scope.data = result.data;
					$scope.totalItems = result.total;
					deferred.resolve();
				},
				function (reason) {
					$scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occurred while loading the list of buckets!");
					deferred.reject();
				});
		
		return deferred.promise;
	};


	$scope.addNewBucket = function(bucket){

		var deferred = $q.defer();

		bucketService.add(bucket)
			.then(function (result) {

				deferred.resolve(result);
			}, function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};


	$scope.deleteBucket = function(id){
		var deferred = $q.defer();

		bucketService.del(id).then(function (result) {
				pageContext.showAlertSuccess("Bucket successfully deleted!");
				$scope.quickEditBucket = null;
				$location.search("id", null);
				deferred.resolve(result);
			},
			function(err){
				deferred.reject(err);
			});
		return deferred.promise;
	};

	$scope.deleteBucketModal = function(bucketId){

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/layout/deleteContentModalController.html',
			controller: 'deleteContentModalController',
			resolve: {
				contentId: function () { return bucketId; },
				deleteHandler : function() {return $scope.deleteBucket;}

			}
		});

		modalInstance.result
			.then(function () {
				$scope.populateBucketList();

			}, function () {

			});
	};

	var populateBucket = function(id){

		var length = $scope.data.length;
		for (var i = 0; i < length; i++) {
			if ($scope.data[i].id === id) {
				$scope.quickEditBucket = $scope.data[i];
				$location.search("id", id);
				$scope.loadingBucket = false;
				return;
			}
		}
		$scope.loadingBucket = true;

		bucketService.get(id).then(function(bucket){
			$location.search("id", id);
			$scope.quickEditBucket = bucket;
			$scope.loadingBucket = false;
		});
	};

	$scope.getBucket = function(obj){
		populateBucket(obj.id);
	};

	$scope.openAddBucketModal = function () {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/buckets/addBucket.html',
			controller: 'addBucketModalController',

			resolve: {
				okFunction: function(){return $scope.addNewBucket;},
				bucket : function(){ return {};}
			}
		});

		modalInstance.result
			.then(function (data) {
				if (data) {
					$scope.pageChanged();
				}
			}, function () {
			});
	};

	initialize();

};
module.exports = ['$scope', '$stateParams', '$uibModal', '$location', '$q', 'bucketService', 'pageContext', BucketsController];
