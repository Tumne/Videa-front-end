var BaseService = require('core/service/BaseService');
var Digi = require('core/Digi');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var UrlConfiguration = require('appstudio/service/UrlConfiguration');

var UIConfigurationService = function (httpService, $q, modelFactory) {
    UIConfigurationService.super_.apply(this, [$q]);
    this._httpService = httpService;
    this._modelFactory = modelFactory;
    this._q = $q;
};

Digi.inherits(UIConfigurationService, BaseService);

UIConfigurationService.prototype.getById = function (accountId, appId, configId) {
    var deferred = this.getDeferred(),
        getUrl = UrlConfiguration.uiConfig.getOne
            .replace('{accountId}', accountId)
            .replace('{appId}', appId)
            .replace('{configId}', configId),
        self = this;

    this._httpService.doGet(getUrl).then(
        function (data) {
            self._modelFactory.create(data._metadata, data)
            .then(function(configModel){
                deferred.resolve(configModel);
            });
        },
        function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
};

UIConfigurationService.prototype.getAllAppConfigs = function (accountId, apps) {
    var deferred = this.getDeferred(),
        configQueue = [],
        configIdList = [],
        self = this;

    for (var i = 0; i < apps.length; i++) {
        configIdList = apps[i].getUiConfigs();

        for (var j = 0; j < configIdList.length; j++) {
            configQueue.push(self.getById(accountId, apps[i].getFieldValue('id'), configIdList[j]));
        }
    }

    this._q.all(configQueue).then(deferred.resolve, deferred.reject);
    return deferred.promise;
};

UIConfigurationService.prototype.getAllActiveAppConfigs = function (accountId, apps) {
	var deferred = this.getDeferred(),
		configHash = {},
		activeConfigId,
		self = this;

	for (var i = 0; i < apps.length; i++) {
		activeConfigId = apps[i].getFieldValue("activeConfig");
		
		if(activeConfigId !== "")
		{
			configHash[activeConfigId] = self.getById(accountId, apps[i].getFieldValue('id'), activeConfigId);
		}
	}

	this._q.all(configHash).then(deferred.resolve, deferred.reject);
	return deferred.promise;
};

UIConfigurationService.prototype.getAppVersions = function (accountId, appConfiguration, appId) {
    var deferred = this.getDeferred(),
        configQueue = [],
        configIdList = appConfiguration.getUiConfigs(),
        self = this;

        for (var j = 0; j < configIdList.length; j++) {
            configQueue.push(self.getById(accountId, appId, configIdList[j]));
        }

    this._q.all(configQueue).then(deferred.resolve, deferred.reject);
    return deferred.promise;
};

UIConfigurationService.prototype.createAppConfig = function (accountId, appId, data) {
    var deferred = this.getDeferred(),
        createUrl = UrlConfiguration.uiConfig.create
            .replace('{accountId}', accountId)
            .replace('{appId}', appId);

    this._httpService.doPost(createUrl, data)
        .then(function () {
            deferred.resolve();
        }, function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
};

UIConfigurationService.prototype.updateAppConfig = function (accountId, appId, updatedUIConfigModel) {

    var updateUrl = UrlConfiguration.uiConfig.update
        .replace('{accountId}', accountId)
        .replace('{appId}', appId)
        .replace('{configId}', updatedUIConfigModel.getFieldValue('id'));

    return this._httpService.doPut(updateUrl, updatedUIConfigModel.getJson());
};

UIConfigurationService.prototype.deleteAppConfig = function (accountId, appId, configId) {
    var deleteUrl = UrlConfiguration.uiConfig.update
        .replace('{accountId}', accountId)
        .replace('{appId}', appId)
        .replace('{configId}', configId);

    return this._httpService.doDelete(deleteUrl);
};

UIConfigurationService.prototype.duplicateAppConfig = function (accountId, appId, configId) {
    var deferred = this.getDeferred(),
        duplicateUrl = UrlConfiguration.uiConfig.duplicate
            .replace('{accountId}', accountId)
            .replace('{appId}', appId)
            .replace('{configId}', configId),
        self = this;

    this._httpService.doPost(duplicateUrl)
        .then(function (data) {
            deferred.resolve(undefined);
        }, function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
};

UIConfigurationService.prototype.publishAppConfig = function (accountId, appId, configId) {
    var deferred = this.getDeferred(),
        publishUrl = UrlConfiguration.uiConfig.publish
            .replace('{accountId}', accountId)
            .replace('{appId}', appId)
            .replace('{configId}', configId);

    this._httpService.doPost(publishUrl)
        .then(function (data) {
            deferred.resolve(new AppModel(data));
        }, function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
};

module.exports = UIConfigurationService;
