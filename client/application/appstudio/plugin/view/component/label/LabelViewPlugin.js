var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var LabelView = require('appstudio/plugin/view/component/label/LabelView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var LabelViewPlugin = function (){
    LabelViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new LabelView(),
        PluginModelType.VIEW.COMPONENT.LABEL]);
};

Digi.inherits(LabelViewPlugin, ModelViewPlugin);

module.exports = LabelViewPlugin;