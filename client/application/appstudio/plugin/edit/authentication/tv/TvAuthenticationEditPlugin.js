var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var TvAuthenticationEdit = require('appstudio/plugin/edit/authentication/tv/TvAuthenticationEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TvAuthenticationEditPlugin = function (){
    TvAuthenticationEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new TvAuthenticationEdit(),
        PluginModelType.EDIT.AUTHENTICATION.TV]);
};

Digi.inherits(TvAuthenticationEditPlugin, ModelViewPlugin);

module.exports = TvAuthenticationEditPlugin;