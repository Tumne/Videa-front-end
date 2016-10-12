
var ViewPlugin = require('core/plugin/ViewPlugin');
var Digi = require('core/Digi');
var ModelViewPlugin = function(purpose, view, modelType){
    ModelViewPlugin.super_.apply(this, [purpose, view]);
    this._modelType = modelType;
};

Digi.inherits(ModelViewPlugin, ViewPlugin);

ModelViewPlugin.prototype.getModelType = function (){
    return this._modelType;
};


module.exports = ModelViewPlugin;