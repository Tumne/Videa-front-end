var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ScreenEdit = require('appstudio/plugin/edit/screen/ScreenEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var MobileScreenEditPlugin = function (){
	MobileScreenEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new ScreenEdit(),
		PluginModelType.EDIT.SCREEN.MOBILE]);
};

Digi.inherits(MobileScreenEditPlugin, ModelViewPlugin);

module.exports = MobileScreenEditPlugin;

