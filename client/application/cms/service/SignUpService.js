var SignupService = function signUpService(httpService) {
    this._httpService = httpService;
    this._url = '/api/v1/signups';
};

_.extend(SignupService.prototype, {
    updateRequest: function (requestId, request) {
        return this._httpService.doPut(this._url  + '/' + requestId, request);
    },
    signUp: function (account, user) {
        var data = {"account" : account, "user": user};
        return this._httpService.doPost(this._url, data);
    }, 
    search: function (query, offset, setSize, sort, ascending) {
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
    }
});

module.exports = SignupService;