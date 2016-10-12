﻿'use strict';

var IntegerContentFieldDirective = function () {

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
		templateUrl: 'cms/view/directive/contentField/contentNode/integerContentField.html',
		controller: 'contentFieldController'
	};
};

module.exports = IntegerContentFieldDirective;
