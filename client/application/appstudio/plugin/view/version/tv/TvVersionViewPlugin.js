var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var VersionView = require('appstudio/plugin/view/version/VersionView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var TvVersionViewPlugin = function (){
    TvVersionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new VersionView(),
        PluginModelType.VIEW.UICONFIG.TV]);

	this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(TvVersionViewPlugin, ModelViewPlugin);

module.exports = TvVersionViewPlugin;
