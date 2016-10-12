
var BaseModel = function BaseModel (data) {
    this.data = data;
    this._modelType = 'base';
}

BaseModel.prototype.getModelType = function(){
    return this._modelType;
};

BaseModel.prototype.toJson = function() {
    return JSON.stringify(this.data);
};

module.exports = BaseModel;