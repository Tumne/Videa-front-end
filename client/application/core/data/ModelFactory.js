"use strict";

var BaseModel  = require('core/data/BaseModel');
var Digi = require('core/Digi');
var Field = require('core/data/Field');

var BaseService = require('core/service/BaseService');

var SCHEMA_TO_FIELD_TYPE_MAPPING = {
    'string': 'string',
    'integer': 'int',
    'number': 'float',
    'boolean': 'boolean'
};

var ModelFactory = function (schemaService, $q) {
    BaseService.call(this, $q);

    this._schemaService = schemaService;
};

Digi.inherits(ModelFactory, BaseService);


_.extend(ModelFactory.prototype, {

    /**
     * Create an instance of the given model type
     * @param type the type string that represents the path of the schema on the server
     * @param raw instance data to use to initializing the instance
     * @returns {*}
     */
    create: function (type, raw) {
        var me = this,
            deferred = this.getDeferred();

        if (!type) {
            console.log('no type provided for raw ', raw);
            return deferred.reject('no type provided');
        }

        this._defineModel(type).then(
            function (Class) {
                return me._instantiate(Class, raw, type);
            }
        ).then(
            function(instance) {
                // console.log('instance ', instance);
                deferred.resolve(instance);
            }
        ).catch(
            function(err) {
                console.log('err ', err);
                deferred.reject(err);
            }
        );

        return deferred.promise;
    },

    _defineNamespace: function (type) {
        var names = type.split('.');

        names.pop();

        if (!window["com.videa"]) {
            window.com = {};
            window.com.videa = {};
        }

        return Digi.Namespace.extend(window.com.videa, names.join("."));
    },

    _findAssociatedPropertiesWithData: function (properties, raw) {

        var keys = Object.keys(properties);

        return _.filter(keys,

            function(key) {

                var property = this.properties[key],
                    isArray = property.hasOwnProperty("type") && property.type === 'array',
                    isRef = property.hasOwnProperty("$ref"),
                    isObject = property.type && property.type === 'object',
                    rawHasArray = Digi.isArray(raw[key]);
                // TODO: make login more clean
                if (isArray) {
                    return Digi.isArray(raw[key]) && raw[key].length > 0;
                }

                if ((isObject || isRef) && raw.hasOwnProperty(key) && raw[key]) {
                    return true;
                }

                return false;
            },
            { properties: properties }
        );
    },

    _instantiate: function (Class, raw, type) {
        var me = this,
            instance,
            schemaPropertyKeys,
            schemaProperties,
            associationKeys,
            deferred = this.getDeferred();

        this._schemaService.getSchema(type).then(

            function (schema) {

                // create a new instance
                instance = new Class(raw);
                instance.init(schema); // important that this is right after instantiation

                // TODO: this should probably be set by the server so that it can be relied on.
                instance.setFieldValue('_metadata', type);

                if (!raw) {
                    // we don't have any instance data return
                    return deferred.resolve(instance);
                }

                //we have raw data

                schemaProperties = schema.properties;
                schemaPropertyKeys = Object.keys(schemaProperties);

                // find all properties in the schema that are arrays and the raw data has values for them
                associationKeys = me._findAssociatedPropertiesWithData(schemaProperties, raw);

                if (!associationKeys || associationKeys.length <= 0) {
                    return deferred.resolve(instance);
                }

                var f = _.map(associationKeys, function(key) {

                    var property = this.properties[key],
                        rawData,
                        def = this.me.getDeferred(),
                        setterName = "add" + Digi.String.capitalizeFirstLetter(key);

                    rawData = raw[key];

                    // TODO: code smell. this can be done more elegantly. The if statement is the code smell.
                    if (Digi.Schema.isArrayProperty(property) && Digi.isArray(rawData) && rawData.length > 0) {
                        // has many associations

                        var createPromises = [];
                        
                        if (property.items && property.items.type != undefined) {
                            for (var i = 0; i < rawData.length;i++) {
                                this.instance[setterName](rawData[i]);
                            }
                            def.resolve(this.instance);
                        } else {
                            // TODO: code smell. If rawData does not have any items in it there will be issues
                            // with resolving the instance. _findAssociatedPropertiesWithData does have a length
                            // check but we should not rely on that
                            for (var i = rawData.length - 1; i >= 0; i--) {
                                // if array type then loop through the items in the raw and define based on the type
                                // of the items.
                                createPromises.push(
                                    this.me._createFromRaw(
                                        rawData[i],
                                        i,
                                        setterName,
                                        this.instance)
                                );
                            }

                            Promise.all(createPromises).then(
                                Digi.Function.pass(function(resList) {

                                    var sortedResList = _.sortBy(resList, function(res) {
                                        return res.index;
                                    });

                                    _.each(sortedResList, function (res) {
                                        res.instance[res.setterName](res.obj);
                                    });

                                    def.resolve(this.instance);
                                }, [], {instance: this.instance})
                            )
                        }
                    } else if (Digi.Schema.isRefProperty(property) || Digi.Schema.isObjectProperty(property)) {

                        // has one associations
                        this.me._createAndSet(
                            rawData,
                            this.instance,
                            "set" + Digi.String.capitalizeFirstLetter(key)
                        ).then(
                            def.resolve,
                            def.reject
                        );

                    } else {
                        console.log('Warning: property in schema was neither an array nor $ref');
                    }

                    return def.promise;

                }, {me: me, properties: schemaProperties, instance: instance});

                Promise.all(f).then(
                    function (res) {
                        deferred.resolve(res[0]);
                    },
                    deferred.reject
                );
            }

        );

        return deferred.promise;
    },

    _createFromRaw: function(rawData, index, setterName, instance) {
        var deferred = this.getDeferred();
        if (!Digi.isDefined(rawData)) {
            console.log('warning: metadata not defined for ' + setterName);
        }

        var metadata = rawData._metadata;

        if (!metadata) {
            console.log('Warning: object has to metadata', rawData);
        }

        this.create(metadata, rawData).then(
            function(obj) {
                deferred.resolve({obj: obj, index: index, setterName: setterName, instance: instance});
            },
            function(err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    },

    /**
     *
     * @param rawData
     * @param instance
     * @param setterFnName
     * @returns {Promise<BaseModel>}
     * @private
     */
    _createAndSet: function (rawData, instance, setterFnName) {
        if (!Digi.isDefined(rawData)) {
            console.log('warning: metadata not defined for ' + setterFnName);
        }
        var metadata = rawData._metadata;

        if (!metadata) {
            console.log('Warning: object has to metadata', rawData);
        }

        var deferred = this.getDeferred();

        this.create(metadata, rawData).then(
            function(obj) {
                instance[setterFnName](obj);
                deferred.resolve(instance);
            },
            function (err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    },

    _getClassName: function (type) {
        return Digi.Array.lastElement(type.split("."));
    },

    /**
     *
     * @param type
     * @private
     */
    _defineModel: function (type) {

        var deferred = this.getDeferred(),
            keys, // every key is a field in the model
            nKeys,
            key,
            property,
            propertyType,
            arrayItemsType, // the type of the items in the array
            modelFields = [],
            associations = [],
            schemaProperties,
            namespace,
            className,
            i,
            ref,
            anyOf,
            oneOf,
            itemTitle;

        namespace = this._defineNamespace(type);
        className = this._getClassName(type);

        this._schemaService.getSchema(type).then(

            function (schema) {

                schemaProperties = schema.properties;
                keys = Object.keys(schemaProperties);
                nKeys = keys.length;

                for (i = 0; i < nKeys; i++) {
                    key = keys[i];
                    // the name is the key of the property
                    // lets figure the type of the field
                    // if the type of the field is a string, float, or integer

                    // but first if there to type attribute for this property
                    // then we should have a $ref property which specifies the type of this object
                    property = schemaProperties[key];

                    if (property.hasOwnProperty("type")) {

                        propertyType = property.type;
                        
                        ref = undefined;
                        
                        switch (propertyType) {

                            case 'boolean':
                            case 'string':
                            case 'integer':
                            case 'number':
                                modelFields.push({
                                    name: key,
                                    type: SCHEMA_TO_FIELD_TYPE_MAPPING[propertyType],
                                    title: property.title,
                                    defaultValue: property.default,
									help: property.help
                                });

                                break;

                            case 'array':

                                if (!property.hasOwnProperty("items") && property.items.hasOwnProperty("$ref")) {
                                    throw new Error("array type properties need items which should contain a $ref");
                                }

                                arrayItemsType = property.items.$ref || property.items.type;
                                ref = property.$ref || property.items.$ref;
                                anyOf = property.anyOf || [];
                                oneOf = property.oneOf || [];
                                itemTitle = property.items.title || '';
                                associations.push({
                                    type: 'hasMany',
                                    name: key,
                                    modelType: arrayItemsType,
                                    ref: ref,
                                    anyOf: anyOf,
                                    oneOf: oneOf,
                                    itemTitle: itemTitle,
									help: property.help
                                });
                                break;

                            case 'object':
                                //TODO: This hasOne happens when there is many has one references that it could be so enum values
                                oneOf = property.oneOf || [];
                                anyOf = property.anyOf || [];
                                
                                associations.push({
                                    type: 'hasOne',
                                    name: key,
                                    modelType: _.map(property.oneOf, function(obj) {return obj.$ref}),
                                    ref: property.$ref,
                                    oneOf: oneOf,
                                    anyOf: anyOf,
									help: property.help
                                });
                                break;
                            case 'null':
                                //TODO:
                                throw new Error('Must implement object and null handlers for Model Factory');

                        }

                    } else if (property.hasOwnProperty("$ref")) { // then its a has one relationship
                        //TODO: this is a hasOne relation with exactly one option like style
                        associations.push({
                            type: 'hasOne',
                            name: key,
                            modelType: property.$ref,
                            ref: property.$ref,
							help: property.help
                        });

                    }

                    // then lets add validations based on the schema validations
                }

                namespace[className] = Digi.Function.pass(
                    function (fields, associations, config) {
                        BaseModel.call(this, config);

                        for (var i = 0; i < fields.length; i++) {
                            this._fields.push(new Field(fields[i]));
                        }

                        this._associationsConfig.push.apply(this._associationsConfig, associations);
                    },
                    [modelFields, associations]);

                Digi.inherits(namespace[className], BaseModel);

                deferred.resolve(namespace[className]);
            }
        ).catch(
            function (err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    },

    _isPrimitiveType: function (type) {
        return  type === 'string'  ||
                type === 'boolean' ||
                type === 'integer' ||
                type === 'number'  ||
                type === 'null'    ||
                type === 'object'  ||
                type === 'string';
    }

});

module.exports = ModelFactory;

