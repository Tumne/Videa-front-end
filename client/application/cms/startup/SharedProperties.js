var SharedProperties = function($q, $timeout) {
    this.property = {};
    this._q = $q;
    this._timeout = $timeout;
};

_.extend(SharedProperties.prototype, {
    loadProperties: function () {
        var deferred = this._q.defer();
        this._timeout(function () {
            deferred.resolve({
                "MediaServer.Url": "https://s3.amazonaws.com",
                "Videa.ConfigurationContainer": "videa-gads-configs",
                "MediaServer.Container": "videa-gads"
            });
        }, 0.1);

        return deferred.promise;
    },
    getProperty: function (key) {
        return this.property[key];
    },
    setProperty: function (key, value) {
        this.property[key] = value;
    }    
});

module.exports = SharedProperties;