var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var CollectionView = require('appstudio/plugin/view/component/collectionView/CollectionView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var CollectionViewPlugin = function (){
    CollectionViewPlugin.super_.apply(this, [
        Purpose.VIEW,
        new CollectionView(),
        PluginModelType.VIEW.COMPONENT.COLLECTIONVIEW]);
};

Digi.inherits(CollectionViewPlugin, ModelViewPlugin);

module.exports = CollectionViewPlugin;