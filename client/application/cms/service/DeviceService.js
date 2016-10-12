var DeviceService = function(httpService, accountService) {
    this._httpService = httpService;
    this._accountService = accountService;
    this._url = '/api/v1/accounts/';
    this._resource = '/types/';
    this._brandsResource = '/brands/';
};

_.extend(DeviceService.prototype, {
    getAccount: function () {
        return this._accountService.getActiveAccount().id;
    },
    add: function (brandId, device) {
        return this._httpService.doPost(this._url + this.getAccount() + this._brandsResource + brandId + this._resource, device);    
    },
    update: function (brandId, deviceId, device) {
        return this._httpService.doPut(this._url + this.getAccount() + this._brandsResource + brandId + this._resource + deviceId, device);
    },
    del: function (brandId, deviceId) {
        return this._httpService.doDelete(this._url + this.getAccount()  + this._brandsResource + brandId + this._resource + deviceId);        
    },
    list: function (brandId) {
        return this._httpService.doGet(this._url + this.getAccount() + this._brandsResource + brandId + this._resource);            
    }                                    
});

module.exports = DeviceService;