var MemberService = function(accountService, httpService) {
    this._accountService = accountService;
    this._httpService = httpService;
    this._url = '/api/v1/accounts/';
};

_.extend(MemberService.prototype, {
    createInstance: function () {
        return {
            user: {
                username: null,
                firstName: null,
                lastName: null,
                email: null,
                password: null
            },
            roles: []
        };
    },
    getAccount: function() {
        return this._accountService.getActiveAccount().id;
    },
    addNewUser: function (obj) {
        return this._httpService.doPost(this._url + this.getAccount() + '/members/', obj);            
    },
    list: function (offset, setSize, sort, ascending) {
        return this.search(null, offset, setSize, sort, ascending);
    },
    get: function (id) {
        return this._httpService.doGet(this._url + this.getAccount() + '/members/' + id);
    },
    del: function (id) {
        return this._httpService.doDelete(this._url + this.getAccount() + '/members/' + id);
    },
    updateMember: function (member) {
        return this._httpService.doPut(this._url + this.getAccount() + '/members/'  +  member.user.id, member);
    },
    saveMember: function (member) {
        var deferred = this._q.defer();
        if (member.user.id) {
            /*update(user.id, user).then(function (result) {
                result.successMsg = "Account member successfully updated!";
                deferred.resolve(result);
            });*/
        } else {
            this.addNewUser(member).then(function (result) {
                result.successMsg = "Account member successfully created!";
                deferred.resolve(result);
            });
        }
        return deferred.promise;
    },
    addExistingUser: function (obj) {
        return this._httpService.doPost(this._url  + this.getAccount() + '/members/'  +  obj.user.id);
    },
    search: function (query, offset, setSize, sort, ascending) {
        query = query || undefined;
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
        return this._httpService.doGet(this._url  + this.getAccount() + '/members/' + '?' + this._httpService.buildQuery(params));  
    }                
                
});

module.exports = MemberService;