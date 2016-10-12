var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var TabletPreview = require('appstudio/plugin/preview/appType/tablet/TabletPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TabletPreviewPlugin = function (){
    TabletPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new TabletPreview(),
        PluginModelType.PREVIEW.APPTYPE.TABLET]);
};

Digi.inherits(TabletPreviewPlugin, ModelViewPlugin);

module.exports = TabletPreviewPlugin;