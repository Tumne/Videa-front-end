

var Digi = require('core/Digi');
var VideaError = require('core/model/VideaError');
var Field = require('core/data/Field');

var TestError = function () {
    VideaError.call(this);

    this._fields.push(
        new Field({
            name: 'test',
            type: 'int'
        })
    );
};

Digi.inherits(TestError, VideaError);

module.exports = VideaError;

