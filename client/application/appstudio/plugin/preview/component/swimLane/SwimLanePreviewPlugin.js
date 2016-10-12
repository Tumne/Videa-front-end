var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var SwimLanePreview = require('appstudio/plugin/preview/component/swimLane/SwimLanePreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var SwimLanePreviewPlugin = function (){
    SwimLanePreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new SwimLanePreview(),
        PluginModelType.PREVIEW.COMPONENT.SWIMLANE]);
};

Digi.inherits(SwimLanePreviewPlugin, ModelViewPlugin);

module.exports = SwimLanePreviewPlugin;