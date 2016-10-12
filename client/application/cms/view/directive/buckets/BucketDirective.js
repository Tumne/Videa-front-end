'use strict';

var BucketDirective = function ($window, $location, pageContext, bucketService, alignmentService) {

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
			bucketService.get(id).then(function (result) {
				scope.data = result;
				scope.isLoading = false;
			});

		}

		scope.saveCallback = function () {

			bucketService.update(scope.data.id, scope.data).then(function (result) {
				scope.successMsg = result.successMsg;
				if(result.id) {
					scope.data.id = result.id;
				}
				pageContext.showAlertSuccess("Bucket changed!");
				console.log("LOAD BUCKETS",scope.loadBuckets());
			});
		};
		
		scope.cancelCallback = function () {
			$window.history.back();
		};

		scope.$watch('content', function () {
			initialize();
		});

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
			loadBuckets: '&'
		},
		templateUrl: 'cms/view/directive/buckets/bucketDirective.html',
		link: link
	};
};

module.exports =  ['$window', '$location', 'pageContext', 'bucketService', 'alignmentService', BucketDirective];
