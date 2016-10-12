var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');
var SecondaryMenuEdit = require('appstudio/plugin/edit/secondaryMenu/SecondaryMenuEdit');

var SecondaryMenuEditPlugin = function (){
    SecondaryMenuEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new SecondaryMenuEdit(),
        PluginModelType.EDIT.SECONDARYMENU]);
};

Digi.inherits(SecondaryMenuEditPlugin, ModelViewPlugin);

module.exports = SecondaryMenuEditPlugin;

