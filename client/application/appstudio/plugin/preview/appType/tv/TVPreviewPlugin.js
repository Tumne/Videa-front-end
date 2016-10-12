var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var TVPreview = require('appstudio/plugin/preview/appType/tv/TVPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TVPreviewPlugin = function (){
    TVPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new TVPreview(),
        PluginModelType.PREVIEW.APPTYPE.TV]);
};

Digi.inherits(TVPreviewPlugin, ModelViewPlugin);

module.exports = TVPreviewPlugin;