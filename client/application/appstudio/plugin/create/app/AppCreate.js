
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');
var AppCreate = function (){

};

Implements(AppCreate, IView);

AppCreate.prototype = {
    getName: function(){
        return 'appCreateComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelFactory', 'modelOperation', function($scope, modelFactory, modelOperation){
                this._scope = $scope;
                this._modelFactory = modelFactory;
                this._modelOperation = modelOperation;
                this.fields = this._scope.model.getFields();
                this.nameFieldIndex = 0;
                this.purpose = Purpose;
                var self = this;

				//TODO: Why is this looping through the fields? Use getName directly? (PW)
                for (var i = 0; i < this.fields.length; i++) {
                    if (this.fields[i].getName() == 'name') {
                        this.nameFieldIndex = i;
                    }
                }

                this.title = this.fields[this.nameFieldIndex].getTitle();
                this.appTypes = this._scope.model.getAssociationModelType("configuration");

                this.create = function(){
                    this._scope.options.submit(this._scope.model);
                };

                this.setAppType = function(appType){
					//Create the appType model in order to set it in the app model.
                    self._modelFactory.create(appType).then(
                        function(schema) {
							//When an appType model is created, set the config to the created appType.
                            self._modelOperation.populateHasOne(schema).then(
                                function(filledSchema) {
									//Sets the configuration object in the app model.
                                    self._scope.model.setConfiguration(filledSchema);
                                }
                            );
                        }
                    );

                };
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/create/app/appCreate.html'
        };
    },
    getDirective : function() {
        return '<app-create-component></app-create-component>';
    }
};

module.exports = AppCreate;
