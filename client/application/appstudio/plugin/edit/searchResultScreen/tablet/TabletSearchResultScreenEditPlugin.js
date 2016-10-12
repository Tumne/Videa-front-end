var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ScreenEdit = require('appstudio/plugin/edit/screen/ScreenEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var TabletSearchResultScreenEditPlugin = function (){
	TabletSearchResultScreenEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new ScreenEdit(),
		PluginModelType.EDIT.SEARCHRESULTSCREEN.TABLET]);
};

Digi.inherits(TabletSearchResultScreenEditPlugin, ModelViewPlugin);

module.exports = TabletSearchResultScreenEditPlugin;

