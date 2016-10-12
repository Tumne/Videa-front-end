var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ThemeEdit = require('appstudio/plugin/edit/theme/ThemeEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var MobileThemeEditPlugin = function (){
	MobileThemeEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new ThemeEdit(),
		PluginModelType.EDIT.THEME.MOBILE]);
};

Digi.inherits(MobileThemeEditPlugin, ModelViewPlugin);

module.exports = MobileThemeEditPlugin;

