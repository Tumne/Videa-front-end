
var Digi = require('core/Digi');

var HttpService = function ($http, $q) {
    this._q = $q;
    this._http = $http;
};

_.extend(HttpService.prototype, {
    getDeferred: function(){
        return this._q.defer();  
    },
    doGet : function (url, cache) {
        var deferred = this.getDeferred(),
            promise;
        
        if (cache){
            promise = this._http.get(url, {
                cache: true
            });
        } else {
            promise = this._http.get(url);
        }
        promise.then(function (result) {
                //can add processing here
                if (result.data){
                    result = result.data;
                }
                deferred.resolve(result);
            }, function(err){
                //can add processing here
                deferred.reject(err);
            });
        return deferred.promise;
    },
    doPost : function (url, data) {
        var deferred = this.getDeferred();
        this._http.post(url, data)
            .then(function (result) {
                //can add processing here
                deferred.resolve(result);
            }, function(err){
                //can add processing here
                deferred.reject(err);
            });
        return deferred.promise;
    },
    doDelete : function (url) {
        var deferred = this.getDeferred();
        this._http.delete(url)
            .then(function (data) {
                //can add processing here
                deferred.resolve(data);
            }, function(err){
                //can add processing here
                deferred.reject(err);
            });
        return deferred.promise;
    },
    doPut : function (url, data) {
        var deferred = this.getDeferred();
        var put = this._http.put(url, data);
        if (!data){
            put = this._http.put(url, {});
        }
        put.then(function (result) {
            //can add processing here
            deferred.resolve(result);
        }, function(err){
            //can add processing here
            deferred.reject(err);
        });
        return deferred.promise;
    },
    buildQuery : function (obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (obj[i] === 0){
                    parts.push(encodeURIComponent(i) + "=" + 0);
                } else if (obj[i] === '' || obj[i] === undefined || obj[i] === null){
                    parts.push(encodeURIComponent(i) + "=");    
                } else {
                    parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));    
                }
            }
        }
        return parts.join("&");
    }    
});

module.exports = HttpService;