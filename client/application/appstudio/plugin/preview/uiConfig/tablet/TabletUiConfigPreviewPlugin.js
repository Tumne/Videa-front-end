var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var TabletPreview = require('appstudio/plugin/preview/appType/tablet/TabletPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TabletUiConfigPreviewPlugin = function (){
    TabletUiConfigPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new TabletPreview(),
        PluginModelType.PREVIEW.UICONFIG.TABLET]);
};

Digi.inherits(TabletUiConfigPreviewPlugin, ModelViewPlugin);

module.exports = TabletUiConfigPreviewPlugin;