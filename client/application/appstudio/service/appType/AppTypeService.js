var BaseService = require('core/service/BaseService');
var AppTypeModel = require('appstudio/model/AppTypeModel');
var Digi = require('core/Digi');
var UrlConfiguration = require('appstudio/service/UrlConfiguration');

var AppTypeService = function(httpService, $q) {
    AppTypeService.super_.apply(this, [$q]);
    this._httpService = httpService;
};
Digi.inherits(AppTypeService, BaseService);

AppTypeService.prototype.getAll = function (accountId) {
    var deferred = this.getDeferred(),
        getAllUrl = UrlConfiguration.appType.getAll.replace('{accountId}', accountId);

    this._httpService.doGet(getAllUrl)
        .then(function(data) {
            deferred.resolve(data.data.map(function(obj){
                var appTypeModel = new AppTypeModel(obj);
                return appTypeModel;
            }));
        }, function(err) {
            deferred.reject(err);
        });
    return deferred.promise;
};

module.exports = AppTypeService;