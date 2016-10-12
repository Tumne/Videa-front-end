var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GenericScreenIdView = require('appstudio/plugin/GenericScreenIdView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var GoogleAnalyticPageCreatePlugin = function (){
    GoogleAnalyticPageCreatePlugin.super_.apply(this, [
        Purpose.CREATE,
        new GenericScreenIdView(),
        PluginModelType.CREATE.ANALYTICS.PAGE]);
};

Digi.inherits(GoogleAnalyticPageCreatePlugin, ModelViewPlugin);

module.exports = GoogleAnalyticPageCreatePlugin;