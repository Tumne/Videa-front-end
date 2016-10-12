var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var TabletAuthenticationEdit = require('appstudio/plugin/edit/authentication/tablet/TabletAuthenticationEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TabletAuthenticationEditPlugin = function (){
    TabletAuthenticationEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new TabletAuthenticationEdit(),
        PluginModelType.EDIT.AUTHENTICATION.TABLET]);
};

Digi.inherits(TabletAuthenticationEditPlugin, ModelViewPlugin);

module.exports = TabletAuthenticationEditPlugin;