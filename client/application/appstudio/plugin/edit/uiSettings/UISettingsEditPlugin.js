var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var UISettingsEdit = require('appstudio/plugin/edit/uiSettings/UISettingsEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var UISettingsEditPlugin = function (){
	UISettingsEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new UISettingsEdit(),
		PluginModelType.EDIT.UISETTINGS]);
};

Digi.inherits(UISettingsEditPlugin, ModelViewPlugin);

module.exports = UISettingsEditPlugin;

