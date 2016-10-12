'use strict';

var MemberController = function ($scope, $stateParams, $location, $window, pageContext, userService) {

	function initialize() {
		var id = $stateParams.id;

		$scope.data = null;
		if (id) {
			pageContext.setTitle("Edit Member");
			userService.get(id).then(function (result) {
				$scope.data = result;
			});
		}
		else {
			pageContext.setTitle("Add Member");
			$scope.data = userService.createInstance();
		}
	}
	
	$scope.cancelCallback = function () {
		$window.history.back();
	};

	initialize();

};

module.exports = ['$scope', '$stateParams', '$location', '$window', 'pageContext', 'userService', MemberController];
