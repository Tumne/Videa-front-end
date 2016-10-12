'use strict';

var ContentListDirective = function ($window, $location, pageContext, contentListService, alignmentService, $q) {

	function link(scope, element, attrs) {


		function initialize() {
			scope.selectedFieldGroup = null;
			scope.contentReferences = null;
			var id = "";
			if (scope.content) {
				id = scope.content.id;
				scope.contentReferences = scope.content.references;
			}
			else {
				return;
			}

			scope.data = null;
			scope.isLoading = true;

			contentListService.get(id).then(function (result) {
				scope.data = result;
				scope.contentReferences = scope.data.references;
				scope.isLoading = false;
			});

		}

		scope.saveCallback = function () {

			contentListService.update(scope.data.id, scope.data).then(function (result) {
				scope.successMsg = result.successMsg;
				if(result.id) {
					scope.data.id = result.id;
				}
				pageContext.showAlertSuccess("Content List changed!");
				scope.loadContentLists();
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

		scope.updateReferences = function(references){
			scope.data.references = references;
			scope.contentReferences =  scope.data.references;

			scope.saveCallback();
		};
		
		scope.removeContentNode = function(contentNodeId){
			var deferred = $q.defer();
			var contentNodeIndex = scope.data.references.indexOf(contentNodeId);
			
			if(contentNodeIndex <0) {
				deferred.resolve();
			}
			
			if(!scope.data.id){
				scope.data.references.splice(contentNodeIndex, 1);	
				deferred.resolve(undefined);
			}
			else{
				contentListService.removeContentNode(scope.data.id, contentNodeId).then(function(contentNodeList){
					scope.data = contentNodeList.data;
					deferred.resolve(contentNodeList.id);
				}).catch(function(err){
					deferred.reject(err);
				});
			}
			
			return deferred.promise;
		};

	}

	return {
		restrict: 'E',
		scope: {
			content: '=',
			expanded: '@',
			loadContentLists: '&',
			contentTypes : '='
		},
		templateUrl: 'cms/view/directive/contentLists/contentListDirective.html',
		link: link
	};
};

module.exports = ['$window', '$location', 'pageContext', 'contentListService', 'alignmentService', '$q', ContentListDirective];
