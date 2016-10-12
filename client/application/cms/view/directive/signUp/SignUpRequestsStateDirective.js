'use strict';

var SignUpRequestsStateDirective = function ($window, pageContext, contentNodeService, Contentnode) {

	function link(scope, element, attrs) {

		function initialize() {

			scope.isLoading = false;
			scope.stateTriggers = ["Approved" , "Rejected"];
		}

		scope.$watch('content', function () {
			initialize();
		});

		scope.fire = function (trigger) {

			var requestId = scope.content.id;
			if (scope.onupdate && requestId) {

				var request ={requestId : requestId, state : trigger};
				scope.onupdate(request);
			}
		};
	}

	return {
		restrict: 'E',
		scope: {
			content : '=',
			expanded :'@',
			onupdate: '&'
		},
		templateUrl: 'cms/view/directive/signUp/signUpRequestsStateDirective.html',
		link: link
	};
};

module.exports = ['$window', 'pageContext', 'contentNodeService', 'Contentnode', SignUpRequestsStateDirective];
