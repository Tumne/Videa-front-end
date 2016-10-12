var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var MobilePreview = require('appstudio/plugin/preview/appType/mobile/MobilePreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var MobilePreviewPlugin = function (){
    MobilePreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new MobilePreview(),
        PluginModelType.PREVIEW.APPTYPE.MOBILE]);
};

Digi.inherits(MobilePreviewPlugin, ModelViewPlugin);

module.exports = MobilePreviewPlugin;