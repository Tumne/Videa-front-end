var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var DataViewDataEdit = require('appstudio/plugin/edit/gridViewData/DataViewDataEdit');

var PluginModelType = require('appstudio/plugin/PluginModelType');

var CollectionViewDataEditPlugin = function (){
	CollectionViewDataEditPlugin.super_.apply(this, [
		Purpose.EDIT,
		new DataViewDataEdit(),
		PluginModelType.EDIT.COLLECTIONVIEWDATA]);
};

Digi.inherits(CollectionViewDataEditPlugin, ModelViewPlugin);

module.exports = CollectionViewDataEditPlugin;

