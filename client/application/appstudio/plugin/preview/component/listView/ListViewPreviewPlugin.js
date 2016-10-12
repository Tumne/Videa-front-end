var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var ListViewPreview = require('appstudio/plugin/preview/component/listView/ListViewPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var ListViewPreviewPlugin = function (){
    ListViewPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new ListViewPreview(),
        PluginModelType.PREVIEW.COMPONENT.LISTVIEW]);
};

Digi.inherits(ListViewPreviewPlugin, ModelViewPlugin);

module.exports = ListViewPreviewPlugin;