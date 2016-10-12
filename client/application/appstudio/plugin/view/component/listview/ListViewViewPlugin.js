var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ListViewView = require('appstudio/plugin/view/component/listview/ListViewView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var ListViewViewPlugin = function (){
    ListViewViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new ListViewView(),
        PluginModelType.VIEW.COMPONENT.LISTVIEW]);
};

Digi.inherits(ListViewViewPlugin, ModelViewPlugin);

module.exports = ListViewViewPlugin;