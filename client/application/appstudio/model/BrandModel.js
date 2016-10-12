var BaseModel = require('appstudio/model/BaseModel');
var Digi = require('core/Digi');

var BrandModel = function BrandModel(data) {
    BrandModel.super_.apply(this, [data]);
    this._modelType = 'brand';
}

Digi.inherits(BrandModel, BaseModel);

BrandModel.prototype.setName = function (name) {
    this.data.name = name;
};

BrandModel.prototype.setImage = function (image) {
    this.data.image = image;
};

BrandModel.prototype.getId = function() {
    return this.data.id;
};

BrandModel.prototype.getName = function () {
    return this.data.name;
};

BrandModel.prototype.getImage = function () {
    return this.data.image;
};

BrandModel.prototype.getAppIds = function () {
    return this.data.app; //Array of app Ids
};

module.exports = BrandModel;
