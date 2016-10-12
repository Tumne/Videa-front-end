'use strict';

var SignUpRequestsController = function ($scope, $stateParams, $location, $state, signUpService, pageContext, $q, alignmentService) {

	function initialize() {

		$scope.loading = false;
		$scope.offset = null;
		$scope.batchSize = 10;
		$scope.loadingRequest = false;

		var id = $stateParams.id;
		$scope.query = null;
		$scope.currentPage = $stateParams.page || 1;
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.asc = true;
		$scope.sort = 'request.account.name';

		pageContext.setTitle("Sign Up Requests");

		$scope.data = [];
		$scope.requestProperties = [{ field: "account.name", label : "Account"},
			{ field: "user.username", label : "Username"},
			{ field: "user.firstName", label : "First Name"},
			{ field: "user.lastName", label : "Last Name"},
			{ field: "user.email", label: "Email"}];
		$scope.quickEditExpanded = false;
		$scope.quickEdiRequest = null;

		$scope.populateSignUpRequestsList().then(function(){
			if(id){
				populateRequest(id);
			}
		}, function(){

		});
	}

	$scope.pageChanged = function () {
		$scope.populateSignUpRequestsList();
	};

	$scope.sortSignUpRequests = function () {
		$scope.offset = null;
		$scope.data = [];
		$scope.populateSignUpRequestsList();
	};

	var populateRequest = function(id){

		$scope.loadingRequest = true;

		var length = $scope.data.length;
		for (var i = 0; i < length; i++) {
			if ($scope.data[i].id === id) {
				$location.search("id", id);
				$scope.quickEdiRequest = $scope.data[i];
				$scope.loadingRequest = false;
				return;
			}
		}

		$scope.loadingRequest = false;
	};

	$scope.getRequest = function(obj){
		populateRequest(obj.id);
	};

	$scope.onRequestUpdateState= function(requestId, state) {
		var request = { id: requestId, workflowState:state};

		signUpService.updateRequest(requestId, request).then(function () {
			pageContext.showAlertSuccess("Request's state successfully updated!");
			$scope.populateSignUpRequestsList();
			$scope.closeQuickEditForm();
		}, function (reason) {
			pageContext.showAlertDanger(reason, "An error occured while updating request's state");
		});
	};

	$scope.closeQuickEditForm = function () {
		if ($scope.quickEditExpanded) {
			$scope.toggleQuickEditMode();
		}
		$location.search("id", null);

		alignmentService.hideRightCol();
		$scope.quickEdiRequest = null;

	};

	$scope.toggleQuickEditMode = function () {

		//tell ContentNodeDirective that expanded changed
		$scope.quickEditExpanded = !$scope.quickEditExpanded;

		if ($scope.quickEditExpanded) {
			alignmentService.setRightColFullWidth();
		}
		else{
			alignmentService.setRightColDefaultWidth();
		}

	};

	$scope.populateSignUpRequestsList = function () {

		var deferred = $q.defer();

		if ($scope.offset && jQuery.isEmptyObject($scope.offset)){
			deferred.resolve();
			return deferred.promise;
		}

		$scope.loading = true;

		$location.search("page", $scope.currentPage);

		signUpService.search($scope.query, ($scope.currentPage - 1) * $scope.itemsPerPage, $scope.itemsPerPage, $scope.sort, $scope.asc)
			.then(function (result) {
					$scope.loading = false;
					$scope.data = result.data;
					$scope.totalItems = result.total;
					deferred.resolve();
				},
				function (reason) {
					$scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occured while loading the list of sing up requests!");
					deferred.reject();
				});

		return deferred.promise;
	};

	initialize();

};
module.exports = ['$scope', '$stateParams', '$location', '$state', 'signUpService', 'pageContext', '$q', 'alignmentService', SignUpRequestsController];
