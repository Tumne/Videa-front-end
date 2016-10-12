var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var LabelPreview = require('appstudio/plugin/preview/component/label/LabelPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var LabelPreviewPlugin = function (){
    LabelPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new LabelPreview(),
        PluginModelType.PREVIEW.COMPONENT.LABEL]);
};

Digi.inherits(LabelPreviewPlugin, ModelViewPlugin);

module.exports = LabelPreviewPlugin;