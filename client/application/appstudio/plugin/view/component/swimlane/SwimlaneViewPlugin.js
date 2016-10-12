var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var SwimlaneView = require('appstudio/plugin/view/component/swimlane/SwimlaneView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var SwimlaneViewPlugin = function (){
    SwimlaneViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new SwimlaneView(),
        PluginModelType.VIEW.COMPONENT.SWIMLANE]);
};

Digi.inherits(SwimlaneViewPlugin, ModelViewPlugin);

module.exports = SwimlaneViewPlugin;