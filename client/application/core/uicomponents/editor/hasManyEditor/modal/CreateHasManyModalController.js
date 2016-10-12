var Purpose = require('core/plugin/Purpose');

var CreateHasManyModalController = function ($modalInstance, 
                                             customModalOption, 
                                             $controller, 
                                             modelFactory, 
                                             modelOperation,
                                             $q) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));
    this._modelFactory = modelFactory;
    this._modelOperation = modelOperation;
    this.schemaId = this.modalOptions.schemaId;
    this.purpose = Purpose;
    this.viewType = this.modalOptions.viewType;
    this.typeTitle = this.modalOptions.itemTitle;
    this.model = undefined;
    this.modelObject = null;
    this.options = this.modalOptions.options?this.modalOptions.options:{};
    this.ready = false;
    this.anyOf = this.modalOptions.anyOf;
    this._q = $q;
    this.anyOfObjects = [];
    this.ignore = ['_metadata', 'id', 'createdDate', 'modifiedDate'];
    
    var self = this,
        promises = [];

    if (this.viewType == 'selectView') {

        for(var i = 0; i < this.anyOf.length; i++) {

            promises.push(self._modelFactory.create(this.anyOf[i]['$ref']).then(
                function(schema) {
                    
                    self._modelOperation.populateHasOne(schema).then(function(fullSchema){
                    
                        self.anyOfObjects.push({
                            value: fullSchema
                        });
                    
                    }, function(err){
                        console.log('Cannot find model hasone Schema', err);
                    });
                })
            );
        }
        
        self._q.all(promises).then(function(result){
            for(var i = 0; i < self.anyOf.length; i++) {
                self.anyOfObjects[i].name = self.anyOf[i].title;
            }
            self.ready = true;
        });	
    } else if (this.viewType == 'formView') {
        self._modelFactory.create(this.anyOf[0]['$ref']).then(
            function(schema) {
                self._modelOperation.populateHasOne(schema).then(function(fullSchema){
                    self.model = fullSchema;
                    self.ready = true;                    
                } , function(err){
                console.log('Cannot find model hasone Schema', err);
                });

            }, function(err){
                console.log('Cannot find model Schema', err);
            }
        );            
    } else if (this.viewType == 'editFormView') {
        self.model = self.modalOptions.model;
        self.ready = true; 
        self.index = self.modalOptions.index;            
    } else {
        self._modelFactory.create(this.schemaId).then(
            function(schema) {
                self._modelOperation.populateHasOne(schema).then(function(fullSchema){
                    self.model = fullSchema;
                    self.ready = true;   
                    self.field = self.model._getField('name');                 
                } , function(err){
                console.log('Cannot find model hasone Schema', err);
                });

            }, function(err){
                console.log('Cannot find model Schema', err);
            }
        );    
    }
    
};

CreateHasManyModalController.prototype = {
    updateComboBoxValues: function (item) {
        this.model = item;
        this.modelObject = item;
        this.model.value.setFieldValue('name', item.name);
    },
    close: function () {
        this.modalOptions.onCancel();
    },
    submit: function () {
        this.modalOptions.onSubmit(this.model);
    },
    submitEdit: function () {
        this.modalOptions.onSubmit(this.model, this.index);
    },
    retrieveHasOneModel: function(getter) {
        return this.model[getter]();
    },
    hasHasOneRelationship: function (getter) {
        var model = this.model[getter]();
        if (model.getHasOneAssociations().length > 0) {
            return true;
        }
        return false;
    }  
};

module.exports = CreateHasManyModalController;