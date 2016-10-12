var ConfigurationService = function(httpService, accountService, $q) {
    this._httpService = httpService;
    this._accountService = accountService;
    this._q = $q;
    this._url = '/api/v1/accounts/';
    this._resource = '/configurations/';
    this._brandsResource = '/brands/';
    this._devicesResource = '/devices/';
};

_.extend(ConfigurationService.prototype, {
    getAccount: function () {
        return this._accountService.getActiveAccount().id;
    },
    add: function (brandId, deviceId, file, filename) {
        return this.uploadConfiguration(brandId, deviceId, null, file, filename);
    },
    get: function (id) {
        return this._httpService.doGet(this._url + this.getAccount() + this._resource + id);        
    },
    update: function (id, obj) {
        var data = {
            Id: obj.Id,
            Name: obj.Name,
            PublicUri: obj.PublicUri,
            BrandId: obj.BrandId,
            DeviceId: obj.DeviceId,
            IsActive: obj.IsActive
        };
        return this._httpService.doPut(this._url  + this._resource + '/Update', data);
    },
    del: function (id) {
         var params = {
            id: id
        };
        return this._httpService.doDelete(this._url + this._resource + '/Delete' + '?' + this._httpService.buildQuery(params));        
    },
    list: function (brandId, deviceId) {
        return this._httpService.doGet(this._url + this.getAccount() + this._brandsResource + brandId + this._devicesResource + deviceId + this._resource);            
    },
    getNotFoundImageUrl: function () {
        return "Not Found!";
    },
    getConfigurationUrl: function (asset, container) {
        if (!asset)
            return this.getNotFoundImageUrl();

        var filename;
        if (this._httpService.isArray(asset)) {
            if (asset.length > 0)
                filename = asset[0].url;
            else
                return this.getNotFoundImageUrl();
        }
        else {
            filename = asset;
        }
        return asset.url;
    },
    getConfigurationContent: function (fullName) {
        var params = {
            fullName: fullName ? fullName : '',
            loadContent: true
        };
        return this._httpService.doGet(this._url +  this._resource + '/getContent'  + '?' + this._httpService.buildQuery(params));
    },
    setDefault: function (brandId, deviceId, configurationId) {
        var url = this._url + this.getAccount() + this._brandsResource + brandId + this._devicesResource + deviceId + this._resource + configurationId + "/setdefault";
        return this._httpService.doPost(url,{});        
    },
    uploadConfiguration: function (brandId, deviceId, configurationId, file, filename) {
        var url = this._url + this.getAccount() + this._brandsResource + brandId + this._devicesResource + deviceId + this._resource,
            deferred = this._q.defer();

        if (configurationId){
            url = url + configurationId;
        }

        this._upload.upload({
            url: url,
            method: 'POST',
            fields: { filename: filename },
            sendFieldsAs: 'json',
            //headers: {'header-key': 'header-value'},
            //withCredentials: true,
            //data: {replace: true},
            file: file, // or list of files ($files) for html5 only
            //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // customize file formData name ('Content-Disposition'), server side file variable name.
            fileFormDataName: "file", //or a list of names for multiple files (html5). Default is 'file'
            // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            //formDataAppender: function(formData, key, val){}
        }).progress(function (evt) {
            deferred.notify(parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            // file is uploaded successfully
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        })

        return deferred.promise;
    }                                           
});

module.exports = ConfigurationService;