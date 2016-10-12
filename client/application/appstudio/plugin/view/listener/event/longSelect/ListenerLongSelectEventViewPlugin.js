var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerLongSelectEventViewPlugin = function (){
    ListenerLongSelectEventViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="select-view">Long<br/>Select</div>';
            }
        },
        PluginModelType.VIEW.EVENT.LONGSELECT]);
};

Digi.inherits(ListenerLongSelectEventViewPlugin, ModelViewPlugin);

module.exports = ListenerLongSelectEventViewPlugin;
