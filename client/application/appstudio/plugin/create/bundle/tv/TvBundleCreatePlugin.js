var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var BundleCreate = require('appstudio/plugin/create/bundle/BundleCreate');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TvBundleCreatePlugin = function (){
    TvBundleCreatePlugin.super_.apply(this, [
        Purpose.CREATE,
        new BundleCreate(),
        PluginModelType.CREATE.BUNDLE.TV]);
};

Digi.inherits(TvBundleCreatePlugin, ModelViewPlugin);

module.exports = TvBundleCreatePlugin;