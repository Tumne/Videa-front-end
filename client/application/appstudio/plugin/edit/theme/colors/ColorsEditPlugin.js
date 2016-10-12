var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ColorsEdit = require('appstudio/plugin/edit/theme/colors/ColorsEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ColorsEditPlugin = function (){
  ColorsEditPlugin.super_.apply(this, [
    Purpose.EDIT,
    new ColorsEdit(),
    PluginModelType.EDIT.THEME.COLORS]);
};

Digi.inherits(ColorsEditPlugin, ModelViewPlugin);

module.exports = ColorsEditPlugin;

