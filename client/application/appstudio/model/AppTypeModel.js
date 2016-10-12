
var BaseModel = require('appstudio/model/BaseModel');
var Digi = require('core/Digi');

var AppTypeModel = function AppTypeModel(data) {
    AppTypeModel.super_.apply(this, [data]);
    this._modelType = 'appType';
}

Digi.inherits(AppTypeModel, BaseModel);

AppTypeModel.prototype.getId = function() {
    return this.data.id;
};

AppTypeModel.prototype.getName = function () {
    if (this.data.name){
        return this.data.name.slice(0,1).toUpperCase() + this.data.name.slice(1);
    }
    return '';
};

AppTypeModel.prototype.getIcon = function () {
    return this.data.icon;
};

module.exports = AppTypeModel;