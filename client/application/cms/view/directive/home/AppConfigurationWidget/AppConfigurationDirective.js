'use strict';

var AppConfigurationDirective = function () {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'cms/view/directive/home/AppConfigurationWidget/appConfigurationDirective.html',
		controller: 'appConfigurationController'
	};
};

module.exports = AppConfigurationDirective;
