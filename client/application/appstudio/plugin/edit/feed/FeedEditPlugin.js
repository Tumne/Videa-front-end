var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var FeedEdit = require('appstudio/plugin/edit/feed/FeedEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var FeedEditPlugin = function (){
    FeedEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new FeedEdit(),
        PluginModelType.EDIT.FEED]);
};

Digi.inherits(FeedEditPlugin, ModelViewPlugin);

module.exports = FeedEditPlugin;