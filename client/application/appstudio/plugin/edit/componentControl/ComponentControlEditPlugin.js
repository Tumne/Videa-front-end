var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Cardinality = require('core/plugin/Cardinality');
var ComponentControlEdit = require('appstudio/plugin/edit/componentControl/ComponentControlEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var ComponentControlEditPlugin = function (){
    ComponentControlEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new ComponentControlEdit(),
        PluginModelType.EDIT.COMPONENTCONTROL]);
};

Digi.inherits(ComponentControlEditPlugin, ModelViewPlugin);

module.exports = ComponentControlEditPlugin;