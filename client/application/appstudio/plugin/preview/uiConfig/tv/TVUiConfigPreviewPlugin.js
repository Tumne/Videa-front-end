var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var TVPreview = require('appstudio/plugin/preview/appType/tv/TVPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TVUiConfigPreviewPlugin = function (){
    TVUiConfigPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new TVPreview(),
        PluginModelType.PREVIEW.UICONFIG.TV]);
};

Digi.inherits(TVUiConfigPreviewPlugin, ModelViewPlugin);

module.exports = TVUiConfigPreviewPlugin;