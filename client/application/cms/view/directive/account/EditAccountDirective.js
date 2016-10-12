'use strict';

var  EditAccountDirective = function ($window, $location, pageContext, accountService, alignmentService) {

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
			accountService.get(id).then(function (result) {
				scope.data = result;
				scope.isLoading = false;
			});

		}

		scope.saveCallback = function () {
			accountService.update(scope.data.id, scope.data).then(function (result) {
				scope.successMsg = "Account successfully updated!";
				
				if(result.id) {
					scope.data.id = result.id;
				}
				
				pageContext.showAlertSuccess(scope.successMsg);
				scope.loadAccounts();
			}).catch(function(){
				pageContext.showAlertDanger("Error updating Account!");
			});
		};

		scope.cancelCallback = function () {
			$window.history.back();
		};

		scope.$watch('content', function () {
			initialize();
		});

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
			loadAccounts: '&'
		},
		templateUrl: 'cms/view/directive/account/editAccountDirective.html',
		link: link
	};
};

module.exports = ['$window', '$location', 'pageContext', 'accountService', 'alignmentService', EditAccountDirective];
