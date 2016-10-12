var BrandService = function(httpService, accountService, $q, Upload) {
    this._httpService = httpService;
    this._accountService = accountService;
    this._q = $q;
    this._upload = Upload;
    this._url = '/api/v1/accounts/';
    this._resource = '/brands/';
};

_.extend(BrandService.prototype, {
    getAccount: function () {
        return this._accountService.getActiveAccount().id;
    },
    add: function (dto) {
        return this._httpService.doPost(this._url + this.getAccount() + this._resource, dto);    
    },
    get: function (id) {
        return this._httpService.doGet(this._url + this.getAccount() + this._resource + id);        
    },
    update: function (id, obj) {
        var data = {
            name: obj.name
        };
        return this._httpService.doPut(this._url + this.getAccount() + this._resource + id, data);
    },
    del: function (id) {
        return this._httpService.doDelete(this._url + this.getAccount() + this._resource + id);        
    },
    list: function (withChildren) {
        return this._httpService.doGet(this._url + this.getAccount() + this._resource);            
    },
    addConfiguration: function (name, brandId, deviceId, file) {
        var params = {
            name: name,
            brandId: brandId,
            deviceId: deviceId
        };

        var deferred = this._q.defer();
        this._upload.upload({
            url: this._url + this._resource + '/AddConfiguration',
            method: 'PUT',
            //headers: {'header-key': 'header-value'},
            //withCredentials: true,
            data: {replace: true},
            params: params,
            file: file, // or list of files ($files) for html5 only
            //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // customize file formData name ('Content-Disposition'), server side file variable name.
            fileFormDataName: "myFile", //or a list of names for multiple files (html5). Default is 'file'
            // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            //formDataAppender: function(formData, key, val){}
        }).progress(function (evt) {
            deferred.notify(parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            // file is uploaded successfully
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }                                        
});

module.exports = BrandService;