"use strict";

var RoleService = function roleService(httpService) {
    this._httpService = httpService;
    this._url = '/api/v1/role/';
};

_.extend(RoleService.prototype, {
	get: function (scope) {
		return this._httpService.doGet(this._url + scope);
	}
});

module.exports = RoleService;
