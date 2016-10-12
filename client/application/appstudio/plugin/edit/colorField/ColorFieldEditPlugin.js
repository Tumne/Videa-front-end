var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Cardinality = require('core/plugin/Cardinality');
var ColorFieldEdit = require('appstudio/plugin/edit/colorField/ColorFieldEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ColorFieldEditPlugin = function (){
    ColorFieldEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new ColorFieldEdit(),
        PluginModelType.EDIT.COLOR]);
    this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(ColorFieldEditPlugin, ModelViewPlugin);

module.exports = ColorFieldEditPlugin;