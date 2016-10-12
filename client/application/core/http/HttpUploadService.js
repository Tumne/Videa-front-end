var HttpService = require('core/http/HttpService');
var Digi = require('core/Digi');
var HttpUploadService = function ($http, $q, Upload) {
    HttpUploadService.super_.apply(this, [$http, $q]);
    this._Upload = Upload;
};

Digi.inherits(HttpUploadService, HttpService);

_.extend(HttpUploadService.prototype, {
    doUpload: function(uploadOptions, processResponse) {
        var deferred = this.getDeferred();
        this._Upload.upload(uploadOptions)
            .then(function (response) {
                deferred.resolve(processResponse(response));
            }, function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
});

module.exports = HttpUploadService;