
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var ListenerCreate = function (){

};

Implements(ListenerCreate, IView);

ListenerCreate.prototype = {
    getName: function(){
        return 'listenerCreateComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelFactory', 'modelOperation', '$q', function (
                $scope, 
                modelFactory, 
                modelOperation){
                this.scope = $scope;
                this._modelFactory = modelFactory;
                this._modelOperation = modelOperation;
                this.purpose = Purpose;
                this.model = undefined;
                this.modelObject = null;
                this.ready = false;
                this.actionAssociation = this.scope.model.getAssociation("action");
                this.actionOptions = this.actionAssociation.getOneOf();
                this.eventAssociation = this.scope.model.getAssociation("event");
                this.eventOptions = this.eventAssociation.getOneOf();
                this.options = this.scope.options;
                this.actionObject = undefined;
                this.actionReady = false;
                var self = this;
                
                this.updateEventComboBoxValues = function (item) {
                    self.modelObject = item;
                    self._modelFactory.create(item['$ref']).then(function(model){
                        self.scope.model.setEvent(model);
                    });
                };                
                this.updateActionComboBoxValues = function (item) {
                    self.actionObject = item;
                    self.actionReady = false;
                    self._modelFactory.create(item['$ref']).then(function(model){
                        self.scope.model.setAction(model);
                        self.actionReady = true;
                    });                
                };              
                   
                this._modelOperation.populateHasOne(self.scope.model).then(function(model){
                    self.ready = true;
                });
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/create/listener/listenerCreate.html'
        };
    },
    getDirective : function() {
        return '<listener-create-component></listener-create-component>';
    }
};

module.exports = ListenerCreate;
