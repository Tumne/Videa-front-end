var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GenericComplexModelView = require('appstudio/plugin/GenericComplexModelView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var TitleSectionEditPlugin = function (){
    TitleSectionEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new GenericComplexModelView(),
        PluginModelType.EDIT.TITLESECTION]);
};

Digi.inherits(TitleSectionEditPlugin, ModelViewPlugin);

module.exports = TitleSectionEditPlugin;