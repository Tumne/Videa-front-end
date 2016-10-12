"use strict";

var Digi = require('core/Digi');

var FieldTypes = {
    // TODO: add enumeration types

    BOOLEAN: {
        convert: function (value) {
            var defaultValue = false;

            if (typeof value === 'boolean') {
                return value;
            }

            if (value === 'true') {
                return true;
            } else if (value === 'false') {
                return false;
            }

            if (value === 1) {
                return true;
            } else if (value === 0) {
                return false;
            }

            return defaultValue;
        },
        type: 'boolean'
    },

    STRING: {
        convert: function (value) {
            var defaultValue = '';
            return (value === undefined || value === null) ? defaultValue : String(value);
        },
        type: 'string'
    },

    INT: {
        convert: function (value) {
            if (Digi.isNumber(value)) {
                return parseInt(value, 10);
            }
            return 0;
        },
        type: 'int'
    },

    FLOAT: {
        convert: function (value) {

            if (Digi.isNumber(value)) {
                return value;
            }

            if (Digi.isString(value)) {
                return parseFloat(value);
            }

            return 0;
        },
        type: 'float'
    },

    DATE: {
        convert: function (value) {
            //TODO: implement date conversion
            return value;
        },
        type: 'date'
    }

};


module.exports = FieldTypes;
