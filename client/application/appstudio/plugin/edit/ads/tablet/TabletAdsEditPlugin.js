var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var AdsEdit = require('appstudio/plugin/edit/ads/AdsEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TabletAdsEditPlugin = function (){
    TabletAdsEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new AdsEdit(),
        PluginModelType.EDIT.ADS.TABLET]);
};

Digi.inherits(TabletAdsEditPlugin, ModelViewPlugin);

module.exports = TabletAdsEditPlugin;