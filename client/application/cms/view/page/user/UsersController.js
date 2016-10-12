'use strict';

var UsersController = function ($scope, $state, $stateParams, $uibModal, $location, $q, userService, roleService, pageContext) {

	function initialize() {

		$scope.loading = false;
		$scope.loadingUser = false;
		$scope.offset = null;
		$scope.batchSize = 10;

		$scope.defaultRoles = [];

		roleService.get("user").then(function(results){
			$scope.defaultRoles = results;
		});
		
		var id = $stateParams.id;
		$scope.query = null;
		$scope.currentPage = $stateParams.page || 1;
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.asc = true;
		$scope.sort = 'lastName';

		pageContext.setTitle("Users");

		$scope.data = [];
		$scope.usersProperties = [{ field: "username", label : "Username"},
			{ field: "firstName", label : "First Name"},
			{ field: "lastName", label : "Last Name"},
			{ field: "roles", label : "Roles"},
			{ field: "email", label: "Email"}];
		$scope.quickEditExpanded = false;
		$scope.quickEditUser = null;

		$scope.populateUserList().then(function(){
			if(id){
				populateUser(id);
			}
		}, function(){

		});
	}

	$scope.pageChanged = function () {
		$scope.populateUserList();
	};

	$scope.sortUsers = function () {
		$scope.offset = null;
		$scope.data = [];
		$scope.populateUserList();
	};

	$scope.populateUserList = function () {
		var deferred = $q.defer();

		if ($scope.offset && jQuery.isEmptyObject($scope.offset)){
			deferred.resolve();
			return deferred.promise;
		}

		$scope.loading = true;

		$location.search("page", $scope.currentPage);

		userService.search($scope.query, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc)
			.then(function (result) {
					$scope.loading = false;
					$scope.data = result.data;
					$scope.totalItems = result.total;
					deferred.resolve();
				},
				function (reason) {
					$scope.loading = false;
					pageContext.showAlertDanger(reason, "An error occured while loading the list of users!");
					deferred.reject();
				});

		return deferred.promise;
	};


	$scope.addNewUser = function(user){

		var deferred = $q.defer();

		userService.add(user)
			.then(function (result) {

				deferred.resolve(result);
			}, function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	$scope.deleteUser = function(id){
		var deferred = $q.defer();

		userService.del(id).then(function (result) {
				pageContext.showAlertSuccess("User successfully deleted!");
				$scope.quickEditUser = null;
				$location.search("id", null);
				deferred.resolve(result);
			},
			function(err){
				deferred.reject(err);
			});
		return deferred.promise;
	};

	$scope.deleteUserModal = function(userId){

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/layout/deleteContentModalController.html',
			controller: 'deleteContentModalController',
			resolve: {
				contentId: function () { return userId; },
				deleteHandler : function() {return $scope.deleteUser;}

			}
		});

		modalInstance.result
			.then(function () {
				$scope.populateUserList();

			}, function () {

			});
	};

	var populateUser = function(id){

		var length = $scope.data.length;
		for (var i = 0; i < length; i++) {
			if ($scope.data[i].id === id) {
				$scope.quickEditUser = $scope.data[i];
				$location.search("id", id);
				$scope.loadingUser = false;
				return;
			}
		}
		$scope.loadingUser = true;

		userService.get(id).then(function(user){
			$location.search("id", id);
			$scope.quickEditUser = user;
			$scope.loadingUser = false;
		});
	};

	$scope.getUser = function(obj){
		populateUser(obj.id);
	};

	$scope.openAddUserModal = function () {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/user/addUser.html',
			controller: 'addUserModalController',

			resolve: {
				okFunction: function(){return $scope.addNewUser;},
				user : function(){ return {};},
				popUpTitle : function(){ return "Add User";},
				defaultRoles : function(){ return $scope.defaultRoles;}
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

	initialize();

};

module.exports = ['$scope', '$state', '$stateParams', '$uibModal', '$location', '$q', 'userService', 'roleService', 'pageContext', UsersController];
