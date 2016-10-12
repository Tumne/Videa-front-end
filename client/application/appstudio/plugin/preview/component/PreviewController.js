var PreviewController = function($scope, $rootScope, confirmationModalService) {
	this._scope = $scope;
	this._rootScope = $rootScope;
    this._modalService = confirmationModalService;
	this.active = false;
	
	this._scope.$on('select-component', 
    function (event, args) {
			this.active = false;
		}.bind(this)
	);

  this._scope.$on('unselect-all-component',
    function (event, args) {
      this.active = false;
    }.bind(this)
  );


};

PreviewController.prototype.selected = function() {
	this._rootScope.$broadcast( "select-component", {
		selectedIndex: this._scope.options.index
	});
	this.active = true;
};

PreviewController.prototype.remove = function() {
    this._modalService.showModal({},{
        actionButtonText: 'REMOVE',
        headerText: 'Delete Component',
        bodyText: 'Are you sure you want to delete this component?'
    }).then(function(){
        this._rootScope.$broadcast( "remove-component", {
            selectedIndex: this._scope.options.index
        });        
    }.bind(this));
};

PreviewController.prototype.up = function() {
    if (this._scope.options.index == 0) {
        return false;
    }
    
	this._rootScope.$broadcast( "reorder-component", {
		beforeIndex: this._scope.options.index,
        afterIndex: this._scope.options.index - 1
	});
	this.active = true;
};

PreviewController.prototype.down = function() {
	this._rootScope.$broadcast( "reorder-component", {
		beforeIndex: this._scope.options.index,
        afterIndex: this._scope.options.index + 1
	});
	this.active = true;
};

module.exports = PreviewController;