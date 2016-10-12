var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var AppNavigationEditor = require('appstudio/plugin/edit/appNavigation/view/AppNavigationEditor');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var GenericAppNavigationEditorPlugin = function () {
	GenericAppNavigationEditorPlugin.super_.apply(this, [
		Purpose.EDIT,
		new AppNavigationEditor(),
		PluginModelType.EDIT.APPNAVIGATION.NAVIGATION.GENERIC]);
};

Digi.inherits(GenericAppNavigationEditorPlugin, ModelViewPlugin);

module.exports = GenericAppNavigationEditorPlugin;
