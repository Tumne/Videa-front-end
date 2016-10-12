var BaseService = require('core/service/BaseService');
var BrandModel = require('appstudio/model/BrandModel');
var UrlConfiguration = require('appstudio/service/UrlConfiguration');
var Digi = require('core/Digi');

var BrandDataService = function ($q, httpUploadService, appService) {
    BrandDataService.super_.apply(this, [$q]);
    this._httpService = httpUploadService;
    this._appService = appService;
    this.brands = [];
};

Digi.inherits(BrandDataService, BaseService);

BrandDataService.prototype.getAll = function (accountId) {
    var deferred = this.getDeferred(),
        getAllUrl = UrlConfiguration.brand.getAll.replace('{accountId}', accountId),
        self = this;

    this.brands = [];

    this._httpService.doGet(getAllUrl)
        .then(function (data) {
            data.data.forEach(function (oneBrandData) {
                self.brands.push(new BrandModel(oneBrandData));
            });
            deferred.resolve(self.brands);
        }, function (err) {
            deferred.reject(err);
        });
    return deferred.promise;
};

BrandDataService.prototype.create = function (accountId, brandName, image) {
    var uploadOptions = this._createUploadOptions(accountId, brandName, image);
    return this._httpService.doUpload(uploadOptions, this._createBrand);
};

BrandDataService.prototype.delete = function (accountId, brandId) {
    var deleteUrl = UrlConfiguration.brand.delete.replace('{accountId}', accountId).replace('{brandId}', brandId);
    return this._httpService.doDelete(deleteUrl);
};

BrandDataService.prototype.update = function (accountId, brandId, brandName, image) {
    var updateOptions = this._editUploadOptions(accountId, brandId, brandName, image);
    return this._httpService.doUpload(updateOptions, this._updateBrand);
};

BrandDataService.prototype._createUploadOptions = function (accountId, brandName, image) {
    return {
        url: UrlConfiguration.brand.create.replace('{accountId}', accountId),
        method: 'POST',
        fields: {brand: brandName},
        file: image,
        fileFormDataName: "image"
    };
};

BrandDataService.prototype._editUploadOptions = function (accountId, brandId, brandName, image) {
    return {
        url: UrlConfiguration.brand.update.replace('{accountId}', accountId).replace('{brandId}', brandId),
        method: 'PUT',
        fields: {brand: brandName},
        file: image,
        fileFormDataName: "image"
    };
};

BrandDataService.prototype._createBrand = function (response) {
    return new BrandModel(response.data);
};

BrandDataService.prototype._updateBrand = function (response) {
    return new BrandModel(response.data);
};

module.exports = BrandDataService;