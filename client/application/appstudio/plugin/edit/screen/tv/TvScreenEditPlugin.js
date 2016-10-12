var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ScreenEdit = require('appstudio/plugin/edit/screen/ScreenEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var TvScreenEditPlugin = function (){
	TvScreenEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new ScreenEdit(),
		PluginModelType.EDIT.SCREEN.TV]);
};

Digi.inherits(TvScreenEditPlugin, ModelViewPlugin);

module.exports = TvScreenEditPlugin;

