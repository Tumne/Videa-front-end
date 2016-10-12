var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var JsonEdit = require('core/uicomponents/editor/jsonEditor/JsonEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var CustomDataEditPlugin = function (){
	CustomDataEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new JsonEdit(),
		PluginModelType.EDIT.CUSTOMDATA]);
};

Digi.inherits(CustomDataEditPlugin, ModelViewPlugin);

module.exports = CustomDataEditPlugin;

