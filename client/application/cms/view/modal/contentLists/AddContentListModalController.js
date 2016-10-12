'use strict';

var AddContentListModalController =  function ($scope, $uibModalInstance, contentList,  okFunction) {

	function initialize() {
		if(!contentList) {
			$scope.contentList = {"name": ""};
		}else{
			$scope.contentList = contentList;
		}
		$scope.popUpTitle = "Add Content List";
	}

	$scope.ok = function () {
		okFunction($scope.contentList).then(function (result) {
			$uibModalInstance.close(result);
		}, function (err) {
			$scope.errorMsg = err.message;
		});

	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	initialize();
};

module.exports =  ['$scope', '$uibModalInstance', 'contentList', 'okFunction', AddContentListModalController];
