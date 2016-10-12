var ContentTypeUnicastService = function($rootScope) {
    this._rootScope = $rootScope;
};

_.extend(ContentTypeUnicastService.prototype, {
    broadcastUpdateContentTypesMessage : function () {
        this._rootScope.$broadcast('handleUpdateContentTypes');
    }
});

module.exports = ContentTypeUnicastService;