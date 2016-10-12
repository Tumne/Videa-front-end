module.exports = function ($q, $http, $log, Contentnode, accountService) {
    var serviceBase = '/api/v1/accounts/',
        resource = '/content/',
        SearchOperator = {
            In: 0, // check if the current field is equal to any of the given values
            Match: 1, // Performs a full text search in the current field
            MatchAll: 2 // Retrieves all results
        };

    function getAccount() {
        return accountService.getActiveAccount().id;
    }

    function add(obj) {
        var deferred = $q.defer();
        $http({
            url: serviceBase + getAccount() + resource,
            method: "POST",
            data: obj
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

    function get(id) {
        var deferred = $q.defer();
        $http({
            url: serviceBase + getAccount() + resource + id,
            method: "GET"
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

    function batchGet(ids) {
        var query = {
            field: "id",
            operator: SearchOperator.In,
            value: JSON.stringify(ids)
        };

        console.log("QUERY", query);
        return search(query, 0, ids.length);
    }

    function update(id, partialUpdate) {

        var deferred = $q.defer();

        $http({
            url: serviceBase + getAccount() + resource + id,
            method: "PUT",
            data: partialUpdate
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

    function del(id) {
        var deferred = $q.defer();
        $http({
            url: serviceBase + getAccount() + resource + id,
            method: "DELETE"
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

    function updateField(obj) {
        var deferred = $q.defer();
        $http({
            url: serviceBase + getAccount() + resource + obj.contentId + "/values/" + obj.fieldId,
            method: "POST",
            data: { value: obj.fieldValue }
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

    function instantiate(contentTypeId) {

        var deferred = $q.defer();
        $http({
            url: serviceBase + getAccount() + resource + 'instantiate/' + contentTypeId,
            method: "GET"
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function search(query, offset, setSize, sort, ascending, workflows) {

        query = query || null;
        offset = offset || 0;
        setSize = setSize || 20;
        sort = sort || null;

        ascending = ascending === undefined || ascending === null ? true : ascending
        ;

        var params = {
            offset: offset,
            setSize: setSize,
            sort: sort,
            ascending: ascending,
            workflows : JSON.stringify(workflows)
        };

        var deferred = $q.defer();
        $http({
            url: serviceBase + getAccount() + resource + 'search',
            method: "POST",
            params: params,
            data: query
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

	function searchSuggestions(query, setSize, contentTypes, workflows) {
		query = query || null;
		setSize = setSize || 20;

		var params = {
			setSize: setSize,
			workflows : JSON.stringify(workflows),
			contentTypeId : JSON.stringify(contentTypes),
			query : query
		};

		var deferred = $q.defer();
		$http({
			url: serviceBase + getAccount() + resource + 'search/suggestions',
			method: "GET",
			params: params,
		}).success(function (data, status, headers, config) {
			deferred.resolve(data);
		}).error(function (data) {
			deferred.reject(data);
		});
		return deferred.promise;
	}

    function nextState(contentId, trigger) {
        var deferred = $q.defer();
        $http({
            url: serviceBase + getAccount() + resource + contentId + "/workflow/fire/" + trigger,
            method: "POST"
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

    return {
        add: add,
        get: get,
        batchGet: batchGet,
        update: update,
        updateField: updateField,
        del: del,
        search: search,
        instantiate: instantiate,
        nextState: nextState,
		searchSuggestions : searchSuggestions
    };
};
