var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Cardinality = require('core/plugin/Cardinality');
var ColorFontEdit = require('appstudio/plugin/edit/colorFont/ColorFontEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ColorFontEditPlugin = function (){
    ColorFontEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new ColorFontEdit(),
        PluginModelType.EDIT.COLOR]);
    this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(ColorFontEditPlugin, ModelViewPlugin);

module.exports = ColorFontEditPlugin;