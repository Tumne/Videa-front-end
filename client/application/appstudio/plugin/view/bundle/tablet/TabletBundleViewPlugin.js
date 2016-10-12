var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var BundleView = require('appstudio/plugin/view/bundle/BundleView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var TabletBundleViewPlugin = function (){
    TabletBundleViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new BundleView(),
        PluginModelType.VIEW.BUNDLE.TABLET]);

	this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(TabletBundleViewPlugin, ModelViewPlugin);

module.exports = TabletBundleViewPlugin;
