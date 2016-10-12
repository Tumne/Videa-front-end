'use strict';

var DropdownContentFieldDirective = function () {

	return {
		restrict: 'E',
		scope: {
			contentId: '=contentid',
			value: '=value',
			field: '=field',
			edit: '=edit',
			expanded: '=expanded',
			onupdate: '&onupdate'
		},
		templateUrl: 'cms/view/directive/contentField/contentNode/dropdownContentField.html',
		controller: 'contentFieldController'
	};
};

module.exports = DropdownContentFieldDirective;
