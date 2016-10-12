'use strict';

var EditUserDirective = function ($window, $location, pageContext, userService, alignmentService) {

	function link(scope, element, attrs) {


		function initialize() {
			scope.selectedFieldGroup = null;

			var id = null;
			if (scope.content) {
				id = scope.content.id;
			}
			else {
				return;
			}

			scope.viewMode = scope.action === 'add' ? 'edit' : scope.action;
			scope.preventSave = false;

			scope.data = null;
			scope.isLoading = true;
			userService.get(id).then(function (result) {
				scope.data = result;
				scope.isLoading = false;
			});

		}

		scope.saveCallback = function () {
			
			userService.saveUser(scope.data).then(function (result) {
				scope.successMsg = result.successMsg;
				if(result.id) {
					scope.data.id = result.id;
				}
				console.log(result);
				pageContext.showAlertSuccess(scope.successMsg);
				scope.loadUsers();
			});
		};

		scope.cancelCallback = function () {
			$window.history.back();
		};

		scope.$watch('content', function () {
			initialize();
		});

		scope.sortableOptions = {
			axis: 'x'
		};

		scope.printListOrder = function () {
			if (!scope.fields) {
				scope.fields = scope.data.fieldGroups[0].fields;
			}

			scope.valueList = "";
			for (var i = 0; i < scope.data.fieldGroups[0].fields.length; i++) {
				scope.valueList = scope.valueList + " - " + scope.data.fieldGroups[0].fields[i].name;
			}
		};

		scope.onVisibleChange = function () {
			scope.saveCallback();
		};

		scope.toggleRolesSelection = function(role){
			if(!scope.data.roles){
				scope.data.roles = [];
			}
			var index = scope.data.roles.indexOf(role);

			if(index > -1){
				scope.data.roles.splice(index, 1);
			}
			else {
				scope.data.roles.push(role);
			}

			scope.saveCallback();
		};

		scope.showTab = function (group, t) {
			scope.selectedFieldGroup = group;
			alignmentService.showTab(t);
		};

	}

	return {
		restrict: 'E',
		scope: {
			content: '=',
			action: '=',
			expanded: '@',
			loadUsers: '&',
			defaultRoles : '='
		},
		templateUrl: 'cms/view/directive/user/editUserDirective.html',
		link: link
	};
};

module.exports = ['$window', '$location', 'pageContext', 'userService', 'alignmentService', EditUserDirective];
