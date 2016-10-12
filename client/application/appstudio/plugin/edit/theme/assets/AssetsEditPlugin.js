var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var AssetsEdit = require('appstudio/plugin/edit/theme/assets/AssetsEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var AssetsEditPlugin = function (){
  AssetsEditPlugin.super_.apply(this, [
    Purpose.EDIT,
    new AssetsEdit(),
    PluginModelType.EDIT.THEME.ASSETS]);
};

Digi.inherits(AssetsEditPlugin, ModelViewPlugin);

module.exports = AssetsEditPlugin;

