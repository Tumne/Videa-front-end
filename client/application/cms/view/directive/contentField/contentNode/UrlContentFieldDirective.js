'use strict';

var UrlContentFieldDirective = function () {
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
		templateUrl: 'cms/view/directive/contentField/contentNode/urlContentField.html',
		controller: 'contentFieldController'
	};
};

module.exports = UrlContentFieldDirective;
