var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GenericScreenIdView = require('appstudio/plugin/GenericScreenIdView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var SeeAllLabelEditPlugin = function (){
    SeeAllLabelEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new GenericScreenIdView(),
        PluginModelType.EDIT.SEEALLLABEL]);
};

Digi.inherits(SeeAllLabelEditPlugin, ModelViewPlugin);

module.exports = SeeAllLabelEditPlugin;