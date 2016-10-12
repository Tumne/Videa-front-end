var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GenericScreenIdView = require('appstudio/plugin/GenericScreenIdView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var GoogleAnalyticPageEditPlugin = function (){
    GoogleAnalyticPageEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new GenericScreenIdView(),
        PluginModelType.EDIT.ANALYTICS.PAGE]);
};

Digi.inherits(GoogleAnalyticPageEditPlugin, ModelViewPlugin);

module.exports = GoogleAnalyticPageEditPlugin;