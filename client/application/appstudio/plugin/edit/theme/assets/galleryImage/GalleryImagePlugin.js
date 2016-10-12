var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Cardinality = require('core/plugin/Cardinality');
var GalleryImage = require('appstudio/plugin/edit/theme/assets/galleryImage/GalleryImage');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var GalleryImagePlugin = function (){
  GalleryImagePlugin.super_.apply(this, [
    Purpose.EDIT,
    new GalleryImage(),
    PluginModelType.EDIT.THEME.GALLERYIMAGE]);
};

Digi.inherits(GalleryImagePlugin, ModelViewPlugin);

module.exports = GalleryImagePlugin;

