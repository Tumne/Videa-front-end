

var Association = require('core/data/association/Association');
var Digi = require('core/Digi');
var Inflected = require('inflected');

var HasMany = function (config) {
    Association.call(this, config);
    
    var associationName = this._name,
        associationPropertyName = this._associationPropertyName;

    this.isHasMany = true;
    
    this._itemTitle = config.itemTitle;
    
    this._ownerModel[associationPropertyName] = [];

    this._getterName = "get" + Digi.String.capitalizeFirstLetter(Inflected.pluralize(associationName));

    this._ownerModel[this._getterName] =
        Digi.Function.pass(function (list) {
            return list;
        }, [this._ownerModel[associationPropertyName]]);

    this._setterName = "add" + Digi.String.capitalizeFirstLetter(associationName);

    this._ownerModel[this._setterName] =
        Digi.Function.pass(function (item) {

            this.list.push(item);

        }, [], {list: this._ownerModel[associationPropertyName]});
        
    this._removeName = "remove" + Digi.String.capitalizeFirstLetter(associationName);

    this._ownerModel[this._removeName] =
        Digi.Function.pass(function (itemIndex) {
            if (!Digi.isNumber(itemIndex)) {
                throw new Error('Must supply an index to remove', itemIndex);
            }
            
            if (itemIndex > this.list.length) {
                throw new Error('Index supplied is not valid', itemIndex);
            }

            this.list.splice(itemIndex, 1);

        }, [], {list: this._ownerModel[associationPropertyName]});
        
    this._reorderName = "reorder" + Digi.String.capitalizeFirstLetter(associationName);

    this._ownerModel[this._reorderName] = Digi.Function.pass(function (beforeIndex, afterIndex) {
        var length = this.list.length;
        
        if (afterIndex > length || beforeIndex > length){
            throw new Error('Index specified is larger than list');
        }
        if (afterIndex < 0 || beforeIndex < 0){
            throw new Error('Index specified is smaller than list');
        }        
        
        Digi.Array.move(this.list, beforeIndex, afterIndex);

        }, [], {list: this._ownerModel[associationPropertyName]});
        
    this._replaceName = "replace" + Digi.String.capitalizeFirstLetter(associationName);

    this._ownerModel[this._replaceName] =
        Digi.Function.pass(function (itemIndex, data) {
            if (!Digi.isNumber(itemIndex)) {
                throw new Error('Must supply an index to remove', itemIndex);
            }
            
            if (itemIndex > this.list.length) {
                throw new Error('Index supplied is not valid', itemIndex);
            }

            this.list[itemIndex] = data;

        }, [], {list: this._ownerModel[associationPropertyName]});                         
};

Digi.inherits(HasMany, Association);

_.extend(HasMany.prototype, {

    getJson: function () {
        var i,
            list = this._ownerModel[this._getterName](),
            res = [];
 
        for (i = 0; i < list.length; i++) {
			//If the HasMany association has a list of IDs, just get the string id. 
			Digi.isString(list[i]) ? res.push(list[i]) : res.push(list[i].getJson());
        }
        return res;
    },
    getAssociationType: function() {
        return 'HASMANY';
    },
    getItemTitle: function() {
        return this._itemTitle;
    },
    getReplaceName: function() {
        return this._replaceName;
    }
});

module.exports = HasMany;

