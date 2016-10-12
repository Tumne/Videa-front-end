var Purpose = require('core/plugin/Purpose');

var ThemeEditController = function($scope, modelOperation) {
    var vm = this;

    this._scope = $scope;
    this.ready = false;
    this.purpose = Purpose;
    this.options = this._scope.options;
 
    this.hasOneAssociations = this._scope.model.getHasOneAssociations();

    modelOperation.populateHasOne(this._scope.model).then(function(){
        this.ready = true;
		// console.log('Theme Model: ', this._scope.model);
    }.bind(this));

    this.retrieveHasOneModel = function(getter) {
        return this._scope.model[getter]();
    };

	this.save = function(){
		// console.log("Calling save from Theme Plugin");
		this._scope.$emit('uiConfig-save');
	};
};

module.exports = ThemeEditController;
