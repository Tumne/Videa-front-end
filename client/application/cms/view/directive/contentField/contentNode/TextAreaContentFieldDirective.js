﻿	'use strict';

	var controllerId = 'textAreaContentFieldDirective';


	var TextAreaContentFieldDirective = function () {

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
			templateUrl: 'cms/view/directive/contentField/contentNode/textAreaContentField.html',
			controller: 'contentFieldController'
		};
	};

	module.exports = TextAreaContentFieldDirective;
