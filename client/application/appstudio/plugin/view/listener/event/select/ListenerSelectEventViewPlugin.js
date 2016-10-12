var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerSelectEventViewPlugin = function (){
    ListenerSelectEventViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="select-view">Select</div>';
            }
        },
        PluginModelType.VIEW.EVENT.SELECT]);
};

Digi.inherits(ListenerSelectEventViewPlugin, ModelViewPlugin);

module.exports = ListenerSelectEventViewPlugin;
