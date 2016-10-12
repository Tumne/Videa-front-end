var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GridViewPreview = require('appstudio/plugin/preview/component/gridView/GridViewPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var GridViewPreviewPlugin = function (){
    GridViewPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new GridViewPreview(),
        PluginModelType.PREVIEW.COMPONENT.GRIDVIEW]);
};

Digi.inherits(GridViewPreviewPlugin, ModelViewPlugin);

module.exports = GridViewPreviewPlugin;