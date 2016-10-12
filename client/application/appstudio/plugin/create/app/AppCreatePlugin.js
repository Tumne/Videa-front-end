var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var AppCreate = require('appstudio/plugin/create/app/AppCreate');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var AppCreatePlugin = function (){
    AppCreatePlugin.super_.apply(this, [
        Purpose.CREATE,
        new AppCreate(),
        PluginModelType.CREATE.APP]);
};

Digi.inherits(AppCreatePlugin, ModelViewPlugin);

module.exports = AppCreatePlugin;