
var BaseService = require('core/service/BaseService');
var Digi = require('core/Digi');
var SchemaService = function ($q, httpService) {
    SchemaService.super_.apply(this, [$q]);
    this._httpService = httpService;
    this._apiUrl = '/api/v1/schema/{schemaId}';
};


Digi.inherits(SchemaService, BaseService);

SchemaService.prototype.getSchema = function (schemaId) {
    return this._httpService.doGet(this._apiUrl.replace('{schemaId}', schemaId), true);
};

SchemaService.prototype.preloadSchemas = function(schemas) {
    for(var key in schemas) {
        var schemaId = schemas[key];
        this._httpService.doGet(this._apiUrl.replace('{schemaId}', schemaId), true).then(function(){});
    }
};

module.exports = SchemaService;