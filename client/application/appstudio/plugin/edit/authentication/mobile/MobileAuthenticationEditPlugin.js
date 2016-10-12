var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var MobileAuthenticationEdit = require('appstudio/plugin/edit/authentication/mobile/MobileAuthenticationEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var MobileAuthenticationEditPlugin = function (){
    MobileAuthenticationEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new MobileAuthenticationEdit(),
        PluginModelType.EDIT.AUTHENTICATION.MOBILE]);
};

Digi.inherits(MobileAuthenticationEditPlugin, ModelViewPlugin);

module.exports = MobileAuthenticationEditPlugin;