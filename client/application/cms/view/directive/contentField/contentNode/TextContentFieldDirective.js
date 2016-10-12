'use strict';

var TextContentFieldDirective= function () {

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
		templateUrl: 'cms/view/directive/contentField/contentNode/textContentField.html',
		controller: 'contentFieldController'
	};
};

module.exports = TextContentFieldDirective;
