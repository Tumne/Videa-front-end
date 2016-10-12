var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerRemoveOfflineActionViewPlugin = function (){
    ListenerRemoveOfflineActionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="action-view">Remove<br/>Offline</div>';
            }
        },
        PluginModelType.VIEW.ACTION.REMOVEOFFLINE]);
};

Digi.inherits(ListenerRemoveOfflineActionViewPlugin, ModelViewPlugin);

module.exports = ListenerRemoveOfflineActionViewPlugin;
