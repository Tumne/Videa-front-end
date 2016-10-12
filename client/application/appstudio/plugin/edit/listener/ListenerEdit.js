
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var ListenerEdit = function (){

};

Implements(ListenerEdit, IView);

ListenerEdit.prototype = {
    getName: function(){
        return 'listenerEditComponent';
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
                this.modelObject = this.scope.model.getEvent();
                this.ready = false;
                this.actionAssociation = this.scope.model.getAssociation("action");
                this.actionOptions = this.actionAssociation.getOneOf();
                this.eventAssociation = this.scope.model.getAssociation("event");
                this.eventOptions = this.eventAssociation.getOneOf();
                this.options = this.scope.options;
                this.actionObject = undefined;
                this.actionReady = false;
                var self = this,
                    event = this.scope.model.getEvent().getFieldValue("_metadata"),
                    action = _.clone(this.scope.model.getAction());

                for(var i = 0; i < this.eventOptions.length; i++) {
                    if (event == this.eventOptions[i]['$ref']) {
                        this.modelObject = this.eventOptions[i];
                    }    
                }
                
                for(var i = 0; i < this.actionOptions.length; i++) {
                    if (action.getFieldValue("_metadata") == this.actionOptions[i]['$ref']) {
                        this.actionObject = this.actionOptions[i];
                        this.actionReady = true;
                    }    
                }                
                
                this.updateEventComboBoxValues = function (item) {
                    self.modelObject = item;
                    self._modelFactory.create(item['$ref']).then(function(model){
                        self.scope.model.setEvent(model);
                    });
                };                
                
                this.updateActionComboBoxValues = function (item) {
                    self.actionObject = item;
                    self.actionReady = false;
                    if (item['$ref'] == action.getFieldValue("_metadata")) {
                        self.scope.model.setAction(action);
                        self.actionReady = true;
                    } else {
                        self._modelFactory.create(item['$ref']).then(function(model){
                            self.scope.model.setAction(model);
                            self.actionReady = true;
                        });                         
                    }
                };              
                   
                this._modelOperation.populateHasOne(self.scope.model).then(function(model){
                    self.ready = true;
                });
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/listener/listenerEdit.html'
        };
    },
    getDirective : function() {
        return '<listener-edit-component></listener-edit-component>';
    }
};

module.exports = ListenerEdit;
