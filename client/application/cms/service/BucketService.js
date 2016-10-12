"use strict";

var BucketService = function(httpService, accountService) {
    this._httpService = httpService;
    this._accountService = accountService;
    this._url = '/api/v1/accounts/';
    this._resource = '/buckets/';
};

_.extend(BucketService.prototype, {
    getAccount: function () {
        return this._accountService.getActiveAccount().id;
    },
    add: function (obj) {
        return this._httpService.doPost(this._url + this.getAccount() + this._resource, obj);    
    },
    get: function (id) {
        return this._httpService.doGet(this._url + this.getAccount() + this._resource + id);        
    },
    update: function (id, partialObj) {
        return this._httpService.doPut(this._url + this.getAccount() + this._resource + id, partialObj);
    },
    del: function (id) {
        return this._httpService.doDelete(this._url + this.getAccount() + this._resource + id);        
    },
    list: function (offset, setSize, sort, ascending) {
        offset = offset || 0;
        sort = sort || '';
        setSize = setSize || 20;
        ascending = ascending || true;

        var params = {
            offset: offset,
            setSize: setSize,
            sort: sort,
            ascending: ascending
        };

        return this._httpService.doGet(this._url + this.getAccount() + this._resource + '?' + this._httpService.buildQuery(params));            
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

		return this._httpService.doGet(this._url + this.getAccount() + this._resource + '?' + this._httpService.buildQuery(params));
	}                        
});

module.exports = BucketService;
