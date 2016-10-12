'use strict';

var ContentNodeWorkflowDirective = function ($window, pageContext, contentNodeService, workflowService) {

	function link(scope, element, attrs) {

		function initialize() {
			scope.isLoading = false;

			if (scope.contentId) {
				getAllowedTriggers(scope.state);
			}
		}

		scope.$watch('contentId', function () {
			initialize();
		});

		scope.$watch('state', function () {
			initialize();
		});

		scope.$watch('expanded', function () {

		});

		scope.fire = function (trigger) {
			if (scope.onupdate) {
				scope.onupdate({contentId: scope.contentId, state: scope.state, trigger: trigger});
			}
		};

		function getAllowedTriggers(nodeState) {

			scope.isLoading = true;
			workflowService.getAllowedTriggers(nodeState).then(function (result) {
					scope.isLoading = false;
					scope.stateTriggers = result;
				},
				function (reason) {
					scope.isLoading = false;
					pageContext.showAlertDanger(reason, "An error occured while loading workflow states!");
				});
		}
	}

	return {
		restrict: 'E',
		scope: {
			contentId: '=',
			state: '=',
			action: '=',
			expanded: '=',
			onupdate: '&onupdate'
		},
		templateUrl: 'cms/view/directive/contentNode/contentNodeWorkflowDirective.html',
		link: link
	};
};


module.exports = ['$window', 'pageContext', 'contentNodeService', 'workflowService', ContentNodeWorkflowDirective];
