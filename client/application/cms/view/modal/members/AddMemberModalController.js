'use strict';

var AddMemberModalController = function ($scope, $uibModalInstance, user, popUpTitle, roles, okFunction, defaultUserRoles, defaultMemberRoles) {

	function initialize() {
		$scope.defaultUserRoles = defaultUserRoles
		$scope.defaultMemberRoles = defaultMemberRoles
		if (roles) {
			$scope.roles = roles;
		}
		if (!user) {
			$scope.user = {
				"username": "",
				"email": "",
				"firstName": "",
				"lastName": "",
				"password": "",
				"roles": []
			};
		} else {
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

	$scope.toggleUserRolesSelection = function (role) {
		if (!$scope.user.roles) {
			$scope.user.roles = [];
		}

		$scope.user.roles = toggleRolesSelectionHelper($scope.user.roles, role);
	};

	$scope.toggleMemberRolesSelection = function (role) {
		if (!$scope.roles) {
			$scope.roles = [];
		}

		$scope.roles = toggleRolesSelectionHelper($scope.roles, role);
	};

	function toggleRolesSelectionHelper(roles, role) {

		var index = roles.indexOf(role);

		if (index > -1) {
			roles.splice(index, 1);
		}
		else {
			roles.push(role);
		}

		return roles;
	}

	initialize();
};

module.exports = ['$scope', '$uibModalInstance', 'user', 'popUpTitle', 'roles', 'okFunction', 'defaultUserRoles', 'defaultMemberRoles', AddMemberModalController];
