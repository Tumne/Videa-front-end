var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var CarouselPreview = require('appstudio/plugin/preview/component/carousel/CarouselPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var CarouselPreviewPlugin = function (){
    CarouselPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new CarouselPreview(),
        PluginModelType.PREVIEW.COMPONENT.CAROUSEL]);
};

Digi.inherits(CarouselPreviewPlugin, ModelViewPlugin);

module.exports = CarouselPreviewPlugin;