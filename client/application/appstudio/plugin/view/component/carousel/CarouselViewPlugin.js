var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var CarouselView = require('appstudio/plugin/view/component/carousel/CarouselView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var CarouselViewPlugin = function (){
    CarouselViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new CarouselView(),
        PluginModelType.VIEW.COMPONENT.CAROUSEL]);
};

Digi.inherits(CarouselViewPlugin, ModelViewPlugin);

module.exports = CarouselViewPlugin;