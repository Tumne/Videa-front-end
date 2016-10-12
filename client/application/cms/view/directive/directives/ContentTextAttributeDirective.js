'use strict';

var ContentTextAttributeDirective = function () {

	return {
		restrict: 'E',
		scope: {
			labelName: '=',
			value: '=',
			edit: '=',
			expanded: '@expanded',
			placeholder : '=',
			textType : '=',
			onupdate : '&'
		},
		templateUrl: 'cms/view/directive/directives/contentTextAttribute.html',
		link : function link(scope, element, attrs) {
			scope.updateValue = function(){
				scope.edit = 'view';
				scope.showForm = false;
				scope.onupdate();
			};

			scope.callEdit = function(){
				scope.showForm = true;
			};
		}
	};
};

module.exports = ContentTextAttributeDirective;
