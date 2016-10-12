var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ListenerCreate = require('appstudio/plugin/create/listener/ListenerCreate');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ListenerCreatePlugin = function (){
	ListenerCreatePlugin.super_.apply(this, [
		Purpose.CREATE,
		new ListenerCreate(),
		PluginModelType.CREATE.LISTENER]);
};

Digi.inherits(ListenerCreatePlugin, ModelViewPlugin);

module.exports = ListenerCreatePlugin;

