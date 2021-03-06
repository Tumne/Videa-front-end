﻿'use strict';

var DesignationFieldDirective = function () {

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
		templateUrl: 'cms/view/directive/contentField/contentNode/designationField.html',
		controller: 'contentFieldController'
	};
};

module.exports = DesignationFieldDirective;
	
