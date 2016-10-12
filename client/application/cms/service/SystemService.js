var SystemService = function(httpService) {
    this._versionStringUrl = '/api/v1/system/version/string';
    this._versionUrl = '/api/v1/system/version';
    this._httpService = httpService;  
};

_.extend(SystemService.prototype, {
    getVersionString: function() {
        return this._httpService.doGet(this._versionStringUrl);
    },
    getVersion: function() {
        return this._httpService.doGet(this._versionUrl);
    }
});

module.exports = SystemService;
