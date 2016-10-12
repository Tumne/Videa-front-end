var Purpose = require('core/plugin/Purpose');
var AuthenticationPluginController = function($scope, modelFactory, $q){
    this.ready = false;
    this._modelFactory = modelFactory;
    this.ignore = ['_metadata', 'id', 'name', 'createdDate', 'modifiedDate'];
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

        providerSchema = this.scope.model.getAssociationModelType('provider');
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

        if (self.scope.model.getProvider()){
            for(var i = 0; i < self.providerList.length; i++){
                if (self.scope.model.getProvider().getFieldValue('_metadata') ==
                    self.providerList[i].value.getFieldValue('_metadata')) {
                        self.providerForm.provider = self.providerList[i];
                        self.providerList[i].value = self.scope.model.getProvider();
                    }
            }
        } else {
            self.providerForm.provider = self.providerList[0];            
        }

        self.ready = true;
    });
};

_.extend(AuthenticationPluginController.prototype, {
    updateComboBoxValues: function(item) {
        this.providerForm.provider = item;
        this.scope.model.setProvider(item.value);
    },
    retrieveProvider: function() {
        return this.scope.model.getProvider();
    }
});
module.exports = AuthenticationPluginController;