var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ImagePreview = require('appstudio/plugin/preview/component/image/ImagePreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var ImagePreviewPlugin = function (){
    ImagePreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new ImagePreview(),
        PluginModelType.PREVIEW.COMPONENT.IMAGE]);
};

Digi.inherits(ImagePreviewPlugin, ModelViewPlugin);

module.exports = ImagePreviewPlugin;