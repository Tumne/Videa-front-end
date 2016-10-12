

var Association = require('core/data/association/Association');
var Digi = require('core/Digi');

var HasOne = function (config) {

    Association.call(this, config);

    var associationName = this._name,
        capitalizedVarName = Digi.String.capitalizeFirstLetter(associationName),
        associationPropertyName = this._associationPropertyName;

    this.isHasOne = true;

    this._ownerModel[associationPropertyName] = undefined;
    this._getterName = "get" + capitalizedVarName;
    this._setterName = "set" + capitalizedVarName;

    this._ownerModel[this._getterName] =
        Digi.Function.pass(function (ownerModel, varName) {

            return ownerModel[varName];

        }, [this._ownerModel, associationPropertyName]);

    this._ownerModel[this._setterName] =
        Digi.Function.pass(function (newObj) {

            this.owner[this.key] = newObj;

        }, [], {key: associationPropertyName, owner: this._ownerModel});

};

Digi.inherits(HasOne, Association);

_.extend(HasOne.prototype, {

    getJson: function () {
        var hasOneModel = this._ownerModel[this._getterName]();
        return hasOneModel ? hasOneModel.getJson() : undefined;
    },
    getAssociationType: function() {
        return 'HASONE';
    }
});


module.exports = HasOne;





