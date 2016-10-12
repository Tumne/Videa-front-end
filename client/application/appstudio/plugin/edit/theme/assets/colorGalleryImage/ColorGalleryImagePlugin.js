var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Cardinality = require('core/plugin/Cardinality');
var ColorGalleryImage = require('appstudio/plugin/edit/theme/assets/colorGalleryImage/ColorGalleryImage');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ColorGalleryImagePlugin = function (){
  ColorGalleryImagePlugin.super_.apply(this, [
    Purpose.EDIT,
    new ColorGalleryImage(),
    PluginModelType.EDIT.THEME.COLORGALLERYIMAGE]);
  // this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(ColorGalleryImagePlugin, ModelViewPlugin);

module.exports = ColorGalleryImagePlugin;

