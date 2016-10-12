var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var DataViewDataEdit = function (){

};

Implements(DataViewDataEdit, IView);

DataViewDataEdit.prototype = {
    getName: function(){
        return 'editDataViewDataComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelFactory', '$q', 
                        function($scope, modelFactory, $q){

                this.ready = false;
                this._modelFactory = modelFactory;
                this.ignore = ['_metadata', 'id', 'createdDate', 'modifiedDate'];
                this.scope = $scope;
                this.providerList = [];
                this.purpose = Purpose;
                this.providerForm = {
                        provider: null
                    };

                var providerSchema = [],
                    promises = [],
                    providerName = [],
                    self = this;

                    providerSchema = this.scope.model.getAssociationModelType('collection');
                    for (var i = 0; i < providerSchema.length ;i++){
                        providerName.push(providerSchema[i].split('.').pop());
                        promises.push(this._modelFactory.create(providerSchema[i]));
                    }
                $q.all(promises).then(function(providerObjects){
                    providerName = providerName.map(function(oneProvider){
                        return oneProvider.replace('Provider','');
                    });

                    for(var i = 0; i < providerObjects.length; i++){
                        self.providerList.push({
                            name: providerName[i],
                            schemaId: providerObjects[i].getFieldValue('_metadata'),
                            value: providerObjects[i]
                        });
                    }

                    if (self.scope.model.getCollection()){
                        for(var i = 0; i < self.providerList.length; i++){
                            if (self.scope.model.getCollection().getFieldValue('_metadata') ==
                                self.providerList[i].value.getFieldValue('_metadata')) {
                                    self.providerForm.provider = self.providerList[i];
                                    self.providerList[i].value = self.scope.model.getCollection();
                                }
                        }
                    }
                    
                    self.ready = true;
                });
                
                this.updateComboBoxValues = function(item) {
                    this.providerForm.provider = item;
                    this.scope.model.setCollection(item.value);
                };
                this.retrieveProvider = function() {
                    return this.scope.model.getCollection();
                };                                
            }],            
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/gridViewData/dataViewDataEdit.html'
        };
    },
    getDirective : function() {
        return '<edit-data-view-data-component></edit-data-view-data-component>';
    }
};

module.exports = DataViewDataEdit;
