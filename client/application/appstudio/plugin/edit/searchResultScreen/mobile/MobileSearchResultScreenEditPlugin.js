var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ScreenEdit = require('appstudio/plugin/edit/screen/ScreenEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var MobileSearchResultScreenEditPlugin = function (){
	MobileSearchResultScreenEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new ScreenEdit(),
		PluginModelType.EDIT.SEARCHRESULTSCREEN.MOBILE]);
};

Digi.inherits(MobileSearchResultScreenEditPlugin, ModelViewPlugin);

module.exports = MobileSearchResultScreenEditPlugin;

