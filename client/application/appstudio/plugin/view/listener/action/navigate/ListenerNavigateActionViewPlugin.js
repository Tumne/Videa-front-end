var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerNavigateActionViewPlugin = function (){
    ListenerNavigateActionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="action-view">Navigate</div>';
            }
        },
        PluginModelType.VIEW.ACTION.NAVIGATE]);
};

Digi.inherits(ListenerNavigateActionViewPlugin, ModelViewPlugin);

module.exports = ListenerNavigateActionViewPlugin;
