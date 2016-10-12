

//TODO: create Serializable interface/mixin that is mixed in at thislevel
    // but implemented at each subclass

var Association = function (config) {
    if (!config.ownerModel) {
        throw new Error('ownerModel is required');
    }

    this._ownerModel = config.ownerModel;

    if (!config.name) {
        throw new Error('association name property required');
    }

    this._name = config.name;
    this._help = config.help;

    this._associationPropertyName = "_" + this._name;

    if (!config.modelType) {
        throw new Error('association type property required');
    }

    this._modelType = config.modelType;

    this._ref = config.ref;
    this._anyOf = config.anyOf;
    this._oneOf = config.oneOf;

};

module.exports = Association;

_.extend(Association.prototype, {
    getName: function () {
        return this._name;
    },
    
    getHelp: function () {
        return this._help;
    },

    getAssociationPropertyName: function () {
        return this._associationPropertyName;
    },

    getData: function () {
        return this._ownerModel[this._associationPropertyName];
    },

    setData: function (data) {
        this._ownerModel[this._associationPropertyName] = data;
    },
    getModelType: function() {
        return this._modelType;
    },
    getGetterName: function() {
        return this._getterName;
    },
    getSetterName: function() {
        return this._setterName;
    },
    getRemoveName: function() {
        return this._removeName;
    },
    getRef: function() {
        return this._ref;
    },
    getAnyOf: function() {
        return this._anyOf;
    },
    getOneOf: function() {
        return this._oneOf;
    }            

});
