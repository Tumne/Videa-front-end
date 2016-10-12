var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GridViewView = require('appstudio/plugin/view/component/gridview/GridViewView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var GridViewViewPlugin = function (){
    GridViewViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new GridViewView(),
        PluginModelType.VIEW.COMPONENT.GRIDVIEW]);
};

Digi.inherits(GridViewViewPlugin, ModelViewPlugin);

module.exports = GridViewViewPlugin;