var BaseService = require('core/service/BaseService');
var AppModel = require('appstudio/model/AppModel');
var Digi = require('core/Digi');

var AppService = function ($q, httpService, modelFactory) {
    AppService.super_.apply(this, [$q]);
    this._httpService = httpService;
    this._getOneAppUrl = '/api/v1/accounts/{accountId}/brands/{brandId}/app/{appId}';
    this._createUrl = '/api/v1/accounts/{accountId}/brands/{brandId}/app';
    this._updateUrl = '/api/v1/accounts/{accountId}/brands/{brandId}/app/{appId}';
    this._deleteUrl = '/api/v1/accounts/{accountId}/brands/{brandId}/app/{appId}';
	this._modelFactory = modelFactory;
};

Digi.inherits(AppService, BaseService);

AppService.prototype.getById = function (accountId, brandId, appId) {
    var self = this;
	var deferred = this.getDeferred(),
        newGetUrl = this._getOneAppUrl.replace('{accountId}', accountId)
                                     .replace('{brandId}', brandId)
                                     .replace('{appId}', appId);

	//TODO: Set up error handling
    this._httpService.doGet(newGetUrl)
        .then(function(data){
			 self._modelFactory.create(data._metadata, data).then(function(model){ 
				 deferred.resolve(model);
			 },function(err){
				 deferred.reject(err);
			 });
        }, function(err){
            deferred.reject(err);
        });
    return deferred.promise;
};

AppService.prototype.getAll = function (accountId, brands) {
    var deferred = this.getDeferred(),
        appQueue = [],
        appIdList = [],
        self = this;

    for(var i = 0; i < brands.length; i++) {
        appIdList = brands[i].getAppIds();
        for (var j = 0; j < appIdList.length; j++){
            appQueue.push(self.getById(accountId, brands[i].getId(), appIdList[j]));
        }
    }
    this._q.all(appQueue).then(deferred.resolve, deferred.reject);
    return deferred.promise;
};

AppService.prototype.create = function (accountId, brandId, data) {
    var deferred = this.getDeferred();
    //replace brandId in the create url
    var newCreateUrl = this._createUrl.replace('{accountId}', accountId)
                                      .replace('{brandId}', brandId);

    this._httpService.doPost(newCreateUrl, data)
        .then(function (newAppData) {
            deferred.resolve(new AppModel(newAppData));
        }, function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
};

AppService.prototype.delete = function (accountId, brandId, appId) {
    var newDeleteUrl = this._deleteUrl.replace('{accountId}', accountId)
                                      .replace('{brandId}', brandId)
                                      .replace('{appId}', appId);

    return this._httpService.doDelete(newDeleteUrl);
};

AppService.prototype.update = function (accountId, brandId, updateAppModel) {
    var newUpdateUrl = this._updateUrl.replace('{accountId}', accountId)
                                        .replace('{brandId}', brandId)
                                        .replace('{appId}', updateAppModel.getFieldValue('id'));
	
	// console.log("Saving appModel: ", updateAppModel);

    return this._httpService.doPut(newUpdateUrl, updateAppModel.getJson());
};

module.exports = AppService;
