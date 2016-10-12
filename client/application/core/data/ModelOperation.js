var Digi = require('core/Digi');
var BaseService = require('core/service/BaseService');

var ModelOperation = function($q, modelFactory){
	BaseService.call(this, $q);
	this._$q = $q;
	this._modelFactory = modelFactory;	
};

Digi.inherits(ModelOperation, BaseService);

ModelOperation.prototype.populateHasOne = function(model){
	var hasOneAssociations = model.getHasOneAssociations(),
		list = [],
		association,
		title,
		getter;
	
	for(var i = 0; i < hasOneAssociations.length; i++) {
		association = hasOneAssociations[i];
		title = Digi.String.capitalizeFirstLetter(association.getName());
		getter = 'get' + title;
		if (!model[getter]() &&  !model.isOneOf(association.getName())) {
			list.push(this._createHasOneModel(model, association.getModelType(), title));    
		}
	}
	
	return this._$q.all(list).then(function(result){
		return model;
	});	 	
};

ModelOperation.prototype._createHasOneModel = function(model, modelType, title) {
	return this._modelFactory.create(modelType).then(
		function(association){
			model['set' + title](association);
			return;
		}.bind(this)
	);	
};
module.exports = ModelOperation;