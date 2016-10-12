var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerSaveUIDActionViewPlugin = function (){
    ListenerSaveUIDActionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="action-view">Save<br/>UID</div>';
            }
        },
        PluginModelType.VIEW.ACTION.SAVEUID]);
};

Digi.inherits(ListenerSaveUIDActionViewPlugin, ModelViewPlugin);

module.exports = ListenerSaveUIDActionViewPlugin;
