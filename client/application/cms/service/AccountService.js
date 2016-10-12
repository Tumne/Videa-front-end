module.exports = function accountService($q, $http, $log, $location, principal) {
    var serviceBase = '/api/v1',
        resource = '/accounts/',
        activeAccount = null;

    // fake list
    var accounts = [];

    function add(obj) {

        var data = obj,
            deferred = $q.defer();

        $http({
            url: serviceBase + resource,
            method: "POST",
            data: data
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

    function getAccounts() {

        return search();
        //	fake list (remove the line bellow)
        //return accounts;
    }

    function setActiveAccount(account) {

        var accountId = "";
        if (account) {
            accountId = account.id;
			$location.search("a", accountId);
		}
        
        activeAccount = account;

        principal.setPermissions(accountId);
    }

    function getActiveAccount() {
        return activeAccount;
    }

    function getActiveAccountPermissions(){
        return principal.setPermissions(activeAccount ? activeAccount.id : undefined);
    }

    function get(id) {
        var deferred = $q.defer();

        $http({
            url: serviceBase + resource + id,
            method: "GET"
        }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function update(id, partialObj) {

        var deferred = $q.defer();

        $http({
            url: serviceBase + resource + id,
            method: "PUT",
            data: partialObj
        }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function search(query, offset, setSize, sort, ascending) {

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

        var deferred = $q.defer();
        $http({
            url: serviceBase + resource,
            method: "GET",
            params: params
        }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function del(id) {
        var deferred = $q.defer();
        $http({
            url: serviceBase + resource + id,
            method: "DELETE"
        }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    return {
        get : get,
        getAccounts: getAccounts,
        setActiveAccount: setActiveAccount,
        getActiveAccount: getActiveAccount,
        search : search,
        add : add,
        update : update,
        del : del,
        getActiveAccountPermissions : getActiveAccountPermissions
    };
};
