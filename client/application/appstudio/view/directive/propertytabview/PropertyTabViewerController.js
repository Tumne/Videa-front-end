var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');

var PropertyTabViewerController = function ($scope, modelFactory, $q, modelOperation, viewRegistry) {
	this._scope = $scope;
	this._modelFactory = modelFactory;
	this._modelOperation = modelOperation;
	this._$q = $q;
    this._viewRegistry = viewRegistry;
	this.HASONE = 'HASONE';
	this.HASMANY = 'HASMANY';
	this.hasOneAssociations = [];
	this.ready = false;
    this.hasPlugin = false;
	this.purpose = Purpose;
	//switch model
	this._scope.$watch(function () {
		return this.model.id;
	}.bind(this), function (newComponent, oldComponent) {
		if (newComponent != oldComponent) {
			this.initialize();
		}
	}.bind(this)); 	
	
	this.initialize();
}

PropertyTabViewerController.prototype.initialize = function(){
	var _this = this;
	this.ready = false;

	if (!this.model[this.openTab.getter]()){
		this._modelOperation.populateHasOne(this.model).then(function(){
			var currentTab = _this.model[_this.openTab.getter]();
			_this._modelOperation.populateHasOne(currentTab).then(function(){
				_this.ready = true;
				_this.hasOneAssociations = _this.model[_this.openTab.getter]().getHasOneAssociations();
			});
		});
	} else {
		var currentTab = _this.model[_this.openTab.getter]();
		_this._modelOperation.populateHasOne(currentTab).then(function(){
			_this.ready = true;
			_this.hasOneAssociations = _this.model[_this.openTab.getter]().getHasOneAssociations();
		});
	}
};
	
PropertyTabViewerController.prototype._createHasOneModel = function(model, modelType, title) {
	return this._modelFactory.create(modelType).then(
		function(association){
			var modelTab = this.model[this.openTab.getter]();
			modelTab['set' + title](association);
			return;
		}.bind(this)
	);	
};

PropertyTabViewerController.prototype.retrieveModel = function() {
	return this.model[this.openTab.getter]();	
};

PropertyTabViewerController.prototype.retrieveHasOneModel = function(getter) {
	var tabModel = this.model[this.openTab.getter]();
	return tabModel[getter]();
};

PropertyTabViewerController.prototype.getHasOneAssociations = function() {
	return this._hasOneAssociations;
};

module.exports = PropertyTabViewerController;