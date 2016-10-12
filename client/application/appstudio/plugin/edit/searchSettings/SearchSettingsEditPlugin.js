var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var SearchSettingsEdit = require('appstudio/plugin/edit/searchSettings/SearchSettingsEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var SearchSettingsEditPlugin = function (){
	SearchSettingsEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new SearchSettingsEdit(),
		PluginModelType.EDIT.SEARCHSETTINGS]);
};

Digi.inherits(SearchSettingsEditPlugin, ModelViewPlugin);

module.exports = SearchSettingsEditPlugin;

