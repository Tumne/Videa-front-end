var BaseService = require('core/service/BaseService');
var Digi = require('core/Digi');

var MediaGalleryService = function ($q, httpUploadService, $log, appService) {
};

Digi.inherits(MediaGalleryService, BaseService);

_.extend(MediaGalleryService.prototype, {
	
	getAllGalleryAssets: function (accountId, brandId) {
	},
	getAllGalleryAssetsAsMap: function (accountId, brandId) {
	},
	deleteGalleryAsset: function (accountId, brandId, assetId) {
	},
	createGalleryAsset: function (accountId, brandId, imageForm) {
	},
	updateGalleryAsset: function (accountId, brandId, assetId, imageForm) {
	},
	renameGalleryAsset: function (accountId, brandId, assetId, imageForm) {
	},
	_createUploadDTO: function (accountId, brandId, imageForm) {
	},
	_createUpdateDTO: function (accountId, brandId, assetId, imageForm) {
	}
	
});

module.exports = MediaGalleryService;
