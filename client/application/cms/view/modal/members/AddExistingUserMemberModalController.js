'use strict';

var AddExistingUserMemberModalController = function ($scope, $uibModalInstance, memberService, defaultMemberRoles) {

	function initialize() {
		$scope.defaultMemberRoles = defaultMemberRoles;
		$scope.username = "";
		$scope.popUpTitle = "Add User";
	}

	$scope.ok = function () {
		memberService.addExistingUser({
			"user": {"id": $scope.username},
			"roles": $scope.roles
		}).then(function (result) {
			$uibModalInstance.close(result);
		}, function (err) {
			$scope.errorMsg = err.message;
		});

	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.toggleMemberRolesSelection = function (role) {
		if (!$scope.roles) {
			$scope.roles = [];
		}

		var index = $scope.roles.indexOf(role);

		if (index > -1) {
			$scope.roles.splice(index, 1);
		}
		else {
			$scope.roles.push(role);
		}

	}

	initialize();
};

module.exports = ['$scope', '$uibModalInstance', 'memberService', 'defaultMemberRoles', AddExistingUserMemberModalController];
