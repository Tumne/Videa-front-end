var ContentFieldService = function(httpService, accountService) {
    this._httpService = httpService;
    this._accountService = accountService;
    this._url = '/api/v1/accounts/';
    this._resource = '/fields';
};

_.extend(ContentFieldService.prototype, {
    getAccount: function () {
        return this._accountService.getActiveAccount().id;
    },
    getFieldTypes: function () {
        return this._httpService.doGet(this._url + this.getAccount() + this._resource + '/types');        
    },    
    add: function (contentField) {
        return this._httpService.doPost(this._url + this.getAccount() + this._resource, contentField);    
    },
    batchGet: function (fieldIds) {
        var query = {
            operator: 0, // "In" query operator.
            value: fieldIds
        };
        return this._httpService.doGet(this._url + this.getAccount() + this._resource + '?' + this._httpService.buildQuery(query));        
    },
    update: function (id, contentField) {
        return this._httpService.doPut(this._url + this.getAccount() + this._resource + '/' + id, contentField);
    }                                    
});

module.exports = ContentFieldService;