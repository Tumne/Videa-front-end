'use strict';


var AddUserModalController = function ($scope, $uibModalInstance, user, popUpTitle, okFunction, defaultRoles) {

	function initialize() {
		// Default user roles
		$scope.defaultRoles = defaultRoles;

		if(!user) {
			$scope.user = {
				"username": "",
				"email": "",
				"firstName": "",
				"lastName": "",
				"password": "",
				"roles" : []
			};
		}else{
			$scope.user = user;
		}
		$scope.popUpTitle = popUpTitle;
	}

	$scope.ok = function () {
		okFunction($scope.user, $scope.roles).then(function (result) {
			$uibModalInstance.close(result);
		}, function (err) {
			$scope.errorMsg = err.message;
			//		$uibModalInstance.dismiss('error');
		});

	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.toggleRolesSelection = function(role){
		if(!$scope.user.roles){
			$scope.user.roles = [];
		}
		var index = $scope.user.roles.indexOf(role);

		if(index > -1){
			$scope.user.roles.splice(index, 1);
		}
		else {
			$scope.user.roles.push(role);
		}
	};

	initialize();
};

module.exports = ['$scope', '$uibModalInstance', 'user', 'popUpTitle', 'okFunction', 'defaultRoles', AddUserModalController];
