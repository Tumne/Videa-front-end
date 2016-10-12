

//TODO: rename this file to ServiceUrls.js
// all the keys e.g. app create, etc should be capitalized. They are constants.
// so that they are references like the following ServiceUrls.APP.CREATE
module.exports = {
    app: {
        // TODO: rename to get. given the id one is implied.
        getOne: '/api/v1/accounts/{accountId}/brands/{brandId}/app/{appId}',
        create: '/api/v1/accounts/{accountId}/brands/{brandId}/app',
        update: '/api/v1/accounts/{accountId}/brands/{brandId}/app/{appId}',
        delete: '/api/v1/accounts/{accountId}/brands/{brandId}/app/{appId}'
    },
    appType: {
        // TODO: rename to getAppTypes. more meaningful
        getAll: '/api/v1/accounts/{accountId}/appType'
    },
    brand: {
        // TODO: rename to getBrands. more meaningful
        getAll: '/api/v1/accounts/{accountId}/brands',
        // TODO: rename to get. given the id one is implied.
        getOne: '/api/v1/accounts/{accountId}/brands/{brandId}',
        create:  '/api/v1/accounts/{accountId}/brands',
        update:  '/api/v1/accounts/{accountId}/brands/{brandId}',
        delete:  '/api/v1/accounts/{accountId}/brands/{brandId}'
    },
    uiConfig: {
        // TODO: rename to get. given the id one is implied.
        getOne: '/api/v1/accounts/{accountId}/app/{appId}/config/{configId}',
        create: '/api/v1/accounts/{accountId}/app/{appId}/config',
        update: '/api/v1/accounts/{accountId}/app/{appId}/config/{configId}',
        delete: '/api/v1/accounts/{accountId}/app/{appId}/config/{configId}',
        duplicate: '/api/v1/accounts/{accountId}/app/{appId}/config/{configId}/duplicate',
        publish: '/api/v1/accounts/{accountId}/app/{appId}/config/{configId}/publish'
    },
    SCREEN: {
        CREATE: '/api/v1/accounts/{accountId}/config/{configId}/screen',
        GET: '/api/v1/accounts/{accountId}/config/{configId}/screen',
        UPDATE: '/api/v1/accounts/{accountId}/config/{configId}/screen',
        DELETE: '/api/v1/accounts/{accountId}/config/{configId}/screen/{screenId}'
    },
	MEDIA_GALLERY: {
		CREATE: '/api/v1/accounts/{accountId}/brands/{brandId}/gallery',
		GET: '/api/v1/accounts/{accountId}/brands/{brandId}/gallery',
		UPDATE: '/api/v1/accounts/{accountId}/brands/{brandId}/gallery/{galleryImageId}',
		DELETE: '/api/v1/accounts/{accountId}/brands/{brandId}/gallery/{galleryImageId}'
	}
};
