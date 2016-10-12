var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var BundleView = require('appstudio/plugin/view/bundle/BundleView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var TvBundleViewPlugin = function (){
    TvBundleViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new BundleView(),
        PluginModelType.VIEW.BUNDLE.TV]);

	this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(TvBundleViewPlugin, ModelViewPlugin);

module.exports = TvBundleViewPlugin;
