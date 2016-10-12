
"use strict";

var FieldTypes = require('core/data/FieldTypes');
var UUID = require('uuid-js');


var Field = function (config) {

    this._defaultValue = config.defaultValue;
    
    if (!config.hasOwnProperty('type')) {
        throw new Error('type is a required parameter of fields');
    }

    this._type = FieldTypes[config.type.toUpperCase()];

    // use the default converter if one was not provided
    this._convert = config.hasOwnProperty('convert') ? config.convert : this._type.convert;

    if (config.hasOwnProperty('defaultValue')) {
        this._defaultValue = config.defaultValue;
    } else {
        this._defaultValue = this._type.convert(this._defaultValue);
    }

    if (!config.hasOwnProperty('name')) {
        throw new Error('every field should have a name');
    }

    this._name = config.name;

    if (!config.hasOwnProperty('title')) {

        console.log('field does not have a title', [config]);
    }
    
    this._title = config.title;

    this.id = UUID.create().toString();
	
	this._help = config.help;

};


_.extend(Field.prototype, {

    getTitle: function() {
        return this._title;
    },

    getName: function () {
        return this._name;
    },

    setValue: function(value) {
        this.value = this.convert(value);

        return this.value;
    },

    convert: function (value) {
        return this._convert(value);
    },

    getDefaultValue: function () {
        return this._defaultValue;
    },

    getType: function() {
        return this._type;
    },
	getHelp: function() {
		return this._help;	
	}
});

module.exports = Field;
