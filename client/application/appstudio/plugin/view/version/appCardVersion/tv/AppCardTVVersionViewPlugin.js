var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var VersionView = require('appstudio/plugin/view/version/appCardVersion/tv/AppCardTVVersionView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var AppCardTVVersionViewPlugin = function (){
	AppCardTVVersionViewPlugin.super_.apply(this, [
		Purpose.VIEW,
		new VersionView(),
		PluginModelType.VIEW.UICONFIG.TV]);

	this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(AppCardTVVersionViewPlugin, ModelViewPlugin);

module.exports = AppCardTVVersionViewPlugin;
