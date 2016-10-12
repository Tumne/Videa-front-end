"use strict";

var routes = require('cms/routes');
var ApplicationController = require('cms/ApplicationController');
require('cms/service');
require('cms/model');
require('cms/startup');
require('cms/view/directive');
require('cms/view/page');
require('cms/view/modal');
angular.module('cms', [
		'cms.service',
		'cms.model',
		'cms.startup',
		'cms.pages',
		'cms.directives',
		'cms.modals',
		//'as.sortable'	
		'html5.sortable'
	])
	.controller('applicationController', ['$window',
		'$localStorage',
		'$scope',
		'$state',
		'$timeout',
		'pageContext',
		'mediaService',
		'systemService',
		'accountService',
		ApplicationController])
	.run(function(){

	}).config(['$stateProvider', function ($stateProvider) {
	for(var i = 0; i < routes.length; i++){
		$stateProvider.state(routes[i].stateName, routes[i]);
	}
}]);
