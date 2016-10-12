'use strict';

var HomeController = function ($scope, pageContext, accountService) {

	function initialize() {
		pageContext.setTitle("Dashboard");

		$scope.hasAccount = accountService.getActiveAccount() !== null;

	}

	initialize();
};

module.exports = ['$scope', 'pageContext', 'accountService', HomeController];
