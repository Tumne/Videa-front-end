var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var NavigationTypeView = require('appstudio/plugin/view/navigationType/NavigationTypeView');
var PluginModelType = require('appstudio/plugin/PluginModelType');

var NavigationTypeViewPlugin = function (){
    NavigationTypeViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new NavigationTypeView(),
        PluginModelType.VIEW.APPNAVIGATION.NAVIGATION]);
};

Digi.inherits(NavigationTypeViewPlugin, ModelViewPlugin);

var VerticalNavigationTypeViewPlugin = function (){
    VerticalNavigationTypeViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new NavigationTypeView(),
        PluginModelType.VIEW.APPNAVIGATION.TYPE.VERTICAL]);
};

Digi.inherits(VerticalNavigationTypeViewPlugin, ModelViewPlugin);

var DrawerNavigationTypeViewPlugin = function (){
    DrawerNavigationTypeViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new NavigationTypeView(),
        PluginModelType.VIEW.APPNAVIGATION.TYPE.DRAWER]);
};

Digi.inherits(DrawerNavigationTypeViewPlugin, ModelViewPlugin);

var TopNavigationTypeViewPlugin = function (){
    TopNavigationTypeViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new NavigationTypeView(),
        PluginModelType.VIEW.APPNAVIGATION.TYPE.TOP]);
};

Digi.inherits(TopNavigationTypeViewPlugin, ModelViewPlugin);

module.exports = {
    NavigationTypeViewPlugin: NavigationTypeViewPlugin,
    VerticalNavigationTypeViewPlugin: VerticalNavigationTypeViewPlugin,
    DrawerNavigationTypeViewPlugin: DrawerNavigationTypeViewPlugin,
    TopNavigationTypeViewPlugin: TopNavigationTypeViewPlugin
}
