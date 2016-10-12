var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var VersionCreate = require('appstudio/plugin/create/version/VersionCreate');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var VersionCreatePlugin = function (){
    VersionCreatePlugin.super_.apply(this, [
        Purpose.CREATE,
        new VersionCreate(),
        PluginModelType.CREATE.UICONFIG.MOBILE]);
};

Digi.inherits(VersionCreatePlugin, ModelViewPlugin);

module.exports = VersionCreatePlugin;