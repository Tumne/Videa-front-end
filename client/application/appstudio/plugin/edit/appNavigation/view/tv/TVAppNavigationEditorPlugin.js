var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var AppNavigationEditor = require('appstudio/plugin/edit/appNavigation/view/AppNavigationEditor');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var TVAppNavigationEditorPlugin = function () {
	TVAppNavigationEditorPlugin.super_.apply(this, [
		Purpose.EDIT,
		new AppNavigationEditor(),
		PluginModelType.EDIT.APPNAVIGATION.NAVIGATION.TV]);
};

Digi.inherits(TVAppNavigationEditorPlugin, ModelViewPlugin);

module.exports = TVAppNavigationEditorPlugin;
