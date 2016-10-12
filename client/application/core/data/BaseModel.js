
"use strict";

// TODO: implement observable
var Digi = require('core/Digi');
var AssociationFactory = require('core/data/association/AssociationFactory');

var Field = require('core/data/Field');
var UUID = require('uuid-js');

/**
 *
 * @param config
 * example: if we have a model UserModel which has been extended from BaseModel and has two fields with names
 * 'name' and 'lastName' we can create a new instance of UserModel with the follwing:
 * u = new UserModel({
 *      name: "Ludwig",
 *      lastName: "van beethoven"
 * })
 *
 * @constructor
 */

var BaseModel = function (config) {

    this._fields = [];

    this._validations = {};

    this._serverErrors = {};

    this._fieldErrors = {};

    this._dirty = false;

    this._rawData = {};

    /**
     * holds the raw data of the model. essentially the POJO object that this model is created based on.
     * @type {{Object}}
     */
    this.raw = {};

    this._associationsConfig = [];
    this._associations = [];

    this._config = config || {};
};

_.extend(BaseModel.prototype, {

    init: function (schema) {
        this._schema = schema;

        this._initAssociations();

        if (this._config) {
            this._initAssociatedData();
            this._setFieldsData();
        } 

        var id = this.getFieldValue('id');

        if (id && id.length > 0) {
            this.id = id;
        } else {
            this.id = UUID.create().toString();
        }

    },

    _setFieldsData: function () {

        var config = this._config,
            schema = this._schema,
            nFields = this._fields.length,
            fields = this._fields,
            field,
            fieldValue,
            fieldName,
            i;

        // TODO: the field names should be unique.
        // If two fields exist with the same name throw an error.
        // initializing the data
        for (i = 0; i < nFields; i++) {
            field = fields[i];
            fieldName = field.getName();
            fieldValue = config[fieldName];
            if (fieldValue == undefined && 
                schema.properties[fieldName] &&
                schema.properties[fieldName].default != undefined){
                    fieldValue = schema.properties[fieldName].default;
                }

            if (Digi.isDefined(fieldValue)) {
                this._rawData[fieldName] = fields[i].setValue(fieldValue);
            } else {
                this._rawData[fieldName] = undefined;
            }
        }
    },

    getFields: function() {
        return this._fields;
    },

    _getField: function (name) {
        return _.find(this._fields, function(obj) { return obj.getName() === name });
    },

    /**
     * returns the type of this field which is one of core/data/FieldTypes
     */
    getFieldType: function(fieldName) {
		//TODO: Refactor finding the field or change the way we find a field
        var field = _.find(this._fields, function(field) {
            return field.getName() === fieldName;
        });

        return field.getType().type;
    },
    getFieldTitle: function(fieldName) {
        var field = _.find(this._fields, function(field) {
            return field.getName() === fieldName;
        });

        return field.getTitle();
    },
	getFieldHelp: function(fieldName) {
		var field = _.find(this._fields, function(field) {
			return field.getName() === fieldName;
		});
		
		return field.getHelp();
	},
    getAssociations: function() {
        return this._associations;
    },

    isOneOf: function(associationName) {
        var modelType,
            association;

        association = _.find(this._associations, function (association) {
            return association.getName() === associationName;
        });

        modelType = association && association.getModelType();

        return Digi.isArray(modelType);
    },

    getOneOfTypes: function(associationName) {
        var modelType,
            association;

        association = _.find(this._associations, function (association) {
            return association.getName() === associationName;
        });

        modelType = association && association.getOneOf();

        if (!Digi.isArray(modelType)) {
            throw new Error('model is not one of');
        }

        return modelType;
    },
    getAnyOfTypes: function(associationName) {
        var anyOf = [],
            association;

        association = _.find(this._associations, function (association) {
            return association.getName() === associationName;
        });
        if (association){
            anyOf = association.getAnyOf();    
        }
        
        return anyOf;
    },
	//TODO: Refactor getAssociation - there is a lot of repeated code here
	getAssociation: function(associationName) {
		var association;

		association = _.find(this._associations, function (association) {
			return association.getName() === associationName;
		});

		if (!association){
			return null;
		}
		return association;
	},
	getAssociationRef: function(associationName) {
        var association;

        association = _.find(this._associations, function (association) {
            return association.getName() === associationName;
        });

        if (!association){
            return null;
        }
        return association.getRef();
    },    
    getAssociationModelType: function(associationName) {
        var association;

        association = _.find(this._associations, function (association) {
            return association.getName() === associationName;
        });

        if (!association){
            return null;
        }
        return association.getModelType();
    },  
    getAssociationItemTitle: function(associationName) {
        var association;

        association = _.find(this._associations, function (association) {
            return association.getName() === associationName;
        });

        if (!association){
            return '';
        }
        return association.getItemTitle();
    },  
    getAssociationTitle: function(association) {
        var properties = this._schema.properties,
            p = properties[association.getName()];

        if (!p) {
            throw new Error("association does not exist", association, this);
        }

        return p.title;
    },
    
    isEnum: function(fieldName) {
        var properties = this._schema.properties,
            p = properties[fieldName];

        if (!p) {
            throw new Error("property does not exist", fieldName, this);
        }
        return (p.hasOwnProperty('enum'))?true:false;
    },   
         
    getEnumField: function(fieldName) {
        var properties = this._schema.properties,
            p = properties[fieldName];

        if (!p) {
            throw new Error("property does not exist", fieldName, this);
        }
        return (p.hasOwnProperty('enum'))?p.enum:null;
    },    
    _initAssociatedData: function () {
        var i,
            associations = this._associations,
            association,
            associationName,
            config = this._config;

        for (i = 0; i < associations.length; i++) {
            // for each association
            association = associations[i];
            associationName = association.getName();

            // if the  config has data for this association
            if (config.hasOwnProperty(associationName)) {

                association.setData(config[associationName]);

                this._rawData[associationName] = association.getData();
            }
        }
    },

    _initAssociations: function () {
        var associationsConfig = this._associationsConfig,
            i;

        for (i = 0; i < associationsConfig.length; i++) {
            associationsConfig[i].ownerModel = this;
            this._associations.push(
                AssociationFactory.createAssociation(associationsConfig[i])
            );
        }
    },

    // TODO: we need to look at the fields and the associations and internally set this value
    isDirty: function () {
        return this._dirty;
    },

    setDirty: function (dirty) {
        if (!Digi.isBoolean()) {
            throw new Error("setDirty needs a boolean value");
        }

        this._dirty = dirty;
    },

    isValid: function () {
        //TODO
        return true;
    },

    validate: function () {
        //TODO: return errors is there are any
    },

    getFieldValue: function (fieldName) {
        return this._rawData[fieldName];
    },

    setFieldValue: function(fieldName, value) {
        var data = this._rawData,
            field;

        field = this._getField(fieldName);

        if (!Digi.isDefined(field)) {
            throw new Error('Model has no field ' + fieldName);
        }

        //TODO: ensure value has the correct type that the field allows.
        data[fieldName] = field.convert(value);
    },
	
    getHasOneAssociations: function () {
       var i,
           associations = this._associations,
           associationLength = associations.length,
           list = [],
           HASONE = 'HASONE';
           
       for (i = 0; i < associationLength; i++) {
            if (associations[i].getAssociationType() == HASONE){
                list.push(associations[i]);
            }
       }
       
       return list;  
    },
	
    getHasManyAssociations: function () {
        //TODO: Refactor getHasOne and getHasMany Associations
        var i,
            associations = this._associations,
            associationLength = associations.length,
            list = [],
            HASMANY = 'HASMANY';

        for (i = 0; i < associationLength; i++) {
            if (associations[i].getAssociationType() == HASMANY){
                list.push(associations[i]);
            }
        }

        return list;
    },
	
    getHasManyTypes: function (hasManyKey) {
        return Digi.Schema.getAnyOfList(this._schema.properties, hasManyKey);
    },

    getJson: function () {
        var data = this._rawData,
            associations = this._associations,
            association,
            i;

        for (i = 0; i < associations.length; i++) {
            association = associations[i];
            data[association.getName()] = associations[i].getJson();
        }

        //data['_metadata'] = this._metadata;

        return data;
    },
    getSchemaProperties: function() {
        return this._schema.properties;
    }

});

module.exports = BaseModel;
