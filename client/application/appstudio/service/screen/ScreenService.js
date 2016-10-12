

var BaseService = require('core/service/BaseService');
var ServiceUrls = require('appstudio/service/UrlConfiguration');
var ModelTypes = require('appstudio/plugin/PluginModelType');
var Digi = require('core/Digi');


var ScreenService = function ($q, httpService, modelFactory) {

    BaseService.call(this, $q);

    this._httpService = httpService;

    this._modelFactory = modelFactory;
};

Digi.inherits(ScreenService, BaseService);

_.extend(ScreenService.prototype, {

    createScreen: function (accountId, configId, screen) {
        var deferred = this.getDeferred(),
            modelFactory = this._modelFactory;

        var url = ServiceUrls.SCREEN.CREATE.replace('{accountId}', accountId)
            .replace('{configId}', configId);
        this._httpService.doPost(url, screen.getJson()).then(
            function (createdScreen) {
                deferred.resolve(modelFactory.create(createdScreen.data._metadata, createdScreen.data));
            },
            function (err) {
                deferred.reject(err);
                console.log('error create screen ', err);
            }
        );

        return deferred.promise;
    },

    getScreens: function (accountId, configId) {
        var url,
            modelFactory = this._modelFactory,
            self = this;

        url = ServiceUrls.SCREEN.GET.replace('{accountId}', accountId)
            .replace('{configId}', configId);

        return this._httpService.doGet(url).then(
            function (screens) {

                var promises = [];

                for(var i = 0; i < screens.length; i++){
                    promises.push(modelFactory.create(screens[i]._metadata, screens[i]));
                }

                return self._q.all(promises);

            },
            function (err) {
                console.log('error create screen ', err);
            }
        );
    },

    updateScreen: function (accountId, configId, screen) {
        var url,
            modelFactory = this._modelFactory;

        url = ServiceUrls.SCREEN.UPDATE.replace('{accountId}', accountId)
            .replace('{configId}', configId);

        return this._httpService.doPut(url, screen.getJson()).then(
            function(updatedScreen) {
                return modelFactory.create(updatedScreen.data._metadata, updatedScreen.data);
            }
        );
    },

    deleteScreen: function(accountId, configId, screen) {
        var url;

        url = ServiceUrls.SCREEN.DELETE.replace('{accountId}', accountId)
            .replace('{configId}', configId).replace('{screenId}', screen.id);

        return this._httpService.doDelete(url, screen.id);
    }


});

module.exports = ScreenService;

