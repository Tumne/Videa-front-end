
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var AppNavigationEditorController = require('appstudio/plugin/edit/appNavigation/view/AppNavigationEditorPluginController');

var AppNavigationEdit = function () {
	//Do constructor stuff here.
};

Implements(AppNavigationEdit, IView);

AppNavigationEdit.prototype = {
	getName: function(){
		return 'appNavigationEditorComponent';
	},
	getDefinition: function(){
		return {
			controller: ['$scope', '$log', 'modelFactory', 'modelOperation', 'blankModalService', 'confirmationModalService', '$q', AppNavigationEditorController],
			controllerAs: 'vm',
			scope: false,
			templateUrl: 'appstudio/plugin/edit/appNavigation/view/appNavigationEditor.html'
		};
	},
	getDirective : function () {
		return '<app-navigation-editor-component></app-navigation-editor-component>';
	}
};
module.exports = AppNavigationEdit;
