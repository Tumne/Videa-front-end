var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var MobilePreview = require('appstudio/plugin/preview/appType/mobile/MobilePreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var MobileUiConfigPreviewPlugin = function (){
    MobileUiConfigPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new MobilePreview(),
        PluginModelType.PREVIEW.UICONFIG.MOBILE]);
};

Digi.inherits(MobileUiConfigPreviewPlugin, ModelViewPlugin);

module.exports = MobileUiConfigPreviewPlugin;