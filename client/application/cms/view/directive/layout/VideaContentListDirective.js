'use strict';

var VideaContentListDirective = function ($state, pageContext, $location, $filter, accountService, alignmentService) {

	function link(scope, element, attrs) {

		function initialize() {


			scope.state = $state;

			scope.contentPropertiesKeys = null;
			scope.closeQuickEditForm();

			//loadContentTypes();
			scope.loadContents();
		}

		scope.$watch('content', function () {

			initialize();


		});

		scope.$watch('contentToEdit', function(){
			if(!scope.contentToEdit || scope.contentToEdit === null){
				scope.closeQuickEditForm();
			}
		});

		scope.$watch(function () {
			return accountService.getActiveAccount();
		}, function () {
			initialize();
		}, true);



		scope.showQuickEditForm = function (selectedContent) {

			alignmentService.showRightCol();

			if(selectedContent.id) {
				$location.search("id", selectedContent.id);
			}

			scope.getContent({obj:selectedContent});
		};

		scope.closeQuickEditForm = function () {
			if (scope.quickEditExpanded) {
				scope.toggleQuickEditMode();
			}

			$location.search("id",null);
			scope.loadingContent = false;

			alignmentService.hideRightCol();
			scope.quickEditContent = null;
		};

		scope.toggleQuickEditMode = function () {
			//tell ContentNodeDirective that expanded changed
			scope.quickEditExpanded = !scope.quickEditExpanded;

			if (scope.quickEditExpanded) {
				alignmentService.setRightColFullWidth();
			}
			else {
				alignmentService.setRightColDefaultWidth();
			}
		};

		scope.openContentModalHandler = function(){
			scope.openContentModal();
		};

		scope.deleteContentModalHandler = function(contentId, content){
			scope.deleteContentModal({"msg": contentId, content: content});
		};

		scope.checkIfIsDate = function(date){
			return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
		};

		scope.getContentValue = function(content, fieldString){
			var fields = fieldString.split('.');
			var value = content;

			for(var i = 0; i < fields.length; i++){
				value = value[fields[i]];
			}

			return value;
		};

		scope.onSort = function(field) {
			scope.asc = scope.sort !== field ? true : !scope.asc;
			scope.sort = field;
			scope.sortHandler();
		};

		scope.hasOptions = function(){
			return typeof scope.deleteContentModal === "function";

		};
		
	}

	return {
		restrict: 'E',
		scope :{
			openContentModal: '&openmodal',
			deleteContentModal : '&deletemodal',
			quickEditExpanded : '=expanded',
			quickEditContent : '=editcontent',
			contentProperties : '=properties',
			loadContents : '&loadcontents',
			contentList : '=contentlist',
			sort : '=',
			sortHandler : '&',
			asc : '=',
			totalItems : '=',
			currentPage : '=',
			itemsPerPage : '=',
			pageChangeHandler : '&',
			hideDropMenu : '=',
			loadingContent : '=loading',
			getContent : '&',
			contentToEdit : '=',
			query : '='

		},
		transclude: true,
		templateUrl: 'cms/view/directive/layout/videaContentListDirective.html',
		link: link
	};
};

module.exports =  ['$state', 'pageContext', '$location', '$filter', 'accountService', 'alignmentService', VideaContentListDirective];
