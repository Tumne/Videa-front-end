var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GenericDisplayView = require('core/uicomponents/editor/genericDisplayView/GenericDisplayView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var GoogleAnalyticEventFieldViewPlugin = function (){
    GoogleAnalyticEventFieldViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new GenericDisplayView(),
        PluginModelType.VIEW.ANALYTICS.EVENTFIELD]);
};

Digi.inherits(GoogleAnalyticEventFieldViewPlugin, ModelViewPlugin);

module.exports = GoogleAnalyticEventFieldViewPlugin;
