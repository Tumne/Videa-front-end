var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GenericScreenIdView = require('appstudio/plugin/GenericScreenIdView');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var NavigationActionEditPlugin = function (){
	NavigationActionEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new GenericScreenIdView(),
		PluginModelType.EDIT.ACTION.NAVIGATE]);
};

Digi.inherits(NavigationActionEditPlugin, ModelViewPlugin);

module.exports = NavigationActionEditPlugin;

