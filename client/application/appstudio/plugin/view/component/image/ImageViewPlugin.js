var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ImageView = require('appstudio/plugin/view/component/image/ImageView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var ImageViewPlugin = function (){
    ImageViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new ImageView(),
        PluginModelType.VIEW.COMPONENT.IMAGE]);
};

Digi.inherits(ImageViewPlugin, ModelViewPlugin);

module.exports = ImageViewPlugin;