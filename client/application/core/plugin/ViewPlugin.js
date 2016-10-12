
var BasePlugin = require('core/plugin/BasePlugin');
var Digi = require('core/Digi');
var Cardinality = require('core/plugin/Cardinality');

var ViewPlugin = function(purpose, view){
    ViewPlugin.super_.apply(this, []);
    this._purpose = purpose;
    this._view = view;
};
Digi.inherits(ViewPlugin, BasePlugin);

ViewPlugin.prototype.getPurpose = function (){
    return this._purpose;
};

ViewPlugin.prototype.getView = function (){
    return this._view;
};


module.exports = ViewPlugin;