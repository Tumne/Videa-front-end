"use strict";

var AccountsController = function ($scope, $stateParams, $location, $uibModal, $q, accountService, pageContext) {

	function initialize() {

		$scope.loading = false;
		$scope.loadingAccount = false;
		$scope.offset = null;
		$scope.batchSize = 10;

		var id = $stateParams.id;
		$scope.query = null;
		$scope.currentPage = $stateParams.page || 1;
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.asc = true;
		$scope.sort = 'name';

		pageContext.setTitle("Accounts");

		$scope.data = [];
		$scope.accountProperties = [{field: "name", label: "Name"},
			{field: "modifiedDate", label: "Last Modified"}];
		$scope.quickEditExpanded = false;
		$scope.quickEditAccount = null;
		$scope.populateAccountList().then(function () {
			if (id) {
				populateAccount(id);
			}
		});
	}

	$scope.pageChanged = function () {
		$scope.populateAccountList();
	};

	$scope.sortAccounts = function () {
		$scope.offset = null;
		$scope.data = [];
		$scope.populateAccountList();
	};

	$scope.populateAccountList = function () {

		var deferred = $q.defer();

		if ($scope.offset && jQuery.isEmptyObject($scope.offset)) {
			deferred.resolve();
			return deferred.promise;
		}

		$location.search("page", $scope.currentPage);
		$scope.loading = true;

		accountService.search($scope.query, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc)
			.then(function (result) {
					$scope.loading = false;
					$scope.data = result.data;
					$scope.totalItems = result.total;
					deferred.resolve();
				},
				function (reason) {
					$scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occured while loading the list of accounts!");
					deferred.reject();
				});

		return deferred.promise;
	};

	$scope.addNewAccount = function (account) {

		var deferred = $q.defer();

		accountService.add(account)
			.then(function (result) {

				deferred.resolve(result);
			}, function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	$scope.openAddAccountModal = function () {

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'cms/view/modal/account/addAccount.html',
			controller: 'addAccountModalController',

			resolve: {
				okFunction: function () {
					return $scope.addNewAccount;
				},
				account: function () {
					return {};
				},
				popUpTitle: function () {
					return "Add Account";
				}
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

	$scope.deleteAccount = function (id) {
		var deferred = $q.defer();
		accountService.del(id).then(function (result) {
				pageContext.showAlertSuccess("Account successfully deleted!");
				$scope.quickEditAccount = null;
				$location.search("id", null);
				deferred.resolve(result);
			},
			function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	$scope.deleteAccountModal = function (accountId) {
		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/layout/deleteContentModalController.html',
			controller: 'deleteContentModalController',
			resolve: {
				contentId: function () {
					return accountId;
				},
				deleteHandler: function () {
					return $scope.deleteAccount;
				}
			}
		});

		modalInstance.result
			.then(function (data) {
				//		$scope.successMsg = "Content successfully deleted!";leted!";

				$scope.populateAccountList();

			}, function () {

			});
	};

	var populateAccount = function (id) {

		$scope.loadingAccount = true;
		var length = $scope.data.length;
		for (var i = 0; i < length; i++) {
			if ($scope.data[i].id === id) {
				$scope.quickEditAccount = $scope.data[i];
				$location.search("id", id);
				$scope.loadingAccount = false;
				return;
			}
		}

		accountService.get(id).then(function (account) {
			$location.search("id", id);
			$scope.quickEditAccount = account;
			$scope.loadingAccount = false;
		});
	};

	$scope.getAccount = function (obj) {
		populateAccount(obj.id);
	};

	initialize();

};

module.exports = ['$scope', '$stateParams', '$location', '$uibModal', '$q', 'accountService', 'pageContext', AccountsController];
