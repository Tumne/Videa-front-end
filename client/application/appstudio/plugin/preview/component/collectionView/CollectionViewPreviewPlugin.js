var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var CollectionViewPreview = require('appstudio/plugin/preview/component/collectionView/CollectionViewPreview');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var CollectionViewPreviewPlugin = function (){
    CollectionViewPreviewPlugin.super_.apply(this, [
        Purpose.PREVIEW,
        new CollectionViewPreview(),
        PluginModelType.PREVIEW.COMPONENT.COLLECTIONVIEW]);
};

Digi.inherits(CollectionViewPreviewPlugin, ModelViewPlugin);

module.exports = CollectionViewPreviewPlugin;