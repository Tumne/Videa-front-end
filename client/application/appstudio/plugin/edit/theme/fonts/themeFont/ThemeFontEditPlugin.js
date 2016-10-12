var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ThemeFontEdit = require('appstudio/plugin/edit/theme/fonts/themeFont/ThemeFontEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ThemeFontEditPlugin = function (){
  ThemeFontEditPlugin.super_.apply(this, [
    Purpose.EDIT,
    new ThemeFontEdit(),
    PluginModelType.EDIT.THEME.THEMEFONTS]);
};

Digi.inherits(ThemeFontEditPlugin, ModelViewPlugin);

module.exports = ThemeFontEditPlugin;

