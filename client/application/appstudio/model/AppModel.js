var BaseModel = require('appstudio/model/BaseModel');
var Digi = require('core/Digi');

AppModel = function AppModel (data) {
    AppModel.super_.apply(this, [data]);
    this._modelType = 'app';
    this.activeConfigModel = null;
};

Digi.inherits(AppModel, BaseModel);

AppModel.prototype.getId = function() {
    return this.data.id;
};

AppModel.prototype.getName = function () {
    return this.data.name;
};

AppModel.prototype.getActiveConfigId = function () {
    return this.data.activeConfig;
};

AppModel.prototype.getAppType = function () {
    return this.data.appType;
};

AppModel.prototype.getConfigIds = function(){
  return this.data.config;
};

AppModel.prototype.addConfig = function(configId){
    return this.data.config.push(configId);
};

AppModel.prototype.setName = function (name) {
    this.data.name = name;
};

AppModel.prototype.getModel = function() {
    return this.data;
};

AppModel.prototype.getLastModified = function(){
  return this.data.modifiedDate;
};

module.exports = AppModel;