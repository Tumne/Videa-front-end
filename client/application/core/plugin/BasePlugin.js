
var Cardinality = require('core/plugin/Cardinality');
var BasePlugin = function(){
    this._cardinality = Cardinality.HAS_ONE;
};

BasePlugin.prototype.getCardinality = function (){
    return this._cardinality;
};

module.exports = BasePlugin;