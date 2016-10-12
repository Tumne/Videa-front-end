var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var AdvanceScreenEdit = require('appstudio/plugin/edit/screen/advance/AdvanceScreenEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var AdvanceScreenEditPlugin = function (){
	AdvanceScreenEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new AdvanceScreenEdit(),
		PluginModelType.EDIT.SCREEN.ADVANCE]);
};

Digi.inherits(AdvanceScreenEditPlugin, ModelViewPlugin);

module.exports = AdvanceScreenEditPlugin;

