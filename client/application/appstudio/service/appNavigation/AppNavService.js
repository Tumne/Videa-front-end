
var BaseService = require('core/service/BaseService');
var ServiceUrls = require('appstudio/service/UrlConfiguration');
var ModelTypes = require('appstudio/plugin/PluginModelType');
var Digi = require('core/Digi');


var AppNavService = function ($q, httpService, modelFactory) {

    BaseService.call(this, $q);

    this._httpService = httpService;
    this._modelFactory = modelFactory;
};

Digi.inherits(AppNavService, BaseService);

_.extend(AppNavService.prototype, {

    getAppNavigationModels: function (appType, appNavigationData) {
        var schema,
            modelFactory = this._modelFactory;

        return modelFactory.create(schema, appNavigationData).then(function (model) {
            return model;
        });
    }
});

module.exports = AppNavService;

