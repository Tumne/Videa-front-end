'use strict';

var ContentNodeAvailabilityModalController = function ($scope, $uibModalInstance, content, globalBucketList) {

	$scope.content = content;
	$scope.globalBucketList = globalBucketList;

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.updateAvailability = function () {
		$uibModalInstance.close($scope.globalBucketList); //updated inside directive
	};

	$scope.calendar = {};

	$scope.changeCalendar = function (calendar) {
		for (var key in $scope.calendar) {
			if($scope.calendar.hasOwnProperty(key)) {
				$scope.calendar[key] = false;
			}
		}
		$scope.calendar[calendar] = true;
	};

	function initialize() {

	}

	initialize();
};

module.exports = ['$scope', '$uibModalInstance', 'content', 'globalBucketList', ContentNodeAvailabilityModalController];
