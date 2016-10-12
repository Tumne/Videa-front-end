var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerRemoveUIDActionViewPlugin = function (){
    ListenerRemoveUIDActionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="action-view">Remove<br/>UID</div>';
            }
        },
        PluginModelType.VIEW.ACTION.REMOVEUID]);
};

Digi.inherits(ListenerRemoveUIDActionViewPlugin, ModelViewPlugin);

module.exports = ListenerRemoveUIDActionViewPlugin;
