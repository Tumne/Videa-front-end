var PreviewAppTypeController = function($rootScope, $scope) {
	this._rootScope = $rootScope;
    this._scope = $scope;
	this.isSelectable = this._scope.options.selectable;
    this.selected = false;
    this._scope.$on('select-apptype', function (event, args) {
        if (args.selected != this._scope.model) {
            this.selected = false;
        }
    }.bind(this));
};

PreviewAppTypeController.prototype.select = function() {
	if(this.isSelectable)this._setAppType();
};

PreviewAppTypeController.prototype._setAppType = function() {
	this._rootScope.$broadcast( "select-apptype", {
		selected: this._scope.model
	});
	this._scope.options.setAppType(this._scope.model);
	this.selected = true;
};

module.exports = PreviewAppTypeController;
