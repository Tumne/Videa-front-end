"use strict";

var UserService = function($q, httpService) {
    this._url = '/api/v1/users/';
    this._httpService =httpService;
    this._q = $q;
};

_.extend(UserService.prototype, {
    createInstance: function () {
        return {
            username: null,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            roles: []
        };
    },
    add: function (obj) {
        return this._httpService.doPost(this._url, obj);
    },
    get: function (id) {
        return this._httpService.doGet(this._url + id);
    },
    update: function(id, partialObj){
        return this._httpService.doPut(this._url + id, partialObj);
    },
    del: function (id) {
        return this._httpService.doDelete(this._url + id);
    },
    list: function (offset, setSize, sort, ascending) {
        return this.search(null, offset, setSize, sort, ascending);
    },
    search: function search(query, offset, setSize, sort, ascending) {
        query = query || null;
        offset = offset || 0;
        setSize = setSize || 20;
        sort = sort || null;
        ascending = ascending === undefined || ascending === null ? true : ascending;

        var params = {
            query: query,
            offset: offset,
            setSize: setSize,
            sort: sort,
            ascending: ascending
        };

        return this._httpService.doGet(this._url + '?' + this._httpService.buildQuery(params));
    },
    saveUser : function saveUser(user) {
        var deferred = this._q.defer();
        if (user.id) {
            this.update(user.id, user).then(function (result) {
                result.successMsg = "User successfully updated!";
                deferred.resolve(result);
            });
        } else {
            this.add(user).then(function (result) {
                result.successMsg = "User successfully created!";
                deferred.resolve(result);
            });
        }
        return deferred.promise;
    }
});

module.exports = UserService;
