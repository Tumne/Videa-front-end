var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var BundleCreate = require('appstudio/plugin/create/bundle/BundleCreate');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var BundleCreatePlugin = function (){
    BundleCreatePlugin.super_.apply(this, [
        Purpose.CREATE,
        new BundleCreate(),
        PluginModelType.CREATE.BUNDLE.TABLET]);
};

Digi.inherits(BundleCreatePlugin, ModelViewPlugin);

module.exports = BundleCreatePlugin;