'use strict';

var ContentTypeFieldDirective = function () {

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
		templateUrl: 'cms/view/directive/contentField/contentType/contentTypeField.html',
		controller: 'contentTypeFieldController'
	};
};

module.exports = ContentTypeFieldDirective;
