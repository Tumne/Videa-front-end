
'use strict';

var ContentNodeBucketPickerModalController = function ($scope, $uibModalInstance, $filter, $q, bucketService, pageContext, values, edit, bucketsData, bucketsNames, saveFunction) {

	$scope.data = [];
	$scope.valuesClone = [];
	$scope.chosenBucket = false;
	$scope.createdBucketName = "";
	$scope.selectedBucket = undefined;
	$scope.isNewBucket = false;

	$scope.saveChanges = function () {

	};

	function initialize() {

		$scope.loadingBucketInit = true;
		$scope.values = values;
		$scope.edit = edit;
		$scope.bucketsNames = bucketsNames;
		$scope.bucketsData = bucketsData;

		$scope.tempSelectedBucket = undefined;


		$scope.bucketDates = {};
		$scope.bucketDates.noRestrictions = true;
		$scope.bucketDates.noExpiry = true;

		//$scope.bucketDates.fromDate =  $filter('date')(new Date(), "yyyy-MM-dd");

		if (values && values.bucketId) {
			$scope.selectedBucket = $scope.bucketsNames[values.bucketId];
			$scope.selectedBucketId = values.bucketId;
			$scope.bucketDates.fromDate = values.fromDate;
			$scope.bucketDates.expireDate = values.expireDate;
		}

		$scope.loadingBucketInit = false;
	}

	initialize();

	$scope.calendar = {};


	$scope.$watch('bucketDates.fromDate', function () {
		if ($scope.loadingBucketInit) {
			return;
		}

		$scope.bucketDates.noRestrictions = (!$scope.bucketDates ||
		(!$scope.bucketDates.fromDate || $scope.bucketDates.fromDate === ""));
	});

	$scope.$watch('bucketDates.expireDate', function () {
		if ($scope.loadingBucketInit) {
			return;
		}

		$scope.bucketDates.noExpiry = (!$scope.bucketDates || !$scope.bucketDates.expireDate || $scope.bucketDates.expireDate === "");
	});

	$scope.changeCalendar = function (calendar) {

		for (var key in $scope.calendar) {
			if ($scope.calendar.hasOwnProperty(key)) {
				$scope.calendar[key] = false;
			}
		}
		$scope.calendar[calendar] = true;
	};

	$scope.updateWithRestrictions = function () {
		if ($scope.bucketDates.noRestrictions) {
			$scope.prevDates = $scope.bucketDates;
			$scope.bucketDates.fromDate = undefined;
		}
	};

	$scope.updateWithExpiry = function () {
		if ($scope.bucketDates.noExpiry) {
			$scope.prevDates = $scope.bucketDates;
			$scope.bucketDates.expireDate = undefined;
		}
	};

	$scope.selectedNewBucket = function () {
		$scope.chosenBucket = true;
		if ($scope.tempSelectedBucket !== 'new') {
			$scope.isNewBucket = false;
			$scope.tempSelectedBucketId = JSON.parse($scope.tempSelectedBucket).id;
		}
		else {
			$scope.isNewBucket = true;
		}
	};

	var addNewBucket = function () {

		var deferred = $q.defer();
		var bucket = {name: $scope.createdBucketName};
		bucketService.add(bucket)
			.then(function (result) {
				deferred.resolve(result);
			}, function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	$scope.ok = function () {
		var selected = $scope.tempSelectedBucketId ? $scope.tempSelectedBucketId : $scope.selectedBucketId;

		if (!selected && !$scope.isNewBucket) {
			$scope.errorMessage = "Please select a bucket";
			return;
		}
		else {
			$scope.errorMessage = undefined;
		}

		var fromDate = $filter('date')($scope.bucketDates.fromDate, "yyyy-MM-dd");
		var expireDate = $filter('date')($scope.bucketDates.expireDate, "yyyy-MM-dd");

		if ($scope.isNewBucket) {
			if ($scope.createdBucketName) {
				addNewBucket().then(function (bucket) {
					selected = bucket.id;
					saveFunction(selected, fromDate, expireDate, bucket.name);
					$uibModalInstance.close();
				});
			}
			else {
				pageContext.showAlertDanger("Missing name of new bucket!");
				$uibModalInstance.close();
			}
		}
		else {
			saveFunction(selected, fromDate, expireDate);
			$uibModalInstance.close();
		}
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};

module.exports = ['$scope', '$uibModalInstance', '$filter', '$q', 'bucketService', 'pageContext', 'values', 'edit', 'bucketsData', 'bucketsNames', 'saveFunction', ContentNodeBucketPickerModalController];
