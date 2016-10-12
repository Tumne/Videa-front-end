var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var FontsEdit = require('appstudio/plugin/edit/theme/fonts/FontsEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var FontsEditPlugin = function (){
  FontsEditPlugin.super_.apply(this, [
    Purpose.EDIT,
    new FontsEdit(),
    PluginModelType.EDIT.THEME.FONTS]);
};

Digi.inherits(FontsEditPlugin, ModelViewPlugin);

module.exports = FontsEditPlugin;

