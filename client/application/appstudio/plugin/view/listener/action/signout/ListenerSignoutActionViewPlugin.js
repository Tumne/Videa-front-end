var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerSignoutActionViewPlugin = function (){
    ListenerSignoutActionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="action-view">Signout</div>';
            }
        },
        PluginModelType.VIEW.ACTION.SIGNOUT]);
};

Digi.inherits(ListenerSignoutActionViewPlugin, ModelViewPlugin);

module.exports = ListenerSignoutActionViewPlugin;
