var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Cardinality = require('core/plugin/Cardinality');

var ListenerSigninActionViewPlugin = function (){
    ListenerSigninActionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        {
            getDirective: function(){
                return '<div class="action-view">Signin</div>';
            }
        },
        PluginModelType.VIEW.ACTION.SIGNIN]);
};

Digi.inherits(ListenerSigninActionViewPlugin, ModelViewPlugin);

module.exports = ListenerSigninActionViewPlugin;
