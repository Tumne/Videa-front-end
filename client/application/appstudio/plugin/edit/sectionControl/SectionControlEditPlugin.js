var ModelViewPlugin = require('core/plugin/ModelViewPlugin');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var GenericComplexModelView = require('appstudio/plugin/GenericComplexModelView');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var SectionControlEditPlugin = function (){
    SectionControlEditPlugin.super_.apply(this, [
        Purpose.EDIT,
        new GenericComplexModelView(),
        PluginModelType.EDIT.SECTIONCONTROL]);
};

Digi.inherits(SectionControlEditPlugin, ModelViewPlugin);

module.exports = SectionControlEditPlugin;