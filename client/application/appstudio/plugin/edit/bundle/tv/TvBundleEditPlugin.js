var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var BundleEdit = require('appstudio/plugin/edit/bundle/BundleEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TvBundleEditPlugin = function (){
    TvBundleEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new BundleEdit(),
        PluginModelType.EDIT.BUNDLE.TV]);
};

Digi.inherits(TvBundleEditPlugin, ModelViewPlugin);

module.exports = TvBundleEditPlugin;