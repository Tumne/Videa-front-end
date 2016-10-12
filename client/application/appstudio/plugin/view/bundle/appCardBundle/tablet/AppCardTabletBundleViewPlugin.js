var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var BundleView = require('appstudio/plugin/view/bundle/appCardBundle/tablet/AppCardTabletBundleView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var AppCardTabletBundleViewPlugin = function (){
	AppCardTabletBundleViewPlugin.super_.apply(this, [
		Purpose.VIEW,
		new BundleView(),
		PluginModelType.VIEW.BUNDLE.TABLET]);

	this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(AppCardTabletBundleViewPlugin, ModelViewPlugin);

module.exports = AppCardTabletBundleViewPlugin;
