var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var VersionCreate = require('appstudio/plugin/create/version/VersionCreate');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TvVersionCreatePlugin = function (){
    TvVersionCreatePlugin.super_.apply(this, [
        Purpose.CREATE,
        new VersionCreate(),
        PluginModelType.CREATE.UICONFIG.TV]);
};

Digi.inherits(TvVersionCreatePlugin, ModelViewPlugin);

module.exports = TvVersionCreatePlugin;