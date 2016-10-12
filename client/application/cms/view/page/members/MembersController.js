'use strict';

var MembersController = function ($scope, $stateParams, $location, $uibModal, $q, memberService, roleService, pageContext) {

	function initialize() {

		$scope.loading = false;
		$scope.loadingMember = false;
		$scope.offset = null;
		$scope.batchSize = 10;

		$scope.defaultUserRoles = [];
		$scope.defaultMemberRoles = [];
		
		roleService.get("user").then(function(results){
			$scope.defaultUserRoles = results;
		});

		roleService.get("account").then(function(results){
			$scope.defaultMemberRoles = results;
		});

		var id = $stateParams.id;
		$scope.query = null;
		$scope.currentPage = $stateParams.page || 1;
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.asc = true;
		$scope.sort = 'user.lastName';

		pageContext.setTitle("Members");

		$scope.data = [];
		$scope.membersProperties = [{ field: "user.username", label : "Username"},
			{ field: "user.firstName", label : "First Name"},
			{ field: "user.lastName", label : "Last Name"},
			{ field: "user.email", label: "Email"},
			{ field : "roles", label: "Roles"}];
		$scope.quickEditExpanded = false;
		$scope.quickEditMember = null;

		$scope.populateUserList().then(function(){
			if(id){
				populateMember(id);
			}
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

	$scope.getRolesFromAccountMemberOfUser = function(user){
		var rolesOfMembers = [];
		var members = user.members;
		var activeAccountId = memberService.getAccount();
		for(var i = 0; i < members.length; i++){
			if(members[i].accountId === activeAccountId && members[i].roles){
				rolesOfMembers = members[i].roles;
				break;
			}
		}

		return rolesOfMembers;
	};

	$scope.populateUserList = function () {

		var deferred = $q.defer();

		if ($scope.offset && jQuery.isEmptyObject($scope.offset)){
			deferred.resolve();
			return deferred.promise;
		}

		$location.search("page", $scope.currentPage);

		$scope.loading = true;

		memberService.search($scope.query, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc)
			.then(function (result) {
					$scope.loading = false;
					$scope.data = result.data;
					$scope.totalItems = result.total;
					deferred.resolve();
				},
				function (reason) {
					$scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occurred while loading the list of users!");
					deferred.reject();
				});

		return deferred.promise;
	};

	$scope.addMember = function(user, roles){

		var deferred = $q.defer();

		memberService.addNewUser({"user": user, "roles" : roles})
			.then(function (result) {

				deferred.resolve(result);
			}, function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	};

	$scope.deleteMember = function(memberId) {
		var deferred = $q.defer();

		memberService.del(memberId).then(function (result) {
				pageContext.showAlertSuccess("User successfully removed from account!");
				$scope.quickEditMember = null;
				$location.search("id", null);
				deferred.resolve(result);
			},
			function (err) {
				deferred.reject(err);
			});
		return deferred.promise;
	};

	$scope.deleteMemberModal = function(id, content){
		var memberId = content.user.id;


		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/layout/deleteContentModalController.html',
			controller: 'deleteContentModalController',
			resolve: {
				contentId: function () { return memberId; },
				deleteHandler : function() {return $scope.deleteMember;}

			}
		});

		modalInstance.result
			.then(function () {
				//		$scope.successMsg = "Content successfully deleted!";leted!";
				$scope.populateUserList();

			}, function () {

			});
	};

	$scope.$watch('quickEditMember', function () {
		if($scope.quickEditMember){
			$location.search("id", $scope.quickEditMember.user.id);

		}
	});

	$scope.openAddMemberModal = function () {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/members/addMember.html',
			controller: 'addMemberModalController',

			resolve: {
				okFunction: function(){return $scope.addMember;},
				user : function(){ return {};},
				popUpTitle : function(){ return "Add User";},
				roles : function(){return null;},
				defaultUserRoles : function(){ return $scope.defaultUserRoles;},
				defaultMemberRoles : function(){ return $scope.defaultMemberRoles;}
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


	$scope.openAdExistingUserMemberModal = function () {

		var modalInstance = $uibModal.open({
			templateUrl: 'cms/view/modal/members/addExistingUserMember.html',
			controller: 'addExistingUserMemberModalController',

			resolve: {
				okFunction: function(){return $scope.addMember;},
				user : function(){ return {};},
				popUpTitle : function(){ return "Add Member";},
				roles : function(){return null;},
				defaultMemberRoles : function(){ return $scope.defaultMemberRoles;}
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

	var populateMember = function(id){
		$scope.loadingMember = true;
		var length = $scope.data.length;
		for (var i = 0; i < length; i++) {
			if ($scope.data[i].user.id === id) {
				$scope.quickEditMember = $scope.data[i];

				if(!$scope.quickEditMember.roles){
					$scope.quickEditMember.roles = [];
				}

				$location.search("id", id);
				$scope.loadingMember = false;
				return;
			}
		}

		$scope.loadingMember = false;
	};

	$scope.getMember = function(obj) {
		populateMember(obj.user.id);
	};

	initialize();
};

module.exports = ['$scope', '$stateParams', '$location', '$uibModal', '$q', 'memberService', 'roleService', 'pageContext', MembersController];
