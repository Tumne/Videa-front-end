var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ListenerEdit = require('appstudio/plugin/edit/listener/ListenerEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ListenerEditPlugin = function (){
	ListenerEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new ListenerEdit(),
		PluginModelType.EDIT.LISTENER]);
};

Digi.inherits(ListenerEditPlugin, ModelViewPlugin);

module.exports = ListenerEditPlugin;

