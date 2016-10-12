
	
var BaseService = function($q) {
    this._q = $q;
};

BaseService.prototype.getDeferred = function() {
    return this._q.defer();
};

module.exports = BaseService;
