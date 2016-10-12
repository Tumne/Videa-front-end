var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Cardinality = require('core/plugin/Cardinality');
var FontEdit = require('appstudio/plugin/edit/font/FontEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var FontEditPlugin = function (){
    FontEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new FontEdit(),
        PluginModelType.EDIT.FONT]);
};

Digi.inherits(FontEditPlugin, ModelViewPlugin);

module.exports = FontEditPlugin;