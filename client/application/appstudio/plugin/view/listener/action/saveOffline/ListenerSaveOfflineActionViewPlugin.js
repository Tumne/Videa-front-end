var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerSaveOfflineActionViewPlugin = function (){
    ListenerSaveOfflineActionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="action-view">Save<br/>Offline</div>';
            }
        },
        PluginModelType.VIEW.ACTION.SAVEOFFLINE]);
};

Digi.inherits(ListenerSaveOfflineActionViewPlugin, ModelViewPlugin);

module.exports = ListenerSaveOfflineActionViewPlugin;
