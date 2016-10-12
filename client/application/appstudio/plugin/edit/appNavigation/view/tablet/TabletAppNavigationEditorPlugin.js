var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var AppNavigationEditor = require('appstudio/plugin/edit/appNavigation/view/AppNavigationEditor');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var TabletAppNavigationEditorPlugin = function () {
	TabletAppNavigationEditorPlugin.super_.apply(this, [
		Purpose.EDIT,
		new AppNavigationEditor(),
		PluginModelType.EDIT.APPNAVIGATION.NAVIGATION.TABLET]);
};

Digi.inherits(TabletAppNavigationEditorPlugin, ModelViewPlugin);

module.exports = TabletAppNavigationEditorPlugin;
