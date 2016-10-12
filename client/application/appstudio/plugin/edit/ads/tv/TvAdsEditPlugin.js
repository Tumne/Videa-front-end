var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var AdsEdit = require('appstudio/plugin/edit/ads/AdsEdit');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TvAdsEditPlugin = function (){
    TvAdsEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new AdsEdit(),
        PluginModelType.EDIT.ADS.TV]);
};

Digi.inherits(TvAdsEditPlugin, ModelViewPlugin);

module.exports = TvAdsEditPlugin;