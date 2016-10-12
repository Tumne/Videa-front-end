var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var BundleView = require('appstudio/plugin/view/bundle/appCardBundle/mobile/AppCardMobileBundleView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var AppCardMobileBundleViewPlugin = function (){
	AppCardMobileBundleViewPlugin.super_.apply(this, [
		Purpose.VIEW,
		new BundleView(),
		PluginModelType.VIEW.BUNDLE.MOBILE]);

	this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(AppCardMobileBundleViewPlugin, ModelViewPlugin);

module.exports = AppCardMobileBundleViewPlugin;
