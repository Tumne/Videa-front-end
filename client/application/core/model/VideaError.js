
"use strict";

var Digi = require('core/Digi');
var BaseModel = require('core/data/BaseModel');
var Field = require('core/data/Field');

var VideaError = function () {

    BaseModel.call(this, []);

    this._fields.push(
        {
            name: 'name',
            type: 'string'
        },

        new Field({
            name: 'message',
            type: 'string'
        })
    );
};

Digi.inherits(VideaError, BaseModel);

module.exports = VideaError;



