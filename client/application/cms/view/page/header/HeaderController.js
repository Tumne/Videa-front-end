'use strict';

var HeaderController = function ($scope, $location, pageContext, principal, accountService) {

	function initialize() {
		$scope.user = {firstName: "Loading", lastName: "User"};
		$scope.page = pageContext;
		$scope.selectedAccountId = $location.search().a;

		$scope.accounts = [];
		accountService.getAccounts().then(function (result) {
			$scope.accounts = result.data;

			if ($scope.accounts) {
				$scope.accounts.forEach(function(a) {
					if (a.id === $scope.selectedAccountId) {
						$scope.activeAccount = a;
					}
				});
			}

		}, function (reason) {
			if(reason.message && reason.message.indexOf("is not connected to any account") === -1){
				pageContext.showAlertDanger(reason);
			}
		});

		$scope.changeAccount = function (account) {
			accountService.setActiveAccount(account);
		};

		$scope.$watch(function () {
			return accountService.getActiveAccount();
		}, function (account) {
			//get active account name
			$scope.activeAccount = account ? account : {name :'No accounts'};
		}, true);

		principal.identity().then(function (data) {
			$scope.user = data;

		}, function (reason) {
			pageContext.showAlertDanger(reason);
		});

	}

	initialize();
};

module.exports = ['$scope', '$location', 'pageContext', 'principal', 'accountService', HeaderController];
