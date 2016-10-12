var Cardinality = require('core/plugin/Cardinality');
var Purpose = require('core/plugin/Purpose');
var ViewRegistry = function () {
    this._pluginList = {};

    this._hasOneCardinality = function(cardinality) {
        return cardinality == Cardinality.HAS_ONE;
    };

    this._hasManyCardinality = function(cardinality) {
        return cardinality == Cardinality.HAS_MANY;
    };

    this._createNewPurpose = function(purpose) {
        if (this._pluginList[purpose] === undefined){
            this._pluginList[purpose] = [];
        }
    };

    this._createNewModelTypeInPurpose = function(purpose, modelType){
        if (this._pluginList[purpose][modelType] === undefined) {
            this._pluginList[purpose][modelType] = [];
        }
    };
};

ViewRegistry.prototype.register = function(modelViewPlugin){
    var purpose = modelViewPlugin.getPurpose(),
        modelType = modelViewPlugin.getModelType(),
        cardinality = modelViewPlugin.getCardinality();

    if (!purpose ||
        !modelType ||
        !(cardinality === Cardinality.HAS_ONE ||
         cardinality === Cardinality.HAS_MANY)
        ) {
        throw new Error('Cannot register invalid plugin: ', purpose, modelType, cardinality);
    }

    this._createNewPurpose(purpose);
    this._createNewModelTypeInPurpose(purpose, modelType);

    if (this._hasOneCardinality(cardinality)){
        this._pluginList[purpose][modelType] = [modelViewPlugin];
    }

    if (this._hasManyCardinality(cardinality)){
        this._pluginList[purpose][modelType].push(modelViewPlugin);
    }
};

ViewRegistry.prototype.deregister = function(modelType){
    var purposes = Object.keys(Purpose);
    for(var i = 0; i < purposes.length; i++){
        if (this._pluginList[purposes[i]].hasOwnProperty(modelType)){
            delete this._pluginList[purpose[i]][modelType];
        }
    }
};

ViewRegistry.prototype.getPlugin = function( modelType, purpose) {
    if (this._pluginList[purpose] &&
        this._pluginList[purpose][modelType]){
        return this._pluginList[purpose][modelType];
    }
};


module.exports = ViewRegistry;