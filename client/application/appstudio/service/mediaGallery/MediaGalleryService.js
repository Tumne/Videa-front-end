var BaseService = require('core/service/BaseService');
var Digi = require('core/Digi');
var Map = require("collections/map");
var UrlConfiguration = require('appstudio/service/UrlConfiguration');

var MediaGalleryService = function ($q, httpUploadService, $log, modelFactory) {
	
	//Service Dependencies
	this._httpService = httpUploadService;
	this._modelFactory = modelFactory;
	this._log = $log;
	this._q = $q;
	
};

Digi.inherits(MediaGalleryService, BaseService);

_.extend(MediaGalleryService.prototype, {

	getAllMediaGalleryAssets: function (accountId, brandId) {
		var self = this,
			modelPromises = [],
			deferred = self.getDeferred(),
			getUrl = UrlConfiguration.MEDIA_GALLERY.GET
				.replace('{accountId}', accountId)
				.replace('{brandId}', brandId);

		self._httpService.doGet(getUrl).then(function (assetArray) {
			//Build the model for each asset in the returned array.
			modelPromises = assetArray.map(function (asset) {
				return self._modelFactory.create(asset._metadata, asset);
			});

			//Wait for all the models to be built and resolve when complete.
			self._q.all(modelPromises).then(function (models) {
				self._log.debug("Got all mediaGallery assets: ", models);
				deferred.resolve(models);
			});
			
		}).catch(function (error) {
			self._log.error('Error getting media gallery assets: (accountId, brandId, error) : ',
				accountId, ' ', brandId, ' ', error);
			deferred.reject(error);
		});

		return deferred.promise;
	},
	//TODO: Change how the map is generated.
	getAllGalleryAssetsAsMap: function (accountId, brandId) {
		var self = this,
			map;
        
		return this.getAllMediaGalleryAssets(accountId, brandId).then(function (assets) {
			map = new Map();
        
			for (var i = 0; i < assets.length; i++) {
				map.set(assets[i].getFieldValue('id'), assets[i]);
			}
        
			return map;
			
		}, function () {
			self._log.error("MediaGalleryService: getAllGalleryAssetsAsMap() accountId: ", accountId,
				" BrandId:", brandId);
		});
	},
	deleteGalleryAsset: function (accountId, brandId, assetId) {
		var self = this;

		return self._httpService.doDelete(UrlConfiguration.MEDIA_GALLERY.DELETE
			.replace('{accountId}', accountId)
			.replace('{brandId}', brandId)
			.replace('{galleryImageId}', assetId))
			.then(function (data) {

				return data;
			}, function (error) {
				self._log.error("MediaGalleryService: deleteGalleryAsset() accountId: ", accountId,
					" BrandId:", brandId);
			});

	},
	createGalleryAsset: function (accountId, brandId, imageForm) {
		var self = this;

		var uploadOptions = self._createUploadDTO(accountId, brandId, imageForm);

		return self._httpService.doUpload(uploadOptions, function () {
			})
			.then(function (data) {

				console.log("Upload Successfull");
				return data;
			}, function (error) {
				self._log.error("MediaGalleryService: createGalleryAsset() accountId: ", accountId,
					" BrandId:", brandId);
				return error;
			});
	},
	updateGalleryAsset: function (accountId, brandId, assetId, imageForm) {
		var self = this;

		var uploadOptions = self._createUpdateDTO(accountId, brandId, assetId, imageForm);

		return self._httpService.doUpload(uploadOptions, function () {
			})
			.then(function (data) {

				console.log("Upload Successfull");
				return data;
			}, function (error) {
				self._log.error("MediaGalleryService: updateGalleryAsset() accountId: ", accountId,
					" BrandId:", brandId);
				return error;
			});
	},
	renameGalleryAsset: function (accountId, brandId, assetId, imageForm) {
		var self = this;
		var url = UrlConfiguration.MEDIA_GALLERY.UPDATE
			.replace('{accountId}', accountId)
			.replace('{brandId}', brandId)
			.replace('{galleryImageId}', assetId);

		var uploadOptions = self._createUpdateDTO(accountId, brandId, assetId, imageForm);

		return self._httpService.doUpload(uploadOptions, function () {
			})
			.then(function (data) {

				console.log("Upload Successfull");
				return data;
			}, function (error) {
				self._log.error("MediaGalleryService: updateGalleryAsset() accountId: ", accountId,
					" BrandId:", brandId);
				return error;
			});
	},
	_createUploadDTO: function (accountId, brandId, imageForm) {
		return {
			url: UrlConfiguration.MEDIA_GALLERY.CREATE.replace('{accountId}', accountId).replace('{brandId}', brandId),
			fields: {name: imageForm.assetName},
			method: 'POST',
			file: imageForm.image,
			fileFormDataName: "image"
		};
	},
	_createUpdateDTO: function (accountId, brandId, assetId, imageForm) {
		return {
			url: UrlConfiguration.MEDIA_GALLERY.UPDATE.replace('{accountId}', accountId)
				.replace('{brandId}', brandId)
				.replace('{galleryImageId}', assetId),
			fields: {name: imageForm.assetName},
			method: 'PUT',
			file: imageForm.image,
			fileFormDataName: "image"
		};

	}

});

module.exports = MediaGalleryService;
