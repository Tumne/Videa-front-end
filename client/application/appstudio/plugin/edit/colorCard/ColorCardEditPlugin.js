var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Cardinality = require('core/plugin/Cardinality');
var ColorCardEdit = require('appstudio/plugin/edit/colorCard/ColorCardEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ColorCardEditPlugin = function (){
    ColorCardEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new ColorCardEdit(),
        PluginModelType.EDIT.COLOR]);
    this._cardinality = Cardinality.HAS_MANY;
};

Digi.inherits(ColorCardEditPlugin, ModelViewPlugin);

module.exports = ColorCardEditPlugin;